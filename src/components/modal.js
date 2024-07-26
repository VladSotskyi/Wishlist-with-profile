import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import RegForm from "./regForm";
import LogForm from "./logForm";
import SignupSlider from "./signupSlider";

function SignModal({ showModal, closeModal }) {
  const [form, setForm] = useState("register");

  const handleFormSwitch = (formType) => {
    setForm(formType);
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton></Modal.Header>
      <SignupSlider handleSwitch={handleFormSwitch} />
      <Modal.Body>
        {form === "register" ? (
          <RegForm />
        ) : form === "login" ? (
          <LogForm />
        ) : (
          ""
        )}
      </Modal.Body>
    </Modal>
  );
}

export default SignModal;
