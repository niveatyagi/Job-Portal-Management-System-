import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ApplyJobPayload {
  userId: string;
  jobId: string;
  fullName: string;
  email: string;
  address?: string;
  role?: string;
  previousEmployers?: string | string[];
  countryCode?: string;
  phone?: string;
  skills?: string | string[];
  availability?: string;
  resume?: File | null;
}
export const submitJobApplication = createAsyncThunk<
  any,                // 👈 return type (response from backend)
  ApplyJobPayload,    // 👈 argument type
  { rejectValue: string }  // 👈 rejected type
>(
  "jobApplication/submit",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("userId", data.userId);
      formData.append("jobId", data.jobId);
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("address", data.address || "");
      formData.append("role", data.role || "");
      formData.append("countryCode", data.countryCode || "");
      formData.append("phone", data.phone || "");
      formData.append("availability", data.availability || "");

      const prevEmpArray = Array.isArray(data.previousEmployers)
        ? data.previousEmployers
        : data.previousEmployers
        ? data.previousEmployers.split(",").map((x) => x.trim())
        : [];

      prevEmpArray.forEach((item) =>
        formData.append("previousEmployers", item)
      );

      const skillsArray = Array.isArray(data.skills)
        ? data.skills
        : data.skills
        ? data.skills.split(",").map((x) => x.trim())
        : [];

      skillsArray.forEach((item) => formData.append("skills", item));

      if (data.resume) {
        formData.append("resume", data.resume);
      }

      const res = await axios.post(
        "http://localhost:8080/api/applications/submit",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error submitting");
    }
  }
);


const jobApplicationSlice = createSlice({
  name: "jobApplication",
  initialState: {
    loading: false,
    error: null as string | null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitJobApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitJobApplication.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitJobApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default jobApplicationSlice.reducer;
