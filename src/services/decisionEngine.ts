/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SOBERBA RIFT - DECISION ENGINE v1.0
 * Motor de recomendação ponderado baseado em contexto de jogo.
 */

import { Champion, Item, ITEMS, CHAMPIONS } from '../data/wildrift';

export interface GameContext {
  myChamp: Champion;
  enemies: Champion[];
  allies: Champion[];
  gold: number;
  time: number; // em minutos
  state: 'Ahead' | 'Even' | 'Behind';
}

export interface Recommendation {
  item: Item;
  score: number;
  reason: string;
}

export const analyzeThreats = (enemies: Champion[]) => {
  let adThreat = 0;
  let apThreat = 0;
  let ccThreat = 0;
  let tankiness = 0;
  let burstThreat = 0;

  enemies.forEach(e => {
    if (e.damageType === 'AD') adThreat += 1;
    if (e.damageType === 'AP') apThreat += 1;
    if (e.damageType === 'Mixed') { adThreat += 0.5; apThreat += 0.5; }
    if (e.damageType === 'True') { adThreat += 0.3; apThreat += 0.3; }
    
    if (e.ccDensity === 'High') ccThreat += 1;
    if (e.ccDensity === 'Medium') ccThreat += 0.5;
    
    if (e.archetype === 'Tank') tankiness += 1;
    if (e.archetype === 'Fighter') tankiness += 0.5;
    
    if (e.archetype === 'Assassin' || e.archetype === 'Mage') burstThreat += 1;
  });

  return { adThreat, apThreat, ccThreat, tankiness, burstThreat };
};

export const getAdaptiveBuild = (context: GameContext): Recommendation[] => {
  const { myChamp, enemies, gold, time, state } = context;
  const threats = analyzeThreats(enemies);
  const recommendations: Recommendation[] = [];

  ITEMS.forEach(item => {
    let score = 0;
    let reasons: string[] = [];

    // 1. Sinergia com o Tipo de Dano do Campeão
    if (myChamp.damageType === 'AD' && item.category === 'Physical') score += 10;
    if (myChamp.damageType === 'AP' && item.category === 'Magical') score += 10;
    if (myChamp.damageType === 'Mixed') score += 5;

    // 2. Reação a Ameaças (Defesa Adaptativa)
    if (item.tags.includes('Anti-AD') && threats.adThreat > 2) {
      score += (threats.adThreat * 5);
      reasons.push(`Alta ameaça física detectada (${threats.adThreat} campeões AD).`);
    }
    if (item.tags.includes('Anti-AP') && threats.apThreat > 2) {
      score += (threats.apThreat * 5);
      reasons.push(`Alta ameaça mágica detectada (${threats.apThreat} campeões AP).`);
    }
    if (item.tags.includes('Anti-Tank') && threats.tankiness > 1.5) {
      score += (threats.tankiness * 6);
      reasons.push(`Inimigos robustos detectados. Necessário penetração/dano percentual.`);
    }
    if (item.tags.includes('Anti-Burst') && threats.burstThreat > 2) {
      score += (threats.burstThreat * 4);
      reasons.push(`Risco de burst elevado. Itens de sobrevivência recomendados.`);
    }

    // 3. Fase do Jogo e Ouro
    const isLateGame = time > 15;
    if (item.tags.includes('Scaling') && !isLateGame) {
      score += 8;
      reasons.push(`Item de escalonamento ideal para o early/mid game.`);
    }
    if (item.price <= gold) {
      score += 5;
    }

    // 4. Estado do Jogo
    if (state === 'Behind' && item.category === 'Defense') {
      score += 7;
      reasons.push(`Você está atrás. Priorizando sobrevivência para estabilizar.`);
    }
    if (state === 'Ahead' && (item.tags.includes('Burst') || item.tags.includes('Crit'))) {
      score += 7;
      reasons.push(`Você está na frente. Aumentando pressão com dano explosivo.`);
    }

    if (score > 15) {
      recommendations.push({
        item,
        score,
        reason: reasons[0] || "Item com boa sinergia geral para seu campeão."
      });
    }
  });

  return recommendations.sort((a, b) => b.score - a.score).slice(0, 6);
};
