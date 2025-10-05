import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/Select";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../lib/redux/hooks";

type Prop = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const TransactionForm = ({ isOpen, setIsOpen }: Prop) => {
  const { watch, setValue } = useForm({
    defaultValues: {
      type: "expense",
      category: "",
    },
  });
  const categories = useAppSelector((store) => store.categories.categories);

  const selectedCategory = watch("category")
  const watchedType = watch("type");
  const filteredCategories = categories.filter(
    (cat) => cat.type === watchedType
  );

  return (
    <div className="text-sm border border-sidebar-border rounded-lg bg-sidebar py-6 px-5 w-full shadow mb-5">
      <div className="">
        <div className="text-foreground font-semibold">Add New Transaction</div>

        <form className="flex flex-col gap-8 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="type">Type</label>
              <Select
                value={watchedType}
                onValueChange={(value: "income" | "expense") => {
                  setValue("type", value);
                  setValue("category", ""); // Reset category when type changes
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Amount ($)</label>
              <input
                type="number"
                name=""
                id=""
                step="0.01"
                placeholder="0.00"
                className="px-3 py-1 shadow-border-bottom focus:outline-4 focus:outline-ring/50 "
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="">Description</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter transaction description"
              className="px-3 py-1 shadow-border-bottom  focus:outline-4 focus:outline-ring/50 "
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category">Category</label>
              <Select
                value={selectedCategory}
                onValueChange={(value) => setValue("category", value)}
              >
                <SelectTrigger className={`${selectedCategory ? "" : "text-muted-foreground"}`}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {filteredCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center space-x-2">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Date</label>
              <input
                type="date"
                name=""
                id=""
                className="px-3 py-1 shadow-border-bottom  appearance-none focus:outline-4 focus:outline-ring/50 "
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end text-base">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="bg-background hover:text-background hover:bg-accent px-5 py-1.5 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-primary text-primary-foreground px-5 py-1.5 rounded-lg hover:opacity-90"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
