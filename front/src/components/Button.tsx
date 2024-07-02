import { ReactNode } from "react";

export function Button({ children }: { children: ReactNode }) {
  return (
    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[hsl(142_86%_38%)] text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
      {children}
    </button>
  );
}
