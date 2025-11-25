import { IconAnchor } from "@tabler/icons-react";
import SignUp from "../SignUpLogin/SignUp";
import Login from "../SignUpLogin/Login";
import { useLocation } from "react-router-dom";

const SignUpPage = () => {
  const location = useLocation();
  const isSignUp = location.pathname === "/signup";

  return (
    <div className="min-h-screen w-full bg-[#1c1c1c] font-['Poppins'] flex items-center justify-center relative overflow-hidden">

      {/* Light grey curved background */}
      <div
        className="absolute inset-0 bg-[#3d3d3d]"
        style={{
          clipPath:
            "ellipse(70% 60% at 30% 50%)", // 👈 Creates a big center curve shape
        }}
      ></div>

      {/* Left content (logo and tagline) */}
      <div className="absolute left-0 top-0 w-1/2 h-full flex flex-col justify-center items-center text-center text-white z-10">
        <div className="flex items-center gap-2 text-[#ffbd20]">
          <IconAnchor className="h-12 w-12" stroke={2.5} />
          <div className="text-5xl font-bold">JobHook</div>
        </div>
        <div className="text-lg text-gray-300 font-medium mt-2">
          Find the job made for you
        </div>
      </div>

      {/* Right form section */}
      <div className="relative w-1/2 h-full flex justify-center items-center z-10">
        <div
          className={`absolute w-full transition-all duration-700 ease-in-out flex justify-center items-center ${
            isSignUp ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
        >
          <Login />
        </div>

        <div
          className={`absolute w-full transition-all duration-700 ease-in-out flex justify-center items-center ${
            isSignUp ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        >
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
