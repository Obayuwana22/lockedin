import type { Budget, Category, Transaction } from "../types";

const STORAGE_KEYS = {
  TRANSACTIONS: "finance-tracker-transactions",
  BUDGETS: "finance-tracker-budgets",
  CATEGORIES: "finance-tracker-categories",
  SETTINGS: "finance-tracker-settings",
  VERSION: "finance-tracker-version",
} as const;

const CURRENT_VERSION = "1.0.0";

interface StorageData {
  transactions: Transaction[];
  budgets: Budget[];
  categories: Category[];
  settings: Record<string, any>;
  version: string;
  lastUpdated: string;
}

class StorageManager {
  private isClient = typeof window !== "undefined";

  // Check if localStorage is available
  private isStorageAvailable(): boolean {
    if (!this.isClient) return false;
    try {
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.getItem(test);
      return true;
    } catch {
      return false;
    }
  }

  // Save data to localStorage with error handling
  private saveToStorage<T>(key: string, data: T): boolean {
    if (!this.isStorageAvailable()) return false;
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage:`, error);
      return false;
    }
  }

  // Load data from localStorage with error handling
  private loadFromStorage<T>(key: string, defaultValue: T): T {
    if (!this.isStorageAvailable) return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage:`, error);
      return defaultValue;
    }
  }

  // Save transactions
  saveTransactions(transactions: Transaction[]): boolean {
    return this.saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
  }

  // Load transactions
  loadTransactions(): Transaction[] {
    return this.loadFromStorage<Transaction[]>(STORAGE_KEYS.TRANSACTIONS, []);
  }

  // Save budgets
  saveBudgets(budgets: Budget[]): boolean {
    return this.saveToStorage(STORAGE_KEYS.BUDGETS, budgets);
  }

  // Load budgets
  loadBudgets(): Budget[] {
    return this.loadFromStorage<Budget[]>(STORAGE_KEYS.BUDGETS, []);
  }

  // Save categories
  saveCategories(categories: Category[]): boolean {
    return this.saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
  }

  // Load categories
  loadCategories(): Category[] {
    return this.loadFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES, []);
  }

  // Save settings
  saveSettings(settings: Record<string, any>): boolean {
    return this.saveToStorage(STORAGE_KEYS.SETTINGS, settings);
  }

  // Load settings
  loadSettings(): Record<string, any> {
    return this.loadFromStorage<Record<string, any>>(STORAGE_KEYS.SETTINGS, {});
  }

  // Export all data
  exportData(): StorageData {
    return {
      transactions: this.loadTransactions(),
      budgets: this.loadBudgets(),
      categories: this.loadCategories(),
      settings: this.loadSettings(),
      version: CURRENT_VERSION,
      lastUpdated: new Date().toISOString(),
    };
  }

  // Import data with validation
  importData(data: Partial<StorageData>): {
    success: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    try {
      // Validate data structure
      if (data.transactions && Array.isArray(data.transactions)) {
        if (!this.saveTransactions(data.transactions)) {
          errors.push("Failed to save transactions");
        }
      }

      if (data.budgets && Array.isArray(data.budgets)) {
        if (!this.saveBudgets(data.budgets)) {
          errors.push("Failed to save budgets");
        }
      }

      if (data.categories && Array.isArray(data.categories)) {
        if (!this.saveCategories(data.categories)) {
          errors.push("Failed to save categories");
        }
      }

      if (data.settings && typeof data.settings === "object") {
        if (!this.saveSettings(data.settings)) {
          errors.push("Failed to save settings");
        }
      }

      // Save version info
      this.saveToStorage(STORAGE_KEYS.VERSION, data.version || CURRENT_VERSION);

      return { success: errors.length === 0, errors };
    } catch (error) {
      return { success: false, errors: [`Import failed: ${error}`] };
    }
  }

  // Clear all data
  clearAllData(): boolean {
    if (!this.isStorageAvailable()) return false;
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error("Failed to clear data:", error);
      return false;
    }
  }

  // Get storage usage info
  getStorageInfo(): { used: number; available: boolean; keys: string[] } {
    if (!this.isStorageAvailable()) {
      return { used: 0, available: false, keys: [] };
    }

    let used = 0;
    const keys: string[] = [];

    Object.values(STORAGE_KEYS).forEach((key) => {
      const item = localStorage.getItem(key);
      if (item) {
        used += item.length;
        keys.push(key);
      }
    });

    return { used, available: true, keys };
  }

  // Check if data exists
  hasData(): boolean {
    return this.loadTransactions().length > 0 || this.loadBudgets().length > 0;
  }

  // Get data version
  getVersion(): string {
    return this.loadFromStorage(STORAGE_KEYS.VERSION, CURRENT_VERSION);
  }
}

export const storageManager = new StorageManager()