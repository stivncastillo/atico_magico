"use client";
import React, { useEffect, useRef } from "react";

import { useFormState } from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";

import { verifyCaptcha } from "./actions";

interface CaptchatProps {
  onVerify: (isVerified: boolean) => void;
}

const Captchat: React.FC<CaptchatProps> = ({ onVerify }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [state, formAction] = useFormState(verifyCaptcha, {
    verified: false,
  });

  const handleCaptchaSubmission = async (token: string | null) => {
    const actionVerify = formAction.bind(null, token);
    actionVerify();
  };

  useEffect(() => {
    if (state?.verified !== undefined) onVerify(state?.verified);
  }, [onVerify, state]);

  return (
    <ReCAPTCHA
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
      ref={recaptchaRef}
      onChange={handleCaptchaSubmission}
    />
  );
};

export default Captchat;
