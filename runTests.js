// Mock do ambiente para rodar em Node puro
const CHAMPIONS = [
  { id: 'zed', name: 'Zed', role: 'Mid', damageType: 'AD', archetype: 'Assassin', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'lux', name: 'Lux', role: 'Support', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'jinx', name: 'Jinx', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'Low' },
  { id: 'malphite', name: 'Malphite', role: 'Top', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'Low' },
];

const ITEMS = [
  { id: 'black_cleaver', name: 'Black Cleaver', price: 3000, category: 'Physical', stats: { ad: 40 }, tags: ['Anti-Armor', 'Sustained'] },
  { id: 'force_of_nature', name: 'Force of Nature', price: 2850, category: 'Defense', stats: { mr: 50 }, tags: ['Anti-AP', 'Mobility'] },
  { id: 'randuins_omen', name: 'Randuin\'s Omen', price: 2800, category: 'Defense', stats: { armor: 60 }, tags: ['Anti-Crit', 'Anti-AD'] },
];

const analyzeThreats = (enemies) => {
  let adThreat = 0; let apThreat = 0; let ccThreat = 0; let tankiness = 0; let burstThreat = 0;
  enemies.forEach(e => {
    if (e.damageType === 'AD') adThreat += 1;
    if (e.damageType === 'AP') apThreat += 1;
    if (e.ccDensity === 'High') ccThreat += 1;
    if (e.archetype === 'Tank') tankiness += 1;
    if (e.archetype === 'Assassin') burstThreat += 1;
  });
  return { adThreat, apThreat, ccThreat, tankiness, burstThreat };
};

const getAdaptiveBuild = (context) => {
  const { myChamp, enemies, gold, time, state } = context;
  const threats = analyzeThreats(enemies);
  const recommendations = [];

  ITEMS.forEach(item => {
    let score = 0;
    if (myChamp.damageType === 'AD' && item.category === 'Physical') score += 10;
    if (item.tags.includes('Anti-Armor') && threats.tankiness > 0) score += 15;
    if (item.tags.includes('Anti-AP') && threats.apThreat > 0) score += 15;
    if (item.tags.includes('Anti-AD') && threats.adThreat > 0) score += 15;
    if (score > 10) recommendations.push({ item, score });
  });
  return recommendations.sort((a, b) => b.score - a.score);
};

console.log("--- INICIANDO TESTES DE ESTRESSE (JS MOCK) ---");

// Teste 1: Zed vs Tank
const recs1 = getAdaptiveBuild({
  myChamp: CHAMPIONS[0],
  enemies: [CHAMPIONS[3]], // Malphite Tank
  gold: 3000, time: 10, state: 'Even'
});
console.log("Teste 1 (Zed vs Tank):", recs1[0].item.name === 'Black Cleaver' ? "PASSED" : "FAILED");

// Teste 2: Lux vs AP
const recs2 = getAdaptiveBuild({
  myChamp: CHAMPIONS[1],
  enemies: [CHAMPIONS[1]], // Lux AP
  gold: 3000, time: 10, state: 'Even'
});
console.log("Teste 2 (Lux vs AP):", recs2[0].item.name === 'Force of Nature' ? "PASSED" : "FAILED");

console.log("--- TESTES CONCLUÍDOS ---");
