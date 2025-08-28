const express = require('express');
const { fetchLeetCodeSummaryAndRecent } = require('../services/leetcodeService');
const { fetchCodeforcesSummaryAndRecent } = require('../services/codeforcesService');

const router = express.Router();

// Get LeetCode user data
router.get('/leetcode/:handle', async (req, res) => {
  try {
    const handle = req.params.handle;
    const recentCount = Number(req.query.recentCount ?? 5);
    const data = await fetchLeetCodeSummaryAndRecent(handle, recentCount);
    res.json(data);
  } catch (err) {
    console.error('LeetCode route error:', err.message);
    res.status(502).json({ 
      error: 'leetcode_fetch_failed', 
      message: 'Failed to fetch LeetCode data' 
    });
  }
});

// Get Codeforces user data
router.get('/codeforces/:handle', async (req, res) => {
  try {
    const handle = req.params.handle;
    const recentCount = Number(req.query.recentCount ?? 5);
    const data = await fetchCodeforcesSummaryAndRecent(handle, recentCount);
    res.json(data);
  } catch (err) {
    console.error('Codeforces route error:', err.message);
    res.status(502).json({ 
      error: 'codeforces_fetch_failed', 
      message: 'Failed to fetch Codeforces data' 
    });
  }
});

// Get aggregated data for multiple platforms
router.get('/aggregate', async (req, res) => {
  const { leetcodeHandle, codeforcesHandle } = req.query;
  const recentCount = Number(req.query.recentCount ?? 5);

  if (!leetcodeHandle && !codeforcesHandle) {
    return res.status(400).json({
      error: 'missing_handles',
      message: 'At least one platform handle is required'
    });
  }

  const results = {};
  const tasks = [];

  if (leetcodeHandle) {
    tasks.push(
      fetchLeetCodeSummaryAndRecent(leetcodeHandle, recentCount)
        .then(data => { results.leetcode = data; })
        .catch(() => { results.leetcode = { error: 'fetch_failed' }; })
    );
  }
  
  if (codeforcesHandle) {
    tasks.push(
      fetchCodeforcesSummaryAndRecent(codeforcesHandle, recentCount)
        .then(data => { results.codeforces = data; })
        .catch(() => { results.codeforces = { error: 'fetch_failed' }; })
    );
  }

  try {
    await Promise.all(tasks);
    res.json(results);
  } catch (e) {
    res.status(502).json({ 
      error: 'aggregate_fetch_failed',
      message: 'Failed to fetch platform data'
    });
  }
});

// Get available platforms
router.get('/', (req, res) => {
  res.json({
    platforms: [
      {
        name: 'LeetCode',
        endpoint: '/api/platforms/leetcode/:handle',
        description: 'Get LeetCode user stats and recent submissions'
      },
      {
        name: 'Codeforces',
        endpoint: '/api/platforms/codeforces/:handle',
        description: 'Get Codeforces user stats and recent submissions'
      },
      {
        name: 'Aggregate',
        endpoint: '/api/platforms/aggregate',
        description: 'Get combined data from multiple platforms'
      }
    ]
  });
});

module.exports = router;
