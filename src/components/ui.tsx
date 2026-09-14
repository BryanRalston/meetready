import { Overlay } from "@/components/device-frame";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

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
        "mx-auto flex min-h-full w-full flex-1 flex-col",
        flush
          ? "px-0 pb-0 pt-0"
          : "px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))]",
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
        "press inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] px-5 text-[15px] font-medium tracking-tight disabled:opacity-40",
        variant === "primary" && "bg-accent text-accent-fg",
        variant === "ghost" && "bg-transparent text-muted",
        variant === "outline" && "bg-transparent text-fg shadow-[0_0_0_1px_rgb(242_238_230/0.16)]",
        variant === "subtle" && "bg-surface-2 text-fg",
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
        "press min-h-11 rounded-[14px] px-3.5 py-2.5 text-left text-[14px] leading-snug",
        selected ? "bg-fg text-bg" : "bg-surface-2 text-fg shadow-[0_0_0_1px_rgb(242_238_230/0.08)]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Progress({ value, max }: { value: number; max: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="h-[3px] w-full overflow-hidden rounded-full bg-surface-2">
      <div
        className="h-full origin-left rounded-full bg-accent"
        style={{ transform: `scaleX(${pct / 100})`, transition: "transform 250ms cubic-bezier(0.22, 1, 0.36, 1)" }}
      />
    </div>
  );
}

export function Label({ children, className }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-[11px] font-medium uppercase tracking-[0.16em] text-subtle", className)}>
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
    <section
      className={cn(
        "rounded-[28px] bg-surface p-5 shadow-[0_0_0_1px_rgb(242_238_230/0.08)]",
        className,
      )}
    >
      {children}
    </section>
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
      <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.14em] text-subtle">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-[12px] bg-surface-2 px-4 text-[16px] text-fg outline-none placeholder:text-subtle shadow-[0_0_0_1px_rgb(242_238_230/0.1)] focus:shadow-[0_0_0_1px_rgb(242_238_230/0.35)]"
      />
    </label>
  );
}

export function Sheet({ children }: { children: ReactNode }) {
  return (
    <Overlay>
      <div className="max-h-[90%] w-full overflow-y-auto rounded-[28px] bg-surface p-5 shadow-[0_0_0_1px_rgb(242_238_230/0.12)]">
        {children}
      </div>
    </Overlay>
  );
}

export function Kicker({ children }: { children: string }) {
  return <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-subtle">{children}</p>;
}

export function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-display text-[32px] font-medium leading-[1.1] tracking-[-0.03em]">{children}</h1>
  );
}
