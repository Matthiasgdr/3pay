import React, { useState } from "react";
import SignUp from "../components/account/SignUp";
import Conditions from "../components/account/SignUp/conditions";
import ConnectWallet from "../components/account/SignUp/connectwallet";
import Siren from "../components/account/SignUp/siren";
import EndingSignUp from "../components/account/SignUp/ending";

const SignUpPage = () => {
  const [step, setStep] = useState("signup");
  const handleValidate = (index) => {
    setStep(index)
  };
  const Funnel = {
    signup: <SignUp onValidate={handleValidate} />,
    rgpd: <Conditions onValidate={handleValidate} title="Nous prenons en charge la RGPD" content="Texte rgpd super intéressant" dbkey="rgpd" nextStep="cg" />,
    cg: <Conditions onValidate={handleValidate} title="Notre politique générale" content="texte sur nos conditions générales super cool" dbkey="cg" nextStep="siren" />,
    siren: <Siren onValidate={handleValidate} />,
    connectwallet: <ConnectWallet onValidate={handleValidate} />,
    ending: <EndingSignUp />
  }
  return Funnel[step];
};

export default SignUpPage;
