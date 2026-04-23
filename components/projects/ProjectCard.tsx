export interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
}

interface ProjectCardProps {
  repo: Repo;
}

const arialBlack: React.CSSProperties = {
  fontFamily: '"Arial Black", Arial, sans-serif',
  fontWeight: 900,
};

export default function ProjectCard({ repo }: ProjectCardProps) {
  const displayName = repo.name.replace(/-/g, " ").toUpperCase();

  return (
    <article className="border-[3px] border-black bg-white group flex flex-col gap-4 p-6 transition-colors duration-100 hover:bg-black hover:text-white">
      <div className="flex justify-between items-start gap-4">
        <h3
          className="leading-none"
          style={{ ...arialBlack, fontSize: "1rem" }}
        >
          {displayName}
        </h3>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${repo.name} on GitHub`}
          className="shrink-0"
          style={{ fontSize: "1.25rem", lineHeight: 1 }}
        >
          ↗
        </a>
      </div>

      <p
        className={`flex-1${!repo.description ? " opacity-60" : ""}`}
        style={{
          fontFamily: "Arial, sans-serif",
          fontWeight: 400,
          fontSize: "0.9rem",
          lineHeight: 1.5,
        }}
      >
        {repo.description ?? "No description provided."}
      </p>

      <div className="flex justify-between items-center">
        {repo.language ? (
          <span
            className="border-[2px] border-current px-2 py-0.5 text-xs bg-black text-white group-hover:bg-white group-hover:text-black"
            style={arialBlack}
          >
            {repo.language}
          </span>
        ) : (
          <span />
        )}
        <span style={{ ...arialBlack, fontSize: "0.85rem" }}>
          ★ {repo.stargazers_count.toLocaleString()}
        </span>
      </div>
    </article>
  );
}
