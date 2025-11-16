function computeTotals(holes = [], holeCount = 18) {
  const totalStrokes = holes.reduce((sum, h) => sum + (Number(h.strokes) || 0), 0);
  const totalPar = holeCount === 9 ? 36 : 72;
  const relative = totalStrokes - totalPar;
  return { totalStrokes, totalPar, relative };
}

module.exports = { computeTotals };
