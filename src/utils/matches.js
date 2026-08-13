export const matches = [
  { slug: "premier-league", id: "1042", home: "Arsenal", away: "Chelsea", score: "2–1", date: "2026-03-14" },
  { slug: "premier-league", id: "1043", home: "Man City", away: "Liverpool", score: "1–1", date: "2026-03-15" },
  { slug: "la-liga", id: "2091", home: "Real Madrid", away: "Barcelona", score: "3–2", date: "2026-03-16" },
  { slug: "serie-a", id: "3007", home: "Juventus", away: "AC Milan", score: "0–0", date: "2026-03-17" },
];

export const getMatch = (slug, id) => matches.find((m) => m.slug === slug && m.id === id);
