import React from "react";
import CustomDropdown from "../../../components/CustomDropdown";
import { type, categories } from "../../../data";

type Prop = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const TransactionForm = ({ isOpen, setIsOpen }: Prop) => {
  return (
    <div className="border border-sidebar-border rounded-lg bg-sidebar py-6 px-5 w-full shadow mb-5">
      <div className="">
        <div className="text-foreground font-semibold">Add New Transaction</div>

        <form>
          <div className="flex flex-col gap-5 mt-5 text-foreground text-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <label htmlFor="">Type</label>

                <CustomDropdown selection={type} />

                {/* <select
                  name=""
                  id=""
                  className="px-3 py-1 shadow-border-bottom  appearance-none focus:outline-none"
                >
                  {category.map((cat, index) => (
                    <option key={index} value="income">
                      {cat}
                    </option>
                  ))}
                </select> */}
              </div>

              <div className="flex flex-col w-1/2">
                <label htmlFor="">Amount ($)</label>
                <input
                  type="number"
                  name=""
                  id=""
                  step="0.01"
                  placeholder="0.00"
                  className="px-3 py-1 shadow-border-bottom  focus:outline-4 focus:outline-ring/50 "
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="">Description</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter transaction description"
                className="px-3 py-1 shadow-border-bottom  focus:outline-4 focus:outline-ring/50 "
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <label htmlFor="">Category</label>
                <CustomDropdown selection={categories} />
              </div>

              <div className="flex flex-col w-1/2">
                <label htmlFor="">Date</label>
                <input
                  type="date"
                  name=""
                  id=""
                  className="px-3 py-1 shadow-border-bottom  appearance-none focus:outline-4 focus:outline-ring/50 "
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-10">
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
