-- Add hole_count column to track 9 vs 18 hole rounds
-- default 18 for backwards compatibility
ALTER TABLE rounds
  ADD COLUMN hole_count SMALLINT NOT NULL DEFAULT 18;

-- Optional: index if you plan to query by hole_count frequently
CREATE INDEX idx_rounds_hole_count ON rounds (hole_count);
