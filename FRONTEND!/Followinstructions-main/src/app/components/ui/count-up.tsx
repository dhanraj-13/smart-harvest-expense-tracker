import { useEffect, useMemo, useState } from "react";

type CountUpProps = {
  end: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  compactThousands?: boolean;
};

export function CountUp({
  end,
  durationMs = 900,
  prefix = "",
  suffix = "",
  compactThousands = false,
}: CountUpProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(end * eased);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, end]);

  const formatted = useMemo(() => {
    if (compactThousands && end >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return Math.round(value).toLocaleString("en-IN");
  }, [compactThousands, end, value]);

  return <>{`${prefix}${formatted}${suffix}`}</>;
}
