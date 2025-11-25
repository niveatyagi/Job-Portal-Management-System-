import { Button, Modal, PinInput, TextInput, PasswordInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../Services/UserService";
import { errorNotification, successNotification } from "../Services/Notification";
import { useInterval } from "@mantine/hooks";

const ResetPassword = ({ opened, close }: { opened: boolean; close?: () => void }) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [passErr, setPassErr] = useState("");
  const [resendLoader, setResendLoader] = useState(false);
  const [seconds, setSeconds] = useState(60);

  // 🔹 Timer for resend button
  const interval = useInterval(() => {
    if (seconds === 0) {
      setResendLoader(false);
      setSeconds(60);
      interval.stop();
    } else {
      setSeconds((s) => s - 1);
    }
  }, 1000);

  // 🔹 Function to reset all state when modal closes
  const resetAll = () => {
    setEmail("");
    setOtpSent(false);
    setOtpSending(false);
    setVerified(false);
    setPassword("");
    setPassErr("");
    setResendLoader(false);
    setSeconds(60);
    interval.stop();
  };

  // 🔹 Automatically reset when modal closes
  useEffect(() => {
    if (!opened) {
      resetAll();
    }
  }, [opened]);

  // ---------------------------
  // SEND OTP
  // ---------------------------
  const handleSendOtp = () => {
    if (!email) return;
    setOtpSending(true);

    sendOtp(email)
      .then((res) => {
        console.log(res);
        successNotification("OTP Sent", "Please check your email for the OTP.");
        setOtpSent(true);
        setOtpSending(false);
        setResendLoader(true);
        interval.start();
      })
      .catch((err) => {
        console.log(err);
        setOtpSending(false);
        errorNotification("OTP Send Failed", "Failed to send OTP. Please try again.");
      });
  };

  // ---------------------------
  // VERIFY OTP
  // ---------------------------
  const handleVerifyOtp = (otp: string) => {
    verifyOtp(email, otp)
      .then((res) => {
        console.log(res);
        successNotification("OTP Verified", "You can now reset your password.");
        setVerified(true);
      })
      .catch((err) => {
        console.log(err);
        errorNotification("OTP Verification Failed", "Invalid OTP. Please try again.");
      });
  };

  // ---------------------------
  // RESEND OTP
  // ---------------------------
  const resendOtp = () => {
    if (resendLoader) return;
    handleSendOtp();
  };

  // ---------------------------
  // CHANGE EMAIL
  // ---------------------------
  const changeEmail = () => {
    setOtpSent(false);
    setResendLoader(false);
    setSeconds(60);
    setVerified(false);
    interval.stop();
  };

  // ---------------------------
  // RESET PASSWORD
  // ---------------------------
  const handleResetPassword = () => {
    if (password.length < 6) {
      setPassErr("Password must be at least 6 characters");
      return;
    }

    changePass(email, password)
      .then((res) => {
        console.log(res);
        successNotification("Password Changed", "Login with your new password.");
        close?.(); // safely close modal
      })
      .catch((err) => {
        console.log(err);
        errorNotification(
          "Password Change Failed",
          err?.response?.data?.errorMessage || "Error changing password."
        );
      });
  };

  // ---------------------------
  // RETURN UI
  // ---------------------------
  return (
    <Modal
      opened={opened}
      onClose={() => {
        close?.();
        resetAll();
      }}
      title="Reset Password"
      centered
    >
      <div className="flex flex-col gap-6">
        {/* Email Input */}
        <TextInput
          value={email}
          name="email"
          size="md"
          onChange={(e) => setEmail(e.target.value)}
          leftSection={<IconAt size={16} />}
          label="Email"
          withAsterisk
          placeholder="Your email"
          rightSection={
            <Button
              loading={otpSending}
              size="xs"
              className="mr-1"
              onClick={handleSendOtp}
              disabled={email === "" || otpSent}
              variant="filled"
            >
              Login
            </Button>
          }
          rightSectionWidth={100}
        />

        {/* OTP Input */}
        {otpSent && !verified && (
          <>
            <PinInput
              onComplete={handleVerifyOtp}
              length={6}
              className="mx-auto"
              size="md"
              gap="lg"
              type="number"
            />
            <div className="flex justify-between mt-3">
              <Button loading={otpSending} onClick={resendOtp} variant="light">
                {resendLoader ? `${seconds}s` : "Resend"}
              </Button>
              <Button onClick={changeEmail} variant="light" color="red">
                Change Email
              </Button>
            </div>
          </>
        )}

        {/* Password Input */}
        {verified && (
          <>
            <PasswordInput
              value={password}
              error={passErr}
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
                setPassErr(e.target.value.length < 6 ? "Password too short" : "");
              }}
              leftSection={<IconLock size={16} />}
              label="New Password"
              withAsterisk
              placeholder="Enter new password"
            />

            <Button onClick={handleResetPassword} color="yellow" fullWidth>
              Change Password
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ResetPassword;
