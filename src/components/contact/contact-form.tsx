"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { inquiryOptions, ctaCopy } from "@/data/labels";
import { cn } from "@/lib/cn";
import {
  emptyContactInput,
  validateContactInput,
  type ContactFieldErrors,
  type ContactInput,
} from "@/lib/validation/contact";

type FormStatus =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success" }
  | { type: "error"; message: string };

const fields: Array<{
  name: "name" | "email" | "company" | "phone";
  label: string;
  type: "text" | "email" | "tel";
  autoComplete: string;
  required: boolean;
}> = [
  { name: "name", label: "Име", type: "text", autoComplete: "name", required: true },
  { name: "email", label: "Имейл", type: "email", autoComplete: "email", required: true },
  {
    name: "company",
    label: "Компания",
    type: "text",
    autoComplete: "organization",
    required: false,
  },
  {
    name: "phone",
    label: "Телефон",
    type: "tel",
    autoComplete: "tel",
    required: false,
  },
];

type ContactFormProps = {
  defaultInquiry?: string;
};

export function ContactForm({ defaultInquiry = "" }: ContactFormProps) {
  const formId = useId();
  const [values, setValues] = useState<ContactInput>(() =>
    emptyContactInput(defaultInquiry),
  );
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateContactInput(values);

    if (!result.ok) {
      setErrors(result.errors);
      setStatus({ type: "idle" });
      return;
    }

    setErrors({});
    setStatus({ type: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload: unknown = await response.json();
      const responseStatus = getResponseStatus(payload);

      if (response.ok && responseStatus === "sent") {
        setValues(emptyContactInput());
        setStatus({ type: "success" });
        return;
      }

      setStatus({
        type: "error",
        message: "Възникна проблем при изпращането. Моля, опитайте отново.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Възникна проблем при изпращането. Моля, опитайте отново.",
      });
    }
  }

  const disabled = status.type === "submitting";
  const preselectedLabel = inquiryOptions.find(
    (option) => option.id === defaultInquiry,
  )?.label;

  return (
    <form
      className="relative rounded-[1.4rem] border border-border bg-white p-5 shadow-[0_20px_50px_rgb(12_23_48_/_0.06)] sm:p-8"
      onSubmit={onSubmit}
      noValidate
      method="post"
      action="/kontakt"
      aria-busy={disabled}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const errorId = `${formId}-${field.name}-error`;
          const error = errors[field.name];

          return (
            <div
              key={field.name}
              className={field.name === "company" || field.name === "phone" ? "sm:col-span-1" : undefined}
            >
              <label
                htmlFor={`${formId}-${field.name}`}
                className="block text-sm font-medium text-foreground"
              >
                {field.label}
                {field.required ? (
                  <span className="text-electric"> *</span>
                ) : (
                  <span className="text-subtle"> — по избор</span>
                )}
              </label>
              <input
                id={`${formId}-${field.name}`}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                required={field.required}
                disabled={disabled}
                value={values[field.name]}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [field.name]: event.target.value,
                  }))
                }
                className={fieldClassName(Boolean(error))}
              />
              {error ? (
        <p id={errorId} className="mt-2 text-sm text-red-700" role="alert">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <label
          htmlFor={`${formId}-inquiry`}
          className="block text-sm font-medium text-foreground"
        >
          Какво искате да изградим?
          <span className="text-subtle"> — по избор</span>
        </label>
        <select
          id={`${formId}-inquiry`}
          name="inquiry"
          disabled={disabled}
          value={values.inquiry}
          aria-invalid={errors.inquiry ? true : undefined}
          aria-describedby={
            [
              errors.inquiry ? `${formId}-inquiry-error` : null,
              defaultInquiry ? `${formId}-inquiry-hint` : null,
            ]
              .filter(Boolean)
              .join(" ") || undefined
          }
          onChange={(event) =>
            setValues((current) => ({ ...current, inquiry: event.target.value }))
          }
          className={cn(
            fieldClassName(Boolean(errors.inquiry)),
            "[color-scheme:light]",
          )}
        >
          <option value="">Изберете тема</option>
          {inquiryOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        {defaultInquiry && preselectedLabel ? (
          <p id={`${formId}-inquiry-hint`} className="mt-2 text-sm text-subtle">
            Темата е предварително избрана: {preselectedLabel}. Можете да я
            промените.
          </p>
        ) : null}
        {errors.inquiry ? (
          <p
            id={`${formId}-inquiry-error`}
            className="mt-2 text-sm text-red-700"
            role="alert"
          >
            {errors.inquiry}
          </p>
        ) : null}
      </div>

      <div className="mt-5">
        <label
          htmlFor={`${formId}-message`}
          className="block text-sm font-medium text-foreground"
        >
          Съобщение<span className="text-electric"> *</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={6}
          required
          disabled={disabled}
          value={values.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          onChange={(event) =>
            setValues((current) => ({ ...current, message: event.target.value }))
          }
          className={cn(fieldClassName(Boolean(errors.message)), "resize-y")}
        />
        {errors.message ? (
          <p id={`${formId}-message-error`} className="mt-2 text-sm text-red-700" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Уебсайт</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) =>
            setValues((current) => ({ ...current, website: event.target.value }))
          }
        />
      </div>

      {status.type === "success" ? (
        <p className="mt-5 rounded-md border border-cyan/30 bg-electric/10 px-4 py-3 text-sm text-foreground" role="status">
          Запитването беше изпратено успешно. Ще се свържем с вас.
        </p>
      ) : null}

      {status.type === "error" ? (
        <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {status.message}
        </p>
      ) : null}

      <div className="mt-6">
        <Button type="submit" disabled={disabled} className="w-full sm:w-auto">
          {disabled ? "Изпращане…" : ctaCopy.sendInquiry}
        </Button>
      </div>
    </form>
  );
}

function fieldClassName(invalid: boolean): string {
  return cn(
    "mt-2 w-full rounded-md border bg-navy-950 px-3 py-2.5 text-sm text-foreground transition-colors",
    invalid
      ? "border-red-400/60"
      : "border-border focus:border-electric",
  );
}

function getResponseStatus(payload: unknown): string | undefined {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const status = (payload as { status?: unknown }).status;
  return typeof status === "string" ? status : undefined;
}
