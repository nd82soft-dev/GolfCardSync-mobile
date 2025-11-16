const { computeTotals } = require('../lib/score-utils');

test('computes totals for 9-hole round', () => {
  const holes = [
    {strokes: 4},{strokes:4},{strokes:3},{strokes:4},{strokes:5},
    {strokes:4},{strokes:4},{strokes:3},{strokes:5}
  ];
  const { totalStrokes, totalPar, relative } = computeTotals(holes, 9);
  expect(totalStrokes).toBe(36);
  expect(totalPar).toBe(36);
  expect(relative).toBe(0);
});

test('computes totals for 18-hole round', () => {
  const holes = Array.from({length:18}, () => ({strokes:4}));
  const { totalStrokes, totalPar, relative } = computeTotals(holes, 18);
  expect(totalStrokes).toBe(72);
  expect(totalPar).toBe(72);
  expect(relative).toBe(0);
});
