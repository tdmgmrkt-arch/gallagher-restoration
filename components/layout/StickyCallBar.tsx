import Link from "next/link";
import { PHONE } from "@/lib/site";

/**
 * Fixed to the bottom on screens < 980px. Hidden on desktop.
 * The Footer includes a matching 76px spacer at the bottom so nothing gets
 * covered on mobile.
 */
export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] flex gap-[10px] border-t border-[rgba(255,255,255,0.10)] bg-[rgba(11,12,11,0.92)] p-[12px_16px] backdrop-blur-[14px] nav:hidden">
      <Link
        href={PHONE.href}
        className="flex flex-1 items-center justify-center gap-[10px] rounded-[2px] bg-[#8ECE34] p-[17px] text-[16px] font-bold text-[#0B0C0B]"
      >
        <span className="gr-pulse block h-2 w-2 rounded-full bg-[#0B0C0B]" />
        Call {PHONE.display}
      </Link>
    </div>
  );
}
