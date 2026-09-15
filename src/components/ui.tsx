import { Overlay } from "@/components/device-frame";
import { cn } from "@/lib/utils";
import { useEffect, useId, useRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";

export function Shell({
  children,
  className,
  flush,
}: {
  children: ReactNode;
  className?: string;
  flush?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex h-full min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden",
        flush
          ? "px-0 pb-0 pt-0"
          : "px-5 pb-[max(1rem,var(--phone-safe-bottom))] pt-[max(0.75rem,var(--phone-safe-top))]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline" | "subtle";
}) {
  return (
    <button
      className={cn(
        "press inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 text-body font-medium tracking-tight disabled:opacity-40",
        variant === "primary" && "bg-accent text-accent-fg",
        variant === "ghost" && "bg-transparent text-muted",
        variant === "outline" && "bg-transparent text-fg shadow-border-strong",
        variant === "subtle" && "bg-navy-2 text-fg",
        className,
      )}
      {...props}
    />
  );
}

export function Chip({
  selected,
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "press min-h-12 rounded-md px-4 py-3 text-left text-ui leading-snug",
        selected ? "bg-fg text-bg" : "bg-navy-2 text-fg shadow-border",
        className,
      )}
      aria-pressed={selected}
      {...props}
    >
      {children}
    </button>
  );
}

export function Progress({ value, max }: { value: number; max: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="h-0.5 w-full overflow-hidden rounded-full bg-navy-2">
      <div
        className="h-full origin-left rounded-full bg-accent"
        style={{
          transform: `scaleX(${pct / 100})`,
          transitionProperty: "transform",
          transitionDuration: "var(--motion-fast)",
          transitionTimingFunction: "var(--ease-out)",
        }}
      />
    </div>
  );
}

export function Label({ children, className }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-kicker font-medium uppercase tracking-kicker text-subtle", className)}>
      {children}
    </p>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-card bg-navy p-4 shadow-border", className)}>{children}</section>
  );
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-meta font-medium uppercase tracking-kicker text-subtle">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-md bg-navy-2 px-4 text-base text-fg shadow-border outline-none placeholder:text-muted focus:shadow-focus"
      />
    </label>
  );
}

export function Sheet({
  children,
  onClose,
  labelledBy,
}: {
  children: ReactNode;
  onClose?: () => void;
  labelledBy?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const fallbackId = useId();
  const labelId = labelledBy ?? fallbackId;

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const root = panelRef.current;
    const focusables = () =>
      [
        ...(root?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? []),
      ];
    focusables()[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
        return;
      }
      if (e.key !== "Tab" || !root) return;
      const list = focusables();
      if (!list.length) return;
      const i = list.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        list[list.length - 1]?.focus();
      } else if (!e.shiftKey && i === list.length - 1) {
        e.preventDefault();
        list[0]?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  return (
    <Overlay>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        className="max-h-[90%] w-full overflow-y-auto rounded-card bg-navy p-4 shadow-border-strong"
      >
        {children}
      </div>
    </Overlay>
  );
}

export function Kicker({ children }: { children: string }) {
  return <p className="mb-3 text-kicker uppercase tracking-kicker text-subtle">{children}</p>;
}

export function Title({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1
      className={cn(
        "font-display text-title font-medium leading-title tracking-title",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function Lede({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mt-2 text-body leading-relaxed text-muted", className)}>{children}</p>
  );
}

export function IconButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "press flex h-12 w-12 shrink-0 items-center justify-center rounded-md text-fg/80",
        className,
      )}
      {...props}
    />
  );
}
