import { fetchRepos } from "@/lib/github";
import ProjectGrid from "@/components/projects/ProjectGrid";

export default async function ProjectsPage() {
  const repos = await fetchRepos();

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <h1 className="brutal-heading mb-12">Projects</h1>
      <ProjectGrid repos={repos} />
    </section>
  );
}
