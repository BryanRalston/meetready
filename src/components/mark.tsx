export function Mark({ className = "h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden>
      <rect x="2" y="20" width="24" height="1.6" rx="0.8" fill="currentColor" />
      <rect x="13.2" y="6" width="1.6" height="14.4" fill="currentColor" />
    </svg>
  );
}
