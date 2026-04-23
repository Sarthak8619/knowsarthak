const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const SELECTED_REPOS = [
  "Promptly",
  "AI-video-category-classifier-",
  "contentdawg",
  "skill-roadmap-generator",
  "Customer-Churn-Prediction-E2E",
];

export async function fetchRepos() {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      next: { revalidate: 3600 }, // cache for 1 hour
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch repositories");
  }

  const repos = await res.json();

  return repos.filter((repo: any) =>
    SELECTED_REPOS.some((name) => name.toLowerCase() === repo.name.toLowerCase())
  );
}