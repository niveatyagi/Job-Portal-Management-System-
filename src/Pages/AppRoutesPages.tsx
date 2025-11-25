import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../SignUpLogin/Login";
import FindJobs from "./FindJobs";
import FindTalentPage from "./FindTalentPage";
import HomePage from "./HomePage";
import JobDesPage from "./JobDesPage";
import MessagePage from "./MessagePage";
import PostedJobPage from "./PostedJobPage";
import PostJobPage from "./PostJobPage";
import ProfilePage from "./ProfilePage";
import SignUpPage from "./SignUpPage";
import TalentProfilePage from "./TalentProfilePage";
import ApplyJobPage from "./ApplyJobPage";  // ⭐ IMPORTANT: ADD THIS
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import JobHistoryPage from "./JobHistoryPage";


const AppRoutesPages = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <BrowserRouter>
      <Header />

      <main className="pt-10 min-h-[90vh]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/find-talent" element={<FindTalentPage />} />
          <Route path="/post-jobs" element={<PostJobPage />} />
<Route path="/job-history" element={<JobHistoryPage />} />


          <Route path="/talent/:id" element={<TalentProfilePage />} />
          <Route path="/jobs/:id" element={<JobDesPage />} />

       
          <Route path="/apply-job/:id" element={<ApplyJobPage />} />

          <Route path="/upload-jobs" element={<HomePage />} />
       
<Route path="/posted-job/" element={<PostedJobPage />} />


          <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/messages" element={<MessagePage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutesPages;
