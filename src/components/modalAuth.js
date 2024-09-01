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
      <SignupSlider handleSwitch={handleFormSwitch} activeForm={form} />
      <Modal.Body>
        {form === "register" ? (
          <RegForm closeModal={closeModal} />
        ) : form === "login" ? (
          <LogForm closeModal={closeModal} />
        ) : (
          ""
        )}
      </Modal.Body>
    </Modal>
  );
}

export default SignModal;
