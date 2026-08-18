import Link from "next/link";
import { COMPANY, PHONE } from "@/lib/site";

export function TopBar() {
  return (
    <div className="border-b border-[color:var(--color-border-soft)] bg-[#101210]">
      <div className="mx-auto flex h-[42px] max-w-[1300px] items-center justify-between gap-5 px-[clamp(20px,5vw,56px)]">
        <div className="flex items-center gap-[10px] overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-[#8A8F86]">
          <span className="gr-pulse block h-[7px] w-[7px] shrink-0 rounded-full bg-[#8ECE34]" />
          24/7 Emergency Response &middot; Crews On Site Within 60 Minutes
        </div>
        <div className="hidden items-center gap-6 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-[#8A8F86] sm:flex">
          <span>{COMPANY.city}</span>
          <Link
            href={PHONE.href}
            className="text-[#F4F5F1] transition-colors hover:text-[#8ECE34]"
          >
            {PHONE.display}
          </Link>
        </div>
      </div>
    </div>
  );
}
