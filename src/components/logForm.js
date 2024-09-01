import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

import Hide from "../images/hide.png";
import Show from "../images/eye.png";

function LogForm({ closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Invalid email format!", {
        position: "top-center",
        autoClose: 1500,
      });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User Logged-in successful!", {
        position: "top-center",
        autoClose: 1500,
      });
      closeModal();
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid credential! Check your email and password!", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error("Login failed. Please try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    }
  };

  // Handle password reset
  const handlePasswordReset = async () => {
    if (!validateEmail(email)) {
      toast.error("Enter a valid email to reset password!", {
        position: "top-center",
        autoClose: 1500,
      });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent to your email!", {
        position: "top-center",
        autoClose: 1500,
      });
    } catch (error) {
      toast.error("Error sending reset link. Please check your email.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Form className="signup-form active-font" onSubmit={handleSignIn}>
        <span className="input-title">Email*</span>
        <Form.Control
          className="info-input"
          size="lg"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
        />
        <span className="input-title">Password*</span>
        <div className="password-input-container">
          <Form.Control
            className="info-input"
            size="lg"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
          />
          <Button
            variant="link"
            className="password-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <img src={Hide} alt="Hide" className="toggle-pass-show" />
            ) : (
              <img src={Show} alt="Show" className="toggle-pass-show" />
            )}
          </Button>
        </div>
        <div className="form-button">
          <Button className="active" variant="primary" type="submit">
            Login
          </Button>
        </div>
        <div className="reset-form-button">
          <Button
            variant="link"
            className="password-reset-btn"
            onClick={handlePasswordReset}
          >
            Forgot Password?
          </Button>
        </div>
      </Form>
    </>
  );
}

export default LogForm;
