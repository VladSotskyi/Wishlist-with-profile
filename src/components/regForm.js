import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/log-reg-form.css";
import PasswordChecklist from "react-password-checklist";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function RegForm({ closeModal }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(false);

  const handleSignUp = async (e) => {
    console.log("HANDLED");
    e.preventDefault();
    if (!passwordValidation) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log(user);
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        uid: user.uid,
      });
      console.log("Registration is successful!");
      toast.success("Registration complete!", {
        position: "top-center",
        autoClose: 1500,
      });
      closeModal();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use", {
          position: "top-center",
          autoClose: 1500,
        });
      } else {
        toast.error(error.message, { position: "top-center", autoClose: 1500 });
      }
      console.log(error);
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
      </Form>
    </>
  );
}

export default RegForm;
