import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/log-reg-form.css";
import PasswordChecklist from "react-password-checklist";

function RegForm() {
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(false);

  return (
    <>
      <Form className="signup-form form-font">
        <span className="input-title">Name*</span>
        <Form.Control
          className="info-input"
          size="lg"
          type="text"
          placeholder="Enter your name..."
        />
        <span className="input-title">Email*</span>
        <Form.Control
          className="info-input"
          size="lg"
          type="email"
          placeholder="Enter your email..."
        />
        <span className="input-title">Password*</span>
        <Form.Control
          className="info-input"
          size="lg"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password..."
        />
        <PasswordChecklist
          rules={["minLength", "specialChar"]}
          value={password}
          minLength={8}
          onChange={(isValid) => {
            setPasswordValidation(isValid);
          }}
        />
        <div className="form-button">
          <Button
            className={`form-button ${passwordValidation === true ? "active" : "disabled"}`}
            variant="primary"
          >
            Register
          </Button>
        </div>
      </Form>
    </>
  );
}

export default RegForm;
