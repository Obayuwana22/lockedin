import React, { useRef, useState } from "react";
import OutletNav from "../../../components/OutletNav";
import { useAppDispatch } from "../../../lib/redux/hooks";
import { storageManager } from "../../../utils/storage";
import { setTransactions } from "../../../lib/redux/slices/transactionsSlice";
import { setBudgets } from "../../../lib/redux/slices/budgetsSlice";
import { setCategories } from "../../../lib/redux/slices/categoriesSlice";
import OutletHeaders from "../../../components/OutletHeaders";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import {
  AlertTriangle,
  CheckCircle,
  Database,
  Download,
  Trash2,
  Upload,
} from "lucide-react";

const Data = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const storageInfo = storageManager.getStorageInfo();
  const hasData = storageManager.hasData();
  const version = storageManager.getVersion();

  const handleExportData = () => {
    try {
      const data = storageManager.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `finance-tracker-backup-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setMessage({ type: "success", text: "Data exported successfully!" });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to export data. Please try again.",
      });
      console.log(error);
    }
  };

  const handleImportData = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    setMessage(null);
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      const result = storageManager.importData(data);

      if (result.success) {
        // Update Redux store with import data
        if (data.transactions) dispatch(setTransactions(data.transactions));
        if (data.budgets) dispatch(setBudgets(data.budgets));
        if (data.categories) dispatch(setCategories(data.categories));

        setMessage({ type: "success", text: "Data imported successfully!" });
      } else {
        setMessage({
          type: "error",
          text: `Import failed: ${result.errors.join(", ")}`,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Invalid file format. Please select a valid backup file.",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleClearData = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all data? This action cannot be undone."
      )
    ) {
      const success = storageManager.clearAllData();
      if (success) {
        // Clear Redux store
        dispatch(setTransactions([]));
        dispatch(setBudgets([]));
        dispatch(setCategories([]));
        setMessage({ type: "success", text: "All data cleared successfully!" });
      } else {
        setMessage({
          type: "error",
          text: "Failed to clear data. Please try again.",
        });
      }
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div>
      <OutletNav />
      <div>
        <OutletHeaders
          title="Data Management"
          subtitle="Backup, restore, and manage your financial data"
        />
      </div>

      <div className="mb-5">
        {message && (
          <Alert variant={message.type === "error" ? "destructive" : "default"}>
            {message.type === "success" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertTriangle className="h-4 w-4" />
            )}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 text-sm lg:text-base">
        {/* Storage Information */}
        <div className="border border-sidebar-border rounded-lg bg-sidebar px-5 py-6 w-full shadow">
          <div className="flex items-center space-x-2 mb-8">
            <Database className="h-5 w-5" />
            <span className="font-semibold">Storage Information</span>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Storage Available
                </p>
                <p className="font-medium text-foreground">
                  {storageInfo.available ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data Version</p>
                <p className="font-medium text-foreground">{version}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="font-medium text-foreground">
                  {formatBytes(storageInfo.used)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Has Data</p>
                <p className="font-medium text-foreground">
                  {hasData ? "Yes" : "No"}
                </p>
              </div>
            </div>

            {storageInfo.keys.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Stored Data Types
                </p>
                <div className="flex flex-wrap gap-2">
                  {storageInfo.keys.map((key) => (
                    <span
                      key={key}
                      className="px-2 py-1 bg-muted rounded text-xs"
                    >
                      {key.replace("finance-tracker-", "")}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Data Operations */}
        <div className="border border-sidebar-border rounded-lg bg-sidebar px-5 py-6 w-full shadow">
          <div className="mb-8 font-semibold">
            <div>Data Operations</div>
          </div>
          <div className="space-y-4 text-sm">
            {/* Export Data */}
            <div className="space-y-2">
              <label>Export Data</label>
              <button
                onClick={handleExportData}
                className="flex items-center justify-center w-full bg-transparent py-2 border border-sidebar-border rounded-md  focus:outline-4 focus:outline-ring/50 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Backup
              </button>
              <p className="text-xs text-muted-foreground">
                Export all your data as a JSON file for backup or transfer
              </p>
            </div>

            {/* Import Data */}
            <div className="space-y-2 flex flex-col">
              <label htmlFor="import-file">Import Data</label>
              <input
                id="import-file"
                type="file"
                accept=".json"
                onChange={handleImportData}
                disabled={isLoading}
                ref={fileInputRef}
                className="flex items-center justify-center w-full bg-transparent shadow-border-bottom  py-2 pl-3 focus:outline-4 focus:outline-ring/50"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="flex items-center justify-center w-full bg-accent-foreground py-2  border border-sidebar-border rounded-md  focus:outline-4 focus:outline-ring/50 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Upload className="mr-2 h-4 w-4" />
                {isLoading ? "Importing..." : "Import Backup"}
              </button>
              <p className="text-xs text-muted-foreground">
                Import data from a previously exported backup file
              </p>
            </div>

            {/* Clear Data */}
            <div className="space-y-2">
              <label>Clear All Data</label>
              <button
                onClick={handleClearData}
                className="flex items-center justify-center w-full bg-destructive text-destructive-foreground py-2 shadow-border-bottom focus:outline-4 focus:outline-ring/50 hover:opacity-90 transition-colors"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All Data
              </button>
              <p className="text-xs text-muted-foreground">
                Permanently delete all stored data. This action cannot be
                undone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Save Information */}
      <div className="border border-sidebar-border rounded-lg bg-sidebar px-5 py-6 w-full shadow text-sm lg:text-base">
        <div>
          <div>Auto-Save</div>
        </div>
        <div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-accent" />
            <span>
              Your data is automatically saved to your browser's local storage
              whenever you make changes. No manual saving required!
            </span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Note: Data is stored locally in your browser and will be lost if you
            clear your browser data or use a different device. Regular backups
            are recommended.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
