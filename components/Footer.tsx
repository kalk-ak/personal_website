"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0f] border-t border-[rgba(0,245,212,0.06)] py-8">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-4">
        <div className="font-mono text-xs text-[#475569]">
          <span className="text-[#64748b]">{"<"}</span>
          <span className="text-[#00f5d4]">KA</span>
          <span className="text-[#64748b]">{" />"}</span>
          <span className="ml-3">Kaleb Aklilu · {year}</span>
        </div>
      </div>
    </footer>
  );
}
