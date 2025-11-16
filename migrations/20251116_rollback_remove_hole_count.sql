-- Rollback: remove hole_count column
ALTER TABLE rounds
  DROP COLUMN IF EXISTS hole_count;
DROP INDEX IF EXISTS idx_rounds_hole_count;