import { createSlice } from "@reduxjs/toolkit";
import { setItem, getItem, removeItem } from "../Services/LocalStorageService";

const initialUser = getItem("user") || null;

const UserSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    setUser: (state, action) => {
      setItem("user", action.payload);   // ⭐ persist user
      return action.payload;
    },
    removeUser: () => {
      removeItem("user");                // ⭐ remove on logout
      return null;
    },
  },
});

export const { setUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;
