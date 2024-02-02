"use server";

export async function verifyCaptcha(prevState: any, token: string | null) {
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      method: "POST",
    }
  );

  const data = await res.json();
  if (data.success) {
    return {message: "Captcha verified", error: false, verified: true};
  } else {
    return {message: "Failed Captcha", error: true, verified: false};
  }
}
