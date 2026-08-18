"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { inquiryOptions, intakeOptions, ctaCopy } from "@/data/labels";
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
  const extraInquiry = inquiryOptions.find(
    (option) =>
      option.id === values.inquiry &&
      !intakeOptions.some((intake) => intake.id === option.id),
  );
  const intakeChoices = extraInquiry
    ? [...intakeOptions, extraInquiry]
    : intakeOptions;
  const inquiryHintId = `${formId}-inquiry-hint`;
  const inquiryErrorId = `${formId}-inquiry-error`;
  const inquiryDescribedBy = [
    defaultInquiry && preselectedLabel ? inquiryHintId : null,
    errors.inquiry ? inquiryErrorId : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <form
      className="relative min-w-0 border border-border bg-white p-5 sm:p-8"
      onSubmit={onSubmit}
      noValidate
      method="post"
      action="/kontakt"
      aria-busy={disabled}
    >
      <p className="coord">PROJECT INTAKE</p>
      <h2 className="mt-3 text-2xl text-foreground sm:text-3xl">
        Заявете проект
      </h2>

      <div className="mt-8">
        <p
          id={`${formId}-inquiry-label`}
          className="block text-sm font-medium text-foreground"
        >
          Какво искате да изградим?
          <span className="text-subtle"> — по избор</span>
        </p>
        <div
          role="group"
          aria-labelledby={`${formId}-inquiry-label`}
          aria-describedby={inquiryDescribedBy || undefined}
          className="mt-3 flex min-w-0 flex-wrap gap-2"
        >
          {intakeChoices.map((option) => {
            const selected = values.inquiry === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                disabled={disabled}
                onClick={() =>
                  setValues((current) => ({
                    ...current,
                    inquiry: selected ? "" : option.id,
                  }))
                }
                className={cn(
                  "inline-flex min-h-11 items-center rounded-md border px-4 py-2 text-left text-sm font-medium transition-colors",
                  selected
                    ? "border-electric bg-electric text-white"
                    : "border-border bg-navy-950 text-foreground hover:border-electric/40",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        {defaultInquiry && preselectedLabel ? (
          <p id={inquiryHintId} className="mt-2 text-sm text-subtle">
            Темата е предварително избрана: {preselectedLabel}. Можете да я
            промените.
          </p>
        ) : null}
        {errors.inquiry ? (
          <p id={inquiryErrorId} className="mt-2 text-sm text-red-700" role="alert">
            {errors.inquiry}
          </p>
        ) : null}
      </div>

      <div className="mt-8">
        <label
          htmlFor={`${formId}-message`}
          className="block text-sm font-medium text-foreground"
        >
          Какъв проблем искате да решите?
          <span className="text-electric"> *</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={7}
          required
          disabled={disabled}
          value={values.message}
          placeholder="Опишете накратко как работите днес, какво ви създава проблем и какво искате да стане по-добре."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          onChange={(event) =>
            setValues((current) => ({ ...current, message: event.target.value }))
          }
          className={cn(fieldClassName(Boolean(errors.message)), "min-h-40 resize-y")}
        />
        {errors.message ? (
          <p id={`${formId}-message-error`} className="mt-2 text-sm text-red-700" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const errorId = `${formId}-${field.name}-error`;
          const error = errors[field.name];

          return (
            <div key={field.name} className="min-w-0">
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
        <p className="mt-6 rounded-md border border-cyan/30 bg-electric/10 px-4 py-3 text-sm text-foreground" role="status">
          Запитването беше изпратено успешно. Ще се свържем с вас.
        </p>
      ) : null}

      {status.type === "error" ? (
        <p className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {status.message}
        </p>
      ) : null}

      <div className="mt-8">
        <Button type="submit" disabled={disabled} className="w-full sm:w-auto">
          {disabled ? "Изпращане…" : ctaCopy.requestProject}
        </Button>
      </div>
    </form>
  );
}

function fieldClassName(invalid: boolean): string {
  return cn(
    "mt-2 w-full rounded-md border bg-navy-950 px-3 py-2.5 text-sm font-normal leading-normal tracking-normal text-foreground transition-colors",
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
