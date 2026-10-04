"use client";

import Image from "next/image";

interface CompanyLogoProps {
  src?: string;
  company: string;
  size?: number;
}

/** Initials for the companies with no usable logo, so every row still has a mark. */
function initials(company: string) {
  return company
    .replace(/^Under\s+/i, "")
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/**
 * Square logo tile. The marks keep each organisation's own colours, which means
 * they need the white field they were drawn for, the way LinkedIn renders them.
 */
export default function CompanyLogo({ src, company, size = 40 }: CompanyLogoProps) {
  if (!src) {
    return (
      <div
        aria-hidden
        style={{ width: size, height: size }}
        className="shrink-0 rounded-lg flex items-center justify-center bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] font-mono text-xs font-semibold text-[#cbd5e1]"
      >
        {initials(company)}
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="shrink-0 rounded-lg overflow-hidden bg-white border border-[rgba(255,255,255,0.12)]"
    >
      {/* images.unoptimized is on for the static export, so this emits a plain img */}
      <Image
        src={src}
        alt={`${company} logo`}
        width={size}
        height={size}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
