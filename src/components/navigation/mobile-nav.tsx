"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLinks } from "@/components/navigation/nav-links";
import { routes } from "@/data/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const onClose = () => setOpen(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-haspopup="dialog"
        aria-label={open ? "Затвори менюто" : "Отвори менюто"}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
      </button>
      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        aria-labelledby={titleId}
        className="mobile-nav-dialog"
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            setOpen(false);
          }
        }}
      >
        <div className="flex min-h-full flex-col px-4 py-6 sm:px-6">
          <p id={titleId} className="sr-only">
            Навигация
          </p>
          <NavLinks
            onNavigate={() => setOpen(false)}
            className="flex-col items-stretch gap-1"
            linkClassName="w-full justify-start px-3 text-lg"
          />
          <div className="mt-8">
            <Button
              href={routes.contact}
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Свържете се с нас
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
