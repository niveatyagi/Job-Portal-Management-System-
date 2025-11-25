import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterState = Record<string, any>;

const initialState: FilterState = {};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<Record<string, any>>) => {
      Object.keys(action.payload).forEach((key) => {
        const val = action.payload[key];

        if (
          val === "" ||
          val === null ||
          val === undefined ||
          (Array.isArray(val) && val.length === 0)
        ) {
          delete state[key]; // ✅ now TypeScript safe
        } else {
          state[key] = val; // ✅ no error
        }
      });
    },

    resetFilter: () => {
      return {};
    },
  },
});

export const { updateFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
