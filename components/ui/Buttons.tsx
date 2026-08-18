import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type AnchorLike = Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string;
  children: ReactNode;
};

/**
 * Green primary CTA. Includes an optional pulsing dark dot on the left.
 * Sizes: sm (14px 22px), md (17px 26px), lg (21px 34px).
 */
export function ButtonPrimary({
  children,
  className = "",
  size = "md",
  dot = false,
  href,
  ...rest
}: AnchorLike & { size?: "sm" | "md" | "lg"; dot?: boolean }) {
  const pad =
    size === "lg"
      ? "px-[34px] py-[21px] text-[clamp(16px,1.5vw,19px)]"
      : size === "sm"
        ? "px-[22px] py-[15px] text-[14px]"
        : "px-[26px] py-[17px] text-[16px]";

  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center gap-3 rounded-[2px] bg-[#8ECE34] font-bold tracking-[-0.01em] text-[#0B0C0B]",
        "transition-[transform,box-shadow,background-color] duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.3,1)]",
        "hover:bg-[#A6E053] hover:-translate-y-[2px] hover:shadow-[0_14px_34px_rgba(142,206,52,0.28)]",
        pad,
        className,
      ].join(" ")}
      {...rest}
    >
      {dot ? (
        <span className="gr-pulse block h-2 w-2 shrink-0 rounded-full bg-[#0B0C0B]" />
      ) : null}
      {children}
    </Link>
  );
}

export function ButtonGhost({
  children,
  className = "",
  href,
  ...rest
}: AnchorLike) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center gap-3 rounded-[2px] border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.04)] px-[26px] py-[17px]",
        "text-[15px] font-semibold tracking-[-0.01em] text-[#F4F5F1]",
        "transition-all duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.3,1)]",
        "hover:border-[#8ECE34] hover:bg-[rgba(142,206,52,0.07)] hover:text-[#8ECE34]",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </Link>
  );
}
