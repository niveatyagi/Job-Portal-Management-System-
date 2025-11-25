import React, { useState } from "react";
import {
  Button,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import {
  IconAt,
  IconLock,
  IconCheck,
  IconX,
  IconDeviceIpadBolt,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Services/UserService";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlices";
import { setProfile } from "../Slices/ProfileSlice";


const form = { email: "", password: "" };

const Login = () => {
  const [data, setData] = useState(form);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

 const handleSubmit = () => {
  loginUser(data)
    .then((res) => {
      const user = res.data || res.user || res;

      // Save USER
      dispatch(setUser(user));

      // Save PROFILE (FIX)
      dispatch(setProfile(user.profile || user));

      notifications.show({
        title: "Login Successful 🎉",
        message: "Welcome back!",
        color: "green",
        icon: <IconCheck />,
      });

      navigate("/");
    })
    .catch(() => {
      notifications.show({
        title: "Login Failed ❌",
        message: "Invalid email or password.",
        color: "red",
        icon: <IconX />,
      });
    });
};


  return (
    <div className="flex justify-between items-center min-h-screen bg-[#1e1e1e] px-10 relative overflow-hidden">
      {/* 🔹 Left Section */}
      <div className="flex flex-col justify-center items-start w-[45%] text-left relative z-10">
        <h1 className="text-5xl font-bold text-yellow-400 flex items-center gap-3 mb-2">
          <IconDeviceIpadBolt size={50} stroke={1.5} />
          JobBlitz
        </h1>
        <p className="text-gray-300 text-lg">Find the job made for you</p>
      </div>

      {/* 🔹 Right Section - Login Form */}
      <div className="w-[45%] z-10 flex flex-col gap-4 bg-transparent">
        <h2 className="text-3xl font-semibold text-white mb-2">Login</h2>

        <TextInput
          value={data.email}
          onChange={handleChange}
          name="email"
          withAsterisk
          label="Email"
          placeholder="Your email"
          leftSection={<IconAt size={16} />}
          styles={{
            label: { color: "white" },
            input: {
              backgroundColor: "#2b2b2b",
              color: "white",
              borderColor: "#3d3d3d",
            },
          }}
        />

        <PasswordInput
          value={data.password}
          onChange={handleChange}
          name="password"
          withAsterisk
          label="Password"
          placeholder="Password"
          leftSection={<IconLock size={18} />}
          styles={{
            label: { color: "white" },
            input: {
              backgroundColor: "#2b2b2b",
              color: "white",
              borderColor: "#3d3d3d",
            },
          }}
        />

        <div
          onClick={open}
          className="text-yellow-400 hover:underline cursor-pointer text-sm text-right"
        >
          Forgot Password?
        </div>

        <Button
          onClick={handleSubmit}
          color="yellow"
          fullWidth
          size="md"
          className="font-semibold mt-2"
        >
          Login
        </Button>

        <div className="text-center text-sm text-gray-400 mt-2">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-yellow-400 hover:underline">
            Sign up
          </Link>
        </div>
      </div>

      {/* 🔹 Background Circle (More Rounded and Centered) */}
      <div className="absolute -right-72 top-[-150px] w-[1100px] h-[1100px] bg-[#2f2f2f] rounded-full blur-3xl opacity-90" />

      <ResetPassword opened={opened} close={close} />
    </div>
  );
};

export default Login;
