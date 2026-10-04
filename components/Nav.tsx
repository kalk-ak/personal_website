"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Tools", href: "#tools" },
  { label: "Courses", href: "#courses" },
  { label: "Contact", href: "#contact" },
];

/**
 * A section link. On the homepage it stays a bare hash anchor so the CSS
 * smooth scroll handles it; anywhere else it has to be a real `Link` to `/`
 * plus the hash, which also gets the basePath applied for GitHub Pages.
 */
function NavLink({
  href,
  onHome,
  className,
  onClick,
  children,
}: {
  href: string;
  onHome: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if (onHome) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={`/${href}`} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname();
  // The section links are in-page anchors on the homepage, but have to become
  // real routes back to it from /projects and the per-project pages.
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ["about", "projects", "experience", "skills", "tools", "courses", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(10,10,15,0.85)] backdrop-blur-xl border-b border-[rgba(0,245,212,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-sm font-medium tracking-widest text-[#00f5d4] hover:text-white transition-colors"
          >
            <span className="text-[#64748b]">{"<"}</span>
            KA
            <span className="text-[#64748b]">{" />"}</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  onHome={onHome}
                  className={`text-sm font-medium transition-all duration-200 relative py-1 ${
                    active === link.href.replace("#", "")
                      ? "text-[#00f5d4]"
                      : "text-[#94a3b8] hover:text-[#e2e8f0]"
                  }`}
                >
                  {link.label}
                  {active === link.href.replace("#", "") && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-[#00f5d4]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#94a3b8] hover:text-[#00f5d4] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[rgba(10,10,15,0.97)] backdrop-blur-xl border-b border-[rgba(0,245,212,0.1)] md:hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {links.map((link) => (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    onHome={onHome}
                    onClick={() => setMenuOpen(false)}
                    className="block text-base font-medium text-[#94a3b8] hover:text-[#00f5d4] transition-colors py-2"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
