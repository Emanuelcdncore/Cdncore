"use client";

export const PLAN_INTENT_COOKIE = "lt_plan_intent";
export const PLAN_INTENT_TTL_SECONDS = 60 * 60 * 24;

export type PlanCycle = "monthly" | "yearly";

export type PlanIntent = {
  plan: string;
  cycle: PlanCycle;
  ts: number;
};

export function savePlanIntent(plan: string, cycle: PlanCycle): void {
  if (typeof document === "undefined") return;
  const value: PlanIntent = { plan, cycle, ts: Date.now() };
  const encoded = encodeURIComponent(JSON.stringify(value));

  const host = window.location.hostname;
  const isLoritalkProd = host === "lori-talk.eu" || host.endsWith(".lori-talk.eu");
  const domainAttr = isLoritalkProd ? "; Domain=.lori-talk.eu" : "";
  const secureAttr = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie =
    `${PLAN_INTENT_COOKIE}=${encoded}` +
    `; Max-Age=${PLAN_INTENT_TTL_SECONDS}` +
    `; Path=/` +
    `; SameSite=Lax` +
    domainAttr +
    secureAttr;
}
