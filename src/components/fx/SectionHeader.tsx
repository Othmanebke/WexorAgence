import type { CSSProperties } from "react";
import SplitTitle from "@/components/fx/SplitTitle";

type Props = {
  label: string;
  title: string;
  intro?: React.ReactNode;
  tone: "dark" | "light";
  titleSize?: string;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

/** Centered section header: orange label, split H2 and intro paragraph. */
export default function SectionHeader({
  label,
  title,
  intro,
  tone,
  titleSize = "clamp(2.8rem,9vw,110px)",
  children,
  className = "",
  style,
}: Props) {
  const dark = tone === "dark";
  return (
    <header className={`flex flex-col items-center text-center gap-3 ${className}`} style={style}>
      <span
        className={`font-bold text-[14px] uppercase tracking-[0.25em] ${
          dark ? "text-abcs-red" : "text-abcs-red-text"
        }`}
      >
        {label}
      </span>
      <SplitTitle
        lines={[title]}
        className="m-0 font-heading font-normal uppercase leading-[0.9] tracking-[-0.02em]"
        style={{ fontSize: titleSize }}
      />
      {intro && (
        <p
          className={`mt-2 max-w-[520px] text-[16px] leading-[1.6] text-pretty ${
            dark ? "text-white/72" : "text-abcs-black/72"
          }`}
        >
          {intro}
        </p>
      )}
      {children}
    </header>
  );
}
