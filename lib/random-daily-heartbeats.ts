/**
 * Plausible daily heartbeats from a random resting BPM in a healthy adult range (~62–78).
 * One value per browser session so hero + BMI (and any other call sites) stay consistent.
 */
let cachedApproxBeatsPerDay: number | null = null;

export function randomHealthyApproxBeatsPerDay() {
  if (cachedApproxBeatsPerDay != null) return cachedApproxBeatsPerDay;
  const minBpm = 62;
  const maxBpm = 78;
  const bpm = minBpm + Math.floor(Math.random() * (maxBpm - minBpm + 1));
  cachedApproxBeatsPerDay = bpm * 60 * 24;
  return cachedApproxBeatsPerDay;
}
