/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { cn } from "@/lib/utils";

const toneBg: Record<string, string> = {
  sunny: "bg-sunny", grape: "bg-grape", mint: "bg-mint", coral: "bg-coral", sky: "bg-sky",
};

export function BrowserFrame({ url, tone = "sunny", className, tall }: { url?: string | undefined; tone?: string | undefined; className?: string; tall?: boolean }) {
  const main = toneBg[tone] ?? "bg-sunny";
  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="flex items-center gap-1.5 border-b-2 border-ink bg-sand px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-coral ring-1 ring-ink" />
        <span className="h-2.5 w-2.5 rounded-full bg-sunny ring-1 ring-ink" />
        <span className="h-2.5 w-2.5 rounded-full bg-mint ring-1 ring-ink" />
        <span className="num ml-3 truncate rounded-full border border-ink/30 bg-paper px-3 py-0.5 text-[10px]">
          https://{url}
        </span>
      </div>
      <div className={cn("grid grid-cols-6 grid-rows-4 gap-2 bg-cream p-3", tall ? "h-64 sm:h-80" : "h-36")} aria-hidden="true">
        <div className="col-span-6 rounded-md border-2 border-ink bg-paper" />
        <div className={cn("col-span-4 row-span-2 rounded-md border-2 border-ink", main)} />
        <div className="col-span-2 row-span-2 rounded-md border-2 border-ink bg-sand" />
        <div className="col-span-2 rounded-md border-2 border-ink bg-paper" />
        <div className={cn("col-span-2 rounded-md border-2 border-ink", main)} />
        <div className="col-span-2 rounded-md border-2 border-ink bg-paper" />
      </div>
    </div>
  );
}
