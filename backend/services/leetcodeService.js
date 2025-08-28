const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes
const LEETCODE_URL = 'https://leetcode.com/graphql';
const DEFAULT_RECENT_COUNT = 5;
const HTTP_TIMEOUT_MS = 8000;

async function fetchLeetCodeSummaryAndRecent(handle, recentCount = DEFAULT_RECENT_COUNT) {
	const cacheKey = `leetcode:${handle}:${recentCount}`;
	const cached = cache.get(cacheKey);
	if (cached) return cached;

	const client = axios.create({
		timeout: HTTP_TIMEOUT_MS,
		headers: {
			'Content-Type': 'application/json',
			'Origin': 'https://leetcode.com',
			'Referer': 'https://leetcode.com/',
			'User-Agent': 'Mozilla/5.0'
		}
	});

	const profileQuery = {
		query: `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            ranking
            reputation
          }
          submitStatsGlobal {
            acSubmissionNum { difficulty count submissions }
          }
        }
      }
    `,
		variables: { username: handle }
	};

	const recentQuery = {
		query: `
      query getRecentSubmissions($username: String!, $limit: Int!) {
        recentSubmissionList(username: $username, limit: $limit) {
          title
          titleSlug
          statusDisplay
          lang
          timestamp
        }
      }
    `,
		variables: { username: handle, limit: recentCount }
	};

	const [profileResp, recentResp] = await Promise.all([
		client.post(LEETCODE_URL, profileQuery),
		client.post(LEETCODE_URL, recentQuery)
	]);

	const matchedUser = profileResp.data?.data?.matchedUser;
	const ac = matchedUser?.submitStatsGlobal?.acSubmissionNum || [];
	const summary = {
		ranking: matchedUser?.profile?.ranking ?? null,
		reputation: matchedUser?.profile?.reputation ?? null,
		totalSolved: ac.find(x => x.difficulty === 'All')?.count ?? null,
		easySolved: ac.find(x => x.difficulty === 'Easy')?.count ?? null,
		mediumSolved: ac.find(x => x.difficulty === 'Medium')?.count ?? null,
		hardSolved: ac.find(x => x.difficulty === 'Hard')?.count ?? null
	};

	const recent = (recentResp.data?.data?.recentSubmissionList || []).map(s => ({
		title: s.title,
		slug: s.titleSlug,
		status: s.statusDisplay,
		lang: s.lang,
		timestamp: Number(s.timestamp)
	}));

	const result = { handle, summary, recentSubmissions: recent, lastSync: new Date().toISOString() };
	cache.set(cacheKey, result);
	return result;
}

module.exports = { fetchLeetCodeSummaryAndRecent };
