-- Optional (for UUID defaults)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- users, user_credentials, sessions
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_credentials (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  password_hash VARCHAR(255) NOT NULL,
  password_algo VARCHAR(20) NOT NULL,
  password_updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  ip INET,
  user_agent VARCHAR(300)
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- platforms, user_platform_accounts
CREATE TABLE IF NOT EXISTS platforms (
  id SMALLSERIAL PRIMARY KEY,
  code VARCHAR(40) NOT NULL UNIQUE,   -- e.g., CODEFORCES, LEETCODE
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user_platform_accounts (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform_id SMALLINT NOT NULL REFERENCES platforms(id),
  handle VARCHAR(100) NOT NULL,
  linked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (platform_id, handle),
  UNIQUE (user_id, platform_id)
);

CREATE INDEX IF NOT EXISTS idx_upa_user_id ON user_platform_accounts(user_id);

-- submissions, user_problem_solved, user_metrics
CREATE TABLE IF NOT EXISTS submissions (
  id BIGSERIAL PRIMARY KEY,
  user_platform_account_id BIGINT NOT NULL REFERENCES user_platform_accounts(id) ON DELETE CASCADE,
  platform_id SMALLINT NOT NULL REFERENCES platforms(id),
  problem_key VARCHAR(150) NOT NULL,  -- LC slug or CF contestId+index
  verdict VARCHAR(50) NOT NULL,       -- Accepted/OK/WRONG_ANSWER/...
  language VARCHAR(60),
  submitted_at TIMESTAMPTZ NOT NULL,
  raw JSONB
);

CREATE INDEX IF NOT EXISTS idx_submissions_upa_time ON submissions(user_platform_account_id, submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_platform_time ON submissions(platform_id, submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_upa_verdict ON submissions(user_platform_account_id, verdict);
-- Partial index for accepted/OK to speed solved detection
DO $$ BEGIN
  CREATE INDEX idx_submissions_upa_problem_accepted
    ON submissions(user_platform_account_id, problem_key)
    WHERE verdict IN ('Accepted','OK');
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS user_problem_solved (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform_id SMALLINT NOT NULL REFERENCES platforms(id),
  problem_key VARCHAR(150) NOT NULL,
  first_solved_at TIMESTAMPTZ NOT NULL,
  UNIQUE (user_id, platform_id, problem_key)
);

CREATE INDEX IF NOT EXISTS idx_ups_user_platform ON user_problem_solved(user_id, platform_id);

CREATE TABLE IF NOT EXISTS user_metrics (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  total_solved INT NOT NULL DEFAULT 0,
  easy_solved INT NOT NULL DEFAULT 0,
  medium_solved INT NOT NULL DEFAULT 0,
  hard_solved INT NOT NULL DEFAULT 0,
  recent_submissions_7d INT NOT NULL DEFAULT 0,
  last_synced_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_user_metrics_total_solved ON user_metrics(total_solved DESC);
CREATE INDEX IF NOT EXISTS idx_user_metrics_recent7d ON user_metrics(recent_submissions_7d DESC);
