import type { CreateEmailOptions, CreateEmailRequestOptions } from "resend";

import { Resend } from "resend";

export type ReactEmailProps<T> = React.FC<Readonly<T>>;

const companyName = "lakikabio";
const email = "info@lakikabio.ca";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  payload: Omit<CreateEmailOptions, "from">,
  options?: CreateEmailRequestOptions,
) {
  return await resend.emails.send(
    {
      from: `${companyName} <${email}>`,
      react: null,
      ...payload,
    },
    options,
  );
}
