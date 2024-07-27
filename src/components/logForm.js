import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LogForm() {
  return (
    <>
      <Form className="signup-form active-font">
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
