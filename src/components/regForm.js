import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/log-reg-form.css";
import PasswordChecklist from "react-password-checklist";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function RegForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    console.log("HANDLED");
    e.preventDefault();
    if (!passwordValidation) return; // Проверка валидации пароля
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      console.log("Registration is successful!");
    } catch (error) {
      if (
        error.name === "Unhandled Promise Rejection: AbortError: AbortError"
      ) {
        console.error("Request was aborted:", error);
        setError("The request was aborted. Please try again.");
      } else {
        console.error("Error during registration:", error);
        setError(error.message);
      }
    }
  };

  return (
    <>
      <Form className="signup-form active-font" onSubmit={handleSignUp}>
        <span className="input-title">Name*</span>
        <Form.Control
          className="info-input"
          size="lg"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
        />
        <span className="input-title">Email*</span>
        <Form.Control
          className="info-input"
          size="lg"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
        />
        <span className="input-title">Password*</span>
        <Form.Control
          className="info-input"
          size="lg"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password..."
        />
        <PasswordChecklist
          rules={["minLength", "specialChar"]}
          value={password}
          minLength={8}
          onChange={(isValid) => setPasswordValidation(isValid)}
        />
        <div className="form-button">
          <Button
            className={`form-button ${passwordValidation ? "active" : "disabled"}`}
            variant="primary"
            type="submit"
            disabled={!passwordValidation} // Отключаем кнопку, если валидация не пройдена
          >
            Register
          </Button>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </Form>
    </>
  );
}

export default RegForm;
