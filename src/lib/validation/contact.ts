import { isInquiryId } from "@/data/labels";

export type ContactFieldName =
  | "name"
  | "email"
  | "company"
  | "phone"
  | "inquiry"
  | "message";

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  phone: string;
  inquiry: string;
  message: string;
  website: string;
};

export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export type ContactValidationResult =
  | { ok: true; data: Omit<ContactInput, "website">; isSpam: boolean }
  | { ok: false; errors: ContactFieldErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+0-9()\s.-]{6,24}$/;

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function emptyContactInput(inquiry = ""): ContactInput {
  return {
    name: "",
    email: "",
    company: "",
    phone: "",
    inquiry: isInquiryId(inquiry) ? inquiry : "",
    message: "",
    website: "",
  };
}

export function readContactInput(value: unknown): ContactInput {
  if (typeof value !== "object" || value === null) {
    return emptyContactInput();
  }

  const record = value as Record<string, unknown>;

  return {
    name: asTrimmedString(record.name),
    email: asTrimmedString(record.email),
    company: asTrimmedString(record.company),
    phone: asTrimmedString(record.phone),
    inquiry: asTrimmedString(record.inquiry),
    message: asTrimmedString(record.message),
    website: asTrimmedString(record.website),
  };
}

export function validateContactInput(value: unknown): ContactValidationResult {
  const input = readContactInput(value);
  const errors: ContactFieldErrors = {};

  if (input.name.length < 2) {
    errors.name = "Моля, въведете вашето име.";
  } else if (input.name.length > 80) {
    errors.name = "Името трябва да е до 80 символа.";
  }

  if (!EMAIL_PATTERN.test(input.email)) {
    errors.email = "Моля, въведете валиден имейл адрес.";
  } else if (input.email.length > 120) {
    errors.email = "Имейлът трябва да е до 120 символа.";
  }

  if (input.company.length > 0 && input.company.length < 2) {
    errors.company = "Моля, въведете име на компания или оставете полето празно.";
  } else if (input.company.length > 120) {
    errors.company = "Името на компанията трябва да е до 120 символа.";
  }

  if (input.phone.length > 0 && !PHONE_PATTERN.test(input.phone)) {
    errors.phone =
      "Моля, въведете валиден телефонен номер или оставете полето празно.";
  }

  if (input.inquiry.length > 0 && !isInquiryId(input.inquiry)) {
    errors.inquiry = "Моля, изберете валидна тема или оставете полето празно.";
  }

  if (input.message.length < 10) {
    errors.message = "Съобщението трябва да съдържа поне 10 символа.";
  } else if (input.message.length > 4000) {
    errors.message = "Съобщението трябва да е до 4000 символа.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    isSpam: input.website.length > 0,
    data: {
      name: input.name,
      email: input.email,
      company: input.company,
      phone: input.phone,
      inquiry: input.inquiry,
      message: input.message,
    },
  };
}

export function isContactDeliveryConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.CONTACT_TO_EMAIL?.trim() &&
      process.env.CONTACT_FROM_EMAIL?.trim(),
  );
}
