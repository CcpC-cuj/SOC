import { Sparkles } from "lucide-react";

export default function SectionHeader({
  eyebrow,
  title,
  sub,
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">

      <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs text-muted-foreground">

        <Sparkles className="h-3 w-3 text-cyan-400" />

        {eyebrow}

      </div>

      <h2 className="mt-5 text-4xl font-bold">
        {title}
      </h2>

      {sub && (
        <p className="mt-4 text-muted-foreground">
          {sub}
        </p>
      )}

    </div>
  );
}