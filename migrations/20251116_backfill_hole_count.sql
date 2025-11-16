-- Set hole_count to 18 for existing rows which don't have explicit value
UPDATE rounds
SET hole_count = 18
WHERE hole_count IS NULL;
