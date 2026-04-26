import { getAllPosts } from '@/src/lib/blog'
import { fetchRepos } from '@/lib/github'
import PortfolioPage from '@/components/home/PortfolioPage'

export default async function Home() {
  const [repos, posts] = await Promise.all([
    fetchRepos().catch(() => []),
    Promise.resolve(getAllPosts()),
  ])
  return <PortfolioPage repos={repos} posts={posts} />
}
