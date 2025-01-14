const GITHUB_API_URL = 'https://api.github.com';

// You should replace this with your GitHub token
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers = GITHUB_TOKEN
  ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
  : {};

export const getRandomRepo = async (query) => {
  try {
    const searchQuery = query.includes(':') ? query : `language:${query}`;
    const countResponse = await fetch(
      `${GITHUB_API_URL}/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=stars&per_page=1`,
      { headers }
    );

    if (countResponse.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please try again later or add a GitHub token.');
    }

    if (!countResponse.ok) {
      throw new Error(`GitHub API error: ${countResponse.statusText}`);
    }

    const countData = await countResponse.json();
    
    if (countData.total_count === 0) {
      throw new Error('No repositories found for this query');
    }
    
    const totalCount = Math.min(countData.total_count, 1000);
    const randomPage = Math.floor(Math.random() * Math.floor(totalCount / 30)) + 1;
    
    const response = await fetch(
      `${GITHUB_API_URL}/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=stars&page=${randomPage}&per_page=1`,
      { headers }
    );

    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please try again later or add a GitHub token.');
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new Error('No repositories found');
    }
    
    return data.items[0];
  } catch (error) {
    console.error('Error fetching repository:', error);
    throw error;
  }
};
