import { Reveal } from "@/components/ui/Reveal";

/**
 * A titled block on a legal page — rule, heading, prose.
 *
 * Shared by /privacy-policy, /terms-of-service, /sms-terms and
 * /sms-privacy-policy so the four pages stay visually identical. The child
 * selectors style plain `<p>`, `<ul>` and `<a>` so each page can be written as
 * near-prose instead of repeating class strings on every element.
 */
export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="mt-[clamp(40px,5vw,64px)] border-t border-[rgba(255,255,255,0.08)] pt-[clamp(28px,3.4vw,44px)]">
        <h2 className="text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.15] tracking-[-0.025em] text-[#F4F5F1]">
          {title}
        </h2>
        <div className="mt-6 flex flex-col gap-5 text-[15px] leading-[1.8] text-[#C6CABF] text-pretty [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3 [&_ul]:pl-6 [&_ul]:[list-style:disc] [&_li]:leading-[1.7] [&_a]:text-[#8ECE34] [&_a:hover]:text-[#A6E053]">
          {children}
        </div>
      </div>
    </Reveal>
  );
}
