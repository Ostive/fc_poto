"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode
} from "react";

type TabProps = {
  id: string;
  label: string;
  kicker?: string;
  children: ReactNode;
};

/**
 * Composant marqueur - ne rend rien directement.
 * `Tabs` lit ses props (id, label, kicker, children) pour construire les onglets.
 */
export function Tab(_props: TabProps): ReactElement | null {
  return null;
}

/**
 * Onglets pilule, fond cream/ink. Convient pour Foot 11 / Foot 7,
 * et imbricables pour Équipe A / Équipe B à l'intérieur.
 *
 * Usage :
 *   <Tabs defaultId="foot11">
 *     <Tab id="foot11" label="Football à 11">…</Tab>
 *     <Tab id="foot7"  label="Football à 7">…</Tab>
 *   </Tabs>
 */
export function Tabs({
  children,
  defaultId,
  variant = "primary"
}: {
  children: ReactNode;
  defaultId?: string;
  variant?: "primary" | "secondary";
}) {
  const tabs: TabProps[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement<TabProps>(child)) {
      tabs.push(child.props);
    }
  });

  const [active, setActive] = useState<string>(defaultId ?? tabs[0]?.id ?? "");
  const tabIdsKey = tabs.map((t) => t.id).join("|");

  // Synchronise l'onglet actif avec le hash de l'URL (#foot7, #foot11, etc.)
  // Permet d'arriver depuis un lien externe directement sur le bon onglet.
  useEffect(() => {
    const ids = tabIdsKey.split("|").filter(Boolean);
    const syncFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash && ids.includes(hash)) {
        setActive(hash);
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [tabIdsKey]);

  const activeTab = tabs.find((t) => t.id === active);

  const isPrimary = variant === "primary";

  return (
    <div>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={`flex flex-wrap items-center gap-2 ${
          isPrimary ? "border-b border-ink/15 pb-5 mb-12" : "mb-8"
        }`}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={`group inline-flex items-baseline gap-2.5 rounded-full border transition-colors ${
                isPrimary
                  ? "px-5 py-3 text-[13px]"
                  : "px-4 py-2 text-[12px]"
              } font-mono tracking-[0.1em] uppercase ${
                isActive
                  ? "bg-ink text-cream border-ink"
                  : "border-ink/25 hover:border-ink"
              }`}
            >
              <span>{tab.label}</span>
              {tab.kicker && (
                <span
                  className={`text-[10px] ${
                    isActive ? "text-cream/60" : "text-ink/45"
                  }`}
                >
                  {tab.kicker}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" aria-labelledby={active}>
        {activeTab?.children}
      </div>
    </div>
  );
}
