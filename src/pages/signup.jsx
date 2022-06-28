import React, { useState } from "react";
import SignUp from "../components/account/SignUp";
import Conditions from "../components/account/SignUp/conditions";
import ConnectWallet from "../components/account/SignUp/connectwallet";
import Siren from "../components/account/SignUp/siren";
import EndingSignUp from "../components/account/SignUp/ending";
import { cg, rgpd } from "../components/account/text";

const SignUpPage = () => {
  const lastStep = localStorage.getItem("stepSignup") || "signup";
  const [step, setStep] = useState(lastStep);
  const handleValidate = (index) => {
    setStep(index);
    localStorage.setItem("stepSignup", index);
  };
  const Funnel = {
    signup: <SignUp onValidate={handleValidate} />,
    rgpd: (
      <Conditions
        onValidate={handleValidate}
        title="Nous prenons en charge la RGPD"
        content={rgpd}
        dbkey="rgpd"
        nextStep="cg"
      />
    ),
    cg: (
      <Conditions
        onValidate={handleValidate}
        title="Notre politique générale"
        content={cg}
        dbkey="cg"
        nextStep="siren"
      />
    ),
    siren: <Siren onValidate={handleValidate} />,
    connectwallet: <ConnectWallet onValidate={handleValidate} />,
    ending: <EndingSignUp onFinish={handleValidate} />,
  };
  return Funnel[step];
};

export default SignUpPage;
