import type { Metadata } from "next";
import ProjectsIndex from "@/components/ProjectsIndex";

export const metadata: Metadata = {
  title: "Projects | Kaleb Aklilu",
  description:
    "Machine learning, systems, and Linux tooling projects by Kaleb Aklilu, each with a full writeup.",
};

export default function ProjectsIndexPage() {
  return <ProjectsIndex />;
}
