import ProjectCard, { type Repo } from "@/components/projects/ProjectCard";

interface ProjectGridProps {
  repos: Repo[];
}

export default function ProjectGrid({ repos }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {repos.map((repo) => (
        <ProjectCard key={repo.name} repo={repo} />
      ))}
    </div>
  );
}
