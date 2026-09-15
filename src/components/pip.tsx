import { cn } from "@/lib/utils";

export const PIP = {
  idle: "/art/pip.jpg",
  whisper: "/art/pip-whisper.jpg",
  warn: "/art/pip-warn.jpg",
  bag: "/art/pip-bag.jpg",
} as const;

export type PipPose = keyof typeof PIP;

export function Pip({
  pose = "idle",
  className,
  size = 64,
}: {
  pose?: PipPose;
  className?: string;
  size?: number;
}) {
  return (
    <img
      src={PIP[pose]}
      alt=""
      width={size}
      height={size}
      className={cn("pip-face", className)}
      draggable={false}
    />
  );
}

export function PipAside({
  pose = "whisper",
  children,
  onPipClick,
}: {
  pose?: PipPose;
  children: string;
  onPipClick?: () => void;
}) {
  return (
    <aside className="pip-aside">
      {onPipClick ? (
        <button
          type="button"
          aria-label="Pip"
          onClick={onPipClick}
          className="press shrink-0 rounded-md"
        >
          <Pip pose={pose} size={56} />
        </button>
      ) : (
        <Pip pose={pose} size={56} />
      )}
      <p>
        <span className="pip-name">Pip</span>
        {children}
      </p>
    </aside>
  );
}
