import {
  Anchor,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Radio,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { registerUser } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";

const SignUp = () => {
  const navigate = useNavigate();

  const form = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "APPLICANT",
  };

  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>({});

  // ✅ Handle input change
  const handleChange = (event: any) => {
    if (typeof event === "string") {
      setData({ ...data, accountType: event });
      return;
    }

    const { name, value } = event.target;
    setData({ ...data, [name]: value });

    const errorMsg = signupValidation(name, value);
    setFormError({ ...formError, [name]: errorMsg });

    // ✅ Cross-check passwords
    if (name === "password" && data.confirmPassword !== "") {
      if (data.confirmPassword !== value) {
        setFormError({
          ...formError,
          confirmPassword: "Passwords do not match.",
        });
      } else {
        setFormError({ ...formError, confirmPassword: "" });
      }
    }

    if (name === "confirmPassword") {
      if (data.password !== value) {
        setFormError({
          ...formError,
          confirmPassword: "Passwords do not match.",
        });
      } else {
        setFormError({ ...formError, confirmPassword: "" });
      }
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async () => {
    let valid = true;
    const newFormError: { [key: string]: string } = {};

    // Validate all fields
    for (let key in data) {
      if (key === "accountType") continue;
      if (key !== "confirmPassword") {
        newFormError[key] = signupValidation(key, data[key]);
      } else if (data[key] !== data["password"]) {
        newFormError[key] = "Passwords do not match.";
      }

      if (newFormError[key]) valid = false;
    }

    setFormError(newFormError);

    // ❌ Show detailed notification if invalid
    if (!valid) {
      const errorList = Object.entries(newFormError)
        .filter(([_, msg]) => msg)
        .map(
          ([field, msg]) =>
            `• ${field.charAt(0).toUpperCase() + field.slice(1)}: ${msg}`
        )
        .join("\n");

      notifications.show({
        title: "Invalid Details",
        message:
          errorList ||
          "Please correct all highlighted errors before continuing.",
        color: "red",
        icon: <IconX />,
        autoClose: 4000,
        position: "top-right",
      });

      return;
    }

    // ✅ Proceed with registration
    try {
      const res = await registerUser(data);
      console.log("✅ Registration successful:", res);

      notifications.show({
        title: "Registration Successful 🎉",
        message: "You’ll be redirected to the login page shortly...",
        color: "teal",
        icon: <IconCheck />,
        autoClose: 3000, // notification visible for 3 seconds
        position: "top-right",
      });

      // ⏳ Add a delay so user can see the success message
      setTimeout(() => navigate("/login"), 3200);
    } catch (err: any) {
      console.error("❌ Registration failed:", err);
      notifications.show({
        title: "Registration Failed",
        message: err?.response?.data?.message || "Something went wrong.",
        color: "red",
        icon: <IconX />,
        autoClose: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <div className="w-[70%] max-w-md px-8 flex flex-col justify-center gap-5 text-white">
      <div className="text-3xl font-semibold text-white mb-2">
        Create Account
      </div>

      <TextInput
        value={data.name}
        error={formError.name}
        onChange={handleChange}
        name="name"
        withAsterisk
        styles={{
          label: { color: "white" },
          input: { backgroundColor: "#2d2d2d", color: "white" },
        }}
        label="Full Name"
        placeholder="Your name"
      />

      <TextInput
        value={data.email}
        error={formError.email}
        onChange={handleChange}
        name="email"
        withAsterisk
        styles={{
          label: { color: "white" },
          input: { backgroundColor: "#2d2d2d", color: "white" },
        }}
        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        label="Email"
        placeholder="Your email"
      />

      <PasswordInput
        value={data.password}
        error={formError.password}
        onChange={handleChange}
        name="password"
        withAsterisk
        styles={{
          label: { color: "white" },
          input: { backgroundColor: "#2d2d2d", color: "white" },
        }}
        leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
        label="Password"
        placeholder="Password"
      />

      <PasswordInput
        value={data.confirmPassword}
        error={formError.confirmPassword}
        onChange={handleChange}
        name="confirmPassword"
        withAsterisk
        styles={{
          label: { color: "white" },
          input: { backgroundColor: "#2d2d2d", color: "white" },
        }}
        leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
        label="Confirm Password"
        placeholder="Confirm password"
      />

      <Radio.Group
        value={data.accountType}
        onChange={handleChange}
        name="accountType"
        label="You are?"
        withAsterisk
      >
        <Group mt="xs">
          <Radio
            className="px-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg"
            autoContrast
            value="APPLICANT"
            label="Applicant"
          />
          <Radio
            className="px-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg"
            autoContrast
            value="EMPLOYER"
            label="Employer"
          />
        </Group>
      </Radio.Group>

      <Checkbox
        autoContrast
        className="text-white"
        label={
          <>
            I accept{" "}
            <Anchor className="text-bright-sun-400">terms & conditions</Anchor>
          </>
        }
      />

      <Button onClick={handleSubmit} autoContrast variant="filled">
        Sign up
      </Button>

      <div className="text-center">
        Have an account?&nbsp;
        <Link className="text-bright-sun-400 hover:underline" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
