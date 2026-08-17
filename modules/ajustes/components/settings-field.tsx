import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

const fieldClassName =
  "w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-light tracking-[-0.01em] text-white/75 outline-none transition-colors duration-200 placeholder:text-white/25 focus:border-white/[0.14] focus:bg-white/[0.04]";

type SettingsFieldProps = {
  label: string;
  children: ReactNode;
};

export function SettingsField({ label, children }: SettingsFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-light tracking-[-0.01em] text-white/35">
        {label}
      </span>
      {children}
    </label>
  );
}

export function SettingsInput({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${fieldClassName} ${className}`} {...props} />;
}

export function SettingsButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs font-light tracking-[-0.01em] text-white/45 transition-colors duration-200 hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white/60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SettingsTextButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`border-0 bg-transparent p-0 text-xs font-light tracking-[-0.01em] text-white/35 transition-colors duration-200 hover:text-white/50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SettingsDivider() {
  return <div className="my-5 border-t border-white/[0.05]" />;
}
