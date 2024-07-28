import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

function LogForm({ closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    console.log("HANDLED");
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login is successful!");
      toast.success("User Logged-in successful!", { position: "top-center" });
      closeModal();
    } catch (error) {
      console.log(error);
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
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter your email..."
        />
        <span className="input-title">Password*</span>
        <Form.Control
          className="info-input"
          size="lg"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Enter your password..."
        />
        <div className="form-button">
          <Button className="active" variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </>
  );
}

export default LogForm;
