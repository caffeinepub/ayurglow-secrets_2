import { Badge } from "@/components/ui/badge";
import { CheckCircle, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { useState } from "react";
import type { Remedy } from "../data/remedies";

interface RemedyCardProps {
  remedy: Remedy;
  index: number;
}

export default function RemedyCard({ remedy, index }: RemedyCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="remedy-card" data-ocid={`remedy.item.${index + 1}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <h3 className="font-display text-base font-semibold text-[oklch(0.25_0.1_230)] leading-snug">
            {remedy.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            {remedy.description}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          data-ocid={`remedy.expand.button.${index + 1}`}
          className="flex-shrink-0 p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-brand-blue transition-colors"
          aria-label={expanded ? "Collapse remedy" : "Expand remedy"}
        >
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Frequency always visible */}
      <div className="flex items-center gap-1.5 text-xs text-[oklch(0.42_0.14_155)]">
        <Clock className="w-3.5 h-3.5" />
        <span className="font-medium">{remedy.frequency}</span>
      </div>

      {/* Expandable content */}
      {expanded && (
        <div className="mt-4 space-y-4 border-t border-border pt-4 animate-fade-in">
          {/* Ingredients */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-[oklch(0.38_0.12_225)] mb-2">
              🌿 Ingredients
            </h4>
            <ul className="space-y-1">
              {remedy.ingredients.map((ing) => (
                <li
                  key={ing}
                  className="text-sm text-foreground/80 flex items-start gap-2"
                >
                  <span className="text-[oklch(0.42_0.14_155)] mt-0.5">•</span>
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Application */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-[oklch(0.38_0.12_225)] mb-2">
              📋 Application
            </h4>
            <ol className="space-y-1">
              {remedy.application.map((step, stepIdx) => (
                <li
                  key={step}
                  className="text-sm text-foreground/80 flex items-start gap-2"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[oklch(0.88_0.06_160)] text-[oklch(0.25_0.1_155)] text-xs font-bold flex items-center justify-center mt-0.5">
                    {stepIdx + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Benefits */}
          <div className="rounded-lg bg-[oklch(0.96_0.02_200)] border border-[oklch(0.87_0.025_215)] p-3">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-[oklch(0.38_0.12_225)] mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              Benefits
            </h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {remedy.benefits}
            </p>
          </div>

          {/* Disclaimer if any */}
          {remedy.disclaimer && (
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
              <p className="text-xs text-amber-800">{remedy.disclaimer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
