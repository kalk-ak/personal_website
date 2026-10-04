import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps a route's content so navigations animate between pages. Links tagged
 * with `nav-forward` / `nav-back` (via `transitionTypes`) slide in that
 * direction; anything else, like the nav bar or the browser back button,
 * gets a plain crossfade. The animations themselves live in globals.css.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "page-fade" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "page-fade" }}
      default="none"
    >
      <div className="flex flex-col flex-1">{children}</div>
    </ViewTransition>
  );
}
