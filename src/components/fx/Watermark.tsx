type Props = {
  text: string;
  /** "1" = large top line, "2" = smaller bottom line (opposite drift). */
  variant?: "1" | "2";
  stroke: string;
  className?: string;
  top?: string;
};

/**
 * Giant outline text drifting horizontally on scroll. The drift itself is
 * driven by StackEffect, which reads every [data-wm] inside a [data-stack].
 */
export default function Watermark({ text, variant = "1", stroke, className = "", top = "clamp(24px,5vw,64px)" }: Props) {
  const isTop = variant === "1";
  return (
    <div
      aria-hidden
      data-wm={variant}
      className={`watermark ${className}`}
      style={{
        ["--wm-stroke" as string]: stroke,
        fontSize: isTop ? "clamp(7rem,19vw,20rem)" : "clamp(5rem,12vw,13rem)",
        top: isTop ? top : undefined,
        bottom: isTop ? undefined : "clamp(40px,6vw,80px)",
      }}
    >
      {text}
    </div>
  );
}
