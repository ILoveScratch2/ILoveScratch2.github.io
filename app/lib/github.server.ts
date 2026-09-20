const GITHUB_USER = "ILoveScratch2";
const REPO_LIMIT = 6;

export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  updatedAt: string;
}

export const fallbackRepos: GitHubRepo[] = [
  {
    name: "OpenList",
    description: "A new AList Fork to Anti Trust Crisis",
    url: "https://github.com/OpenListTeam/OpenList",
    stars: 24000,
    language: "Go",
    updatedAt: "",
  },
  {
    name: "OpenList-Mobile",
    description: "Flutter-based mobile app for managing files with OpenList.",
    url: "https://github.com/OpenListTeam/OpenList-Mobile",
    stars: 711,
    language: "Dart",
    updatedAt: "",
  },
  {
    name: "TouchFish-Client",
    description: "TouchFish officially supported modern chat client,",
    url: "https://github.com/ILoveScratch2/TouchFish-Client",
    stars: 0,
    language: "Dart",
    updatedAt: "",
  },
];

interface GitHubApiRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

export async function fetchGitHubProjects(): Promise<GitHubRepo[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "ilovescratch2-homepage",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30&type=owner`,
      { headers, signal: AbortSignal.timeout(5000) }
    );

    if (!res.ok) {
      console.error("GitHub API error:", res.status, res.statusText);
      return fallbackRepos;
    }

    const repos = (await res.json()) as GitHubApiRepo[];
    if (!Array.isArray(repos)) return fallbackRepos;

    const mapped = repos
      .filter((repo) => !repo.fork && !repo.archived)
      .slice(0, REPO_LIMIT)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
        updatedAt: repo.updated_at,
      }));

    return mapped.length > 0 ? mapped : fallbackRepos;
  } catch (error) {
    console.error("Failed to fetch GitHub projects:", error);
    return fallbackRepos;
  }
}
