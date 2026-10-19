/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { useEffect, useState } from "react";

function istNow() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function ISTClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    setTime(istNow());
    const id = setInterval(() => setTime(istNow()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="num inline-flex flex-col gap-1 rounded-2xl border-2 border-ink bg-paper/85 px-4 py-3 text-[11px] uppercase tracking-[0.2em] hard-sm">
      <span className="text-lg tracking-normal tabular-nums">{time} IST</span>
      <span className="text-muted-foreground">Delhi NCR, India 📍</span>
    </div>
  );
}
