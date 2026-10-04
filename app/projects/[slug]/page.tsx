import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import PageTransition from "@/components/PageTransition";
import { projects, getProject, getProjectNeighbors } from "@/data/projects";

type ProjectParams = { slug: string };

// `output: 'export'` requires every dynamic route to be enumerated at build
// time, so this is what produces out/projects/<slug>/index.html.
export function generateStaticParams(): ProjectParams[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProjectParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  const title = `${project.title} | Kaleb Aklilu`;

  return {
    title,
    description: project.teaser,
    openGraph: {
      title,
      description: project.teaser,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<ProjectParams>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { prev, next } = getProjectNeighbors(slug);

  return (
    <PageTransition>
      <ProjectDetail project={project} prev={prev} next={next} />
    </PageTransition>
  );
}
