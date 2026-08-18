import type { ReactNode } from "react";

/**
 * Small mono caps label with an 8px accent square on the left.
 * Used above every section H2.
 */
export function Eyebrow({
  children,
  pulse = false,
  className = "",
}: {
  children: ReactNode;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        "flex items-center gap-3 font-mono uppercase text-[#8ECE34]",
        "text-[clamp(10px,1vw,12px)] tracking-[0.2em]",
        className,
      ].join(" ")}
    >
      {pulse ? (
        <span className="gr-pulse block h-[7px] w-[7px] shrink-0 rounded-full bg-[#8ECE34]" />
      ) : (
        <span className="block h-2 w-2 shrink-0 bg-[#8ECE34]" />
      )}
      {children}
    </div>
  );
}
