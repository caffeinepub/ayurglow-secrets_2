import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Lightbulb } from "lucide-react";
import { useState } from "react";
import type { Subcategory } from "../data/remedies";
import RemedyCard from "./RemedyCard";

interface CategoryPageProps {
  title: string;
  description: string;
  icon: string;
  subcategories: Subcategory[];
  categoryKey: string;
}

export default function CategoryPage({
  title,
  description,
  icon,
  subcategories,
  categoryKey,
}: CategoryPageProps) {
  const [activeTab, setActiveTab] = useState(subcategories[0]?.id || "");

  // activeSubcat used for future extensions
  const _activeSubcat = subcategories.find((s) => s.id === activeTab);

  return (
    <main className="min-h-screen" data-ocid={`${categoryKey}.page`}>
      {/* Category Hero */}
      <section
        className="hero-gradient text-white py-14"
        data-ocid={`${categoryKey}.hero.section`}
      >
        <div className="container">
          <div className="max-w-2xl">
            <div className="text-4xl mb-3">{icon}</div>
            <h1 className="font-display text-4xl font-bold mb-3 leading-tight">
              {title}
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Subcategory Tabs + Remedies */}
      <section className="py-10" data-ocid={`${categoryKey}.remedies.section`}>
        <div className="container">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            data-ocid={`${categoryKey}.subcategory.tab`}
          >
            {/* Tab List */}
            <div className="overflow-x-auto pb-2 mb-8">
              <TabsList className="inline-flex h-auto gap-2 bg-transparent p-0">
                {subcategories.map((sub) => (
                  <TabsTrigger
                    key={sub.id}
                    value={sub.id}
                    data-ocid={`${categoryKey}.${sub.id}.tab`}
                    className="px-4 py-2.5 rounded-full text-sm font-medium border border-border whitespace-nowrap
                      data-[state=active]:bg-[oklch(0.38_0.12_225)] data-[state=active]:text-white data-[state=active]:border-transparent
                      data-[state=inactive]:bg-white data-[state=inactive]:text-foreground/70 data-[state=inactive]:hover:border-brand-blue"
                  >
                    {sub.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Tab Content */}
            {subcategories.map((sub) => (
              <TabsContent key={sub.id} value={sub.id} className="mt-0">
                {/* Subcategory header */}
                <div className="mb-6">
                  <h2 className="font-display text-2xl font-bold text-[oklch(0.25_0.1_230)] mb-2">
                    {sub.label}
                  </h2>
                  <p className="text-muted-foreground">{sub.description}</p>
                </div>

                {/* Disclaimer if any */}
                {sub.disclaimer && (
                  <Alert className="mb-6 border-amber-200 bg-amber-50">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800 text-sm">
                      {sub.disclaimer}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Remedy cards grid */}
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  data-ocid={`${categoryKey}.${sub.id}.list`}
                >
                  {sub.remedies.map((remedy, i) => (
                    <RemedyCard key={remedy.id} remedy={remedy} index={i} />
                  ))}
                </div>

                {/* Tips section if any */}
                {sub.tips && sub.tips.length > 0 && (
                  <div className="mt-8 p-6 rounded-xl bg-[oklch(0.95_0.02_155)] border border-[oklch(0.87_0.04_155)]">
                    <h3 className="font-display text-lg font-semibold text-[oklch(0.28_0.12_155)] mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Tips & Best Practices
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {sub.tips.map((tip) => (
                        <div key={tip.title} className="text-center">
                          <p className="font-semibold text-sm text-[oklch(0.28_0.12_155)] mb-1">
                            {tip.title}
                          </p>
                          <p className="text-xs text-[oklch(0.42_0.14_155)/80]">
                            {tip.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </main>
  );
}
