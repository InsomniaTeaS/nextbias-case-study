const groups = [
  { name: "BTS", type: "boy", generation: "3", moods: ["emotional", "hip-hop"], summary: "A broad catalog spanning hip-hop, introspective pop, and arena-scale anthems." },
  { name: "TWICE", type: "girl", generation: "3", moods: ["bright", "emotional"], summary: "Bright hooks with a broad pop catalog that later expanded into more mature styles." },
  { name: "BLACKPINK", type: "girl", generation: "3", moods: ["hip-hop", "dark"], summary: "High-impact pop and rap-focused production with a strong performance identity." },
  { name: "Stray Kids", type: "boy", generation: "4", moods: ["experimental", "hip-hop", "dark"], summary: "Self-produced music with dense rap, electronic textures, and aggressive performance." },
  { name: "IVE", type: "girl", generation: "4", moods: ["bright", "emotional"], summary: "Polished pop built around confidence, memorable hooks, and clean visual concepts." },
  { name: "ENHYPEN", type: "boy", generation: "4", moods: ["dark", "emotional"], summary: "Dark pop and synth-heavy production tied to a connected fantasy concept." },
  { name: "QWER", type: "girl", generation: "5", moods: ["bright", "experimental"], summary: "A project band mixing live instruments, pop-rock hooks, and internet-creator roots." },
  { name: "TWS", type: "boy", generation: "5", moods: ["bright", "emotional"], summary: "Youthful pop with clean melodies, light production, and an approachable group identity." },
  { name: "CORTIS", type: "boy", generation: "5", moods: ["hip-hop", "experimental"], summary: "A creator-led group built around self-production, youthful energy, and hip-hop influences." }
];

const generationLabels = {
  "3": "3rd gen",
  "4": "4th gen",
  "5": "5th gen"
};

function selectedValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`).value;
}

function findMatch(filters) {
  const matches = groups.filter(group => {
    if (filters.type !== "any" && group.type !== filters.type) return false;
    if (filters.generation !== "any" && group.generation !== filters.generation) return false;
    return group.moods.includes(filters.mood);
  });

  return matches.sort((a, b) => a.name.localeCompare(b.name))[0] ?? null;
}

function renderMatch(group, filters) {
  const result = document.querySelector("#result");

  if (!group) {
    result.innerHTML = `
      <h3>No exact sample match</h3>
      <p>Try a different group type, mood, or generation.</p>
    `;
    result.hidden = false;
    return;
  }

  const reasons = [filters.mood];
  if (filters.type !== "any") reasons.push(`${filters.type} group`);
  if (filters.generation !== "any") reasons.push(generationLabels[filters.generation]);

  result.innerHTML = `
    <h3>${group.name}</h3>
    <strong>Why it matched:</strong> ${reasons.join(", ")}
    <p>${group.summary}</p>
  `;
  result.hidden = false;
}

document.querySelector("#match-button").addEventListener("click", () => {
  const filters = {
    type: selectedValue("type"),
    mood: selectedValue("mood"),
    generation: selectedValue("generation")
  };

  renderMatch(findMatch(filters), filters);
});
