"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";

export default function AnnouncementBar() {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-brand-black border-b border-border-subtle py-2 px-4 text-center overflow-hidden">
      <div className="animate-ticker text-[11px] font-mono tracking-widest uppercase text-brand-muted flex items-center gap-12 whitespace-nowrap">
        <span>{t("ticker.tag1")}</span>
        <span className="text-brand-lime font-bold">•</span>
        <span>{t("ticker.tag2")}</span>
        <span className="text-brand-lime font-bold">•</span>
        <span>{t("ticker.tag3")}</span>
        <span className="text-brand-lime font-bold">•</span>
        <span>{t("ticker.tag4")}</span>
        <span className="text-brand-lime font-bold">•</span>
        <span>{t("ticker.tag5")}</span>
        <span className="text-brand-lime font-bold">•</span>
        {/* Repeated for continuous loop */}
        <span>{t("ticker.tag1")}</span>
        <span className="text-brand-lime font-bold">•</span>
        <span>{t("ticker.tag2")}</span>
        <span className="text-brand-lime font-bold">•</span>
        <span>{t("ticker.tag3")}</span>
        <span className="text-brand-lime font-bold">•</span>
        <span>{t("ticker.tag4")}</span>
        <span className="text-brand-lime font-bold">•</span>
        <span>{t("ticker.tag5")}</span>
      </div>
    </div>
  );
}

