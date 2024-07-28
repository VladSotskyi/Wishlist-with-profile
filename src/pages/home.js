import React from "react";
import NotSignupHome from "../components/notSignupHome";
import SignupHome from "../components/signupHome";
import { useAuth } from "../context/authContext";

function Home() {
  const { currentUser } = useAuth();
  return <>{currentUser ? <SignupHome /> : <NotSignupHome />}</>;
}

export default Home;
