const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 300 });
const DEFAULT_RECENT_COUNT = 5;
const HTTP_TIMEOUT_MS = 8000;

async function fetchCodeforcesSummaryAndRecent(handle, recentCount = DEFAULT_RECENT_COUNT) {
	const cacheKey = `codeforces:${handle}:${recentCount}`;
	const cached = cache.get(cacheKey);
	if (cached) return cached;

	const client = axios.create({ timeout: HTTP_TIMEOUT_MS });
	const infoUrl = `https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`;
	const recentUrl = `https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=1&count=${recentCount}`;
	
	// Fetch more submissions to count solved problems (up to 1000)
	const solvedUrl = `https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=1&count=1000`;

	const [infoResp, recentResp, solvedResp] = await Promise.all([
		client.get(infoUrl),
		client.get(recentUrl),
		client.get(solvedUrl)
	]);

	const user = infoResp.data?.result?.[0] || {};
	
	// Count solved problems from submission history
	const allSubmissions = solvedResp.data?.result || [];
	const solvedProblems = new Set();
	const problemStats = { easy: 0, medium: 0, hard: 0, total: 0 };
	
	allSubmissions.forEach(sub => {
		if (sub.verdict === 'OK' && sub.problem) {
			const problemKey = `${sub.problem.contestId}${sub.problem.index || ''}`;
			if (!solvedProblems.has(problemKey)) {
				solvedProblems.add(problemKey);
				problemStats.total++;
				
				// Estimate difficulty based on rating (if available)
				if (sub.problem.rating) {
					if (sub.problem.rating < 1200) problemStats.easy++;
					else if (sub.problem.rating < 2000) problemStats.medium++;
					else problemStats.hard++;
				}
			}
		}
	});

	const summary = {
		rating: user.rating ?? null,
		maxRating: user.maxRating ?? null,
		rank: user.rank ?? null,
		maxRank: user.maxRank ?? null,
		contribution: user.contribution ?? null,
		friendOfCount: user.friendOfCount ?? null,
		problemsSolved: problemStats.total,
		easySolved: problemStats.easy,
		mediumSolved: problemStats.medium,
		hardSolved: problemStats.hard
	};

	const recent = (recentResp.data?.result || []).map(s => ({
		id: s.id,
		problem: s.problem ? `${s.problem.contestId}${s.problem.index ? s.problem.index : ''} ${s.problem.name}` : null,
		verdict: s.verdict,
		language: s.programmingLanguage,
		timeSeconds: s.creationTimeSeconds
	}));

	const result = { handle, summary, recentSubmissions: recent, lastSync: new Date().toISOString() };
	cache.set(cacheKey, result);
	return result;
}

module.exports = { fetchCodeforcesSummaryAndRecent };
