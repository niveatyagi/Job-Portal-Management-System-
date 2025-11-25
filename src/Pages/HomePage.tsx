import React from "react";
import DreamJob from "../LandingPage/DreamJob"; 
import Companies from "../LandingPage/Companies";
import JobCategory from "../LandingPage/JobCategory";
import Work from "../LandingPage/Work";
import Testimonials from "../LandingPage/Testimonials";
import Subscribe from "../LandingPage/Subscribe";

const HomePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['Poppins']">
      <DreamJob />
      <Companies />
      <JobCategory />
      <Work />
      <Testimonials />
      <Subscribe />
    </div>
  );
};

export default HomePage;
