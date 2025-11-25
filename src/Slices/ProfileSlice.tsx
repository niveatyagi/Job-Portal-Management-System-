import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: null,

  reducers: {
    setProfile: (state, action) => {
      const p = action.payload;
      return { ...p, id: p.id || p._id };
    },

    updateLocalProfile: (state, action) => {
      const p = action.payload;
      return { ...p, id: p.id || p._id };
    },
  },
});

export const { setProfile, updateLocalProfile } = profileSlice.actions;
export default profileSlice.reducer;
