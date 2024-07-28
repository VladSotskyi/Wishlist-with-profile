import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LogForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Form className="signup-form active-font">
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
          <Button className="active" variant="primary">
            Login
          </Button>
        </div>
      </Form>
    </>
  );
}

export default LogForm;
