/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SOBERBA RIFT - SIMULATION ENGINE v1.0
 * Cálculos de projeção de combate e sinergia de composição.
 */

import { Champion, Role } from '../data/wildrift';

export interface SimulationResult {
  winProbability: number;
  dpsScore: number;
  tankinessScore: number;
  ccScore: number;
  mobilityScore: number;
  scalingScore: number;
  vulnerabilities: string[];
  strengths: string[];
  winCondition: string;
}

const SCORE_MAP = {
  Low: 1,
  Medium: 2,
  High: 3
};

const SCALING_MAP = {
  Early: 1,
  Linear: 2,
  Mid: 2.5,
  Late: 4
};

export const simulateComp = (allies: Champion[], enemies: Champion[]): SimulationResult => {
  const calculateTeamStats = (team: Champion[]) => {
    let dps = 0;
    let tank = 0;
    let cc = 0;
    let mobility = 0;
    let scaling = 0;
    let damageTypes = { AD: 0, AP: 0, True: 0, Mixed: 0 };

    team.forEach(c => {
      // DPS Score
      if (c.archetype === 'Marksman' || c.archetype === 'Assassin') dps += 3;
      else if (c.archetype === 'Mage' || c.archetype === 'Fighter') dps += 2;
      else dps += 1;

      // Tankiness Score
      if (c.archetype === 'Tank') tank += 3;
      else if (c.archetype === 'Fighter') tank += 2;
      else tank += 1;

      cc += SCORE_MAP[c.ccDensity];
      mobility += SCORE_MAP[c.mobility];
      scaling += SCALING_MAP[c.scaling];
      damageTypes[c.damageType]++;
    });

    return { dps, tank, cc, mobility, scaling, damageTypes };
  };

  const allyStats = calculateTeamStats(allies);
  const enemyStats = calculateTeamStats(enemies);

  const strengths: string[] = [];
  const vulnerabilities: string[] = [];

  // Análise de Sinergia e Fraquezas
  if (allyStats.tank < 4) vulnerabilities.push("Falta de linha de frente (Frontline).");
  if (allyStats.cc < 6) vulnerabilities.push("Baixo controle de grupo (CC).");
  if (allyStats.damageTypes.AD > 3) vulnerabilities.push("Composição majoritariamente AD (Fácil de itemizar contra).");
  if (allyStats.damageTypes.AP > 3) vulnerabilities.push("Composição majoritariamente AP (Fácil de itemizar contra).");

  if (allyStats.dps > 10) strengths.push("Alto potencial de dano explosivo.");
  if (allyStats.scaling > 12) strengths.push("Forte escalonamento para o Late Game.");
  if (allyStats.mobility > 10) strengths.push("Alta mobilidade e capacidade de pick-off.");

  // Cálculo de Probabilidade (Simplificado para o motor)
  let winProb = 50;
  winProb += (allyStats.dps - enemyStats.dps) * 2;
  winProb += (allyStats.tank - enemyStats.tank) * 2;
  winProb += (allyStats.cc - enemyStats.cc) * 2;
  winProb += (allyStats.scaling - enemyStats.scaling) * 1.5;

  // Win Condition Logic
  let winCondition = "Focar em objetivos e evitar lutas desnecessárias.";
  if (allyStats.scaling > enemyStats.scaling) winCondition = "Jogar pelo Late Game. Evite riscos no early e foque no farm.";
  else if (allyStats.dps > enemyStats.dps && allyStats.mobility > 10) winCondition = "Pick-off e Snowball. Force lutas em vantagem numérica.";
  else if (allyStats.tank > 8) winCondition = "Teamfights front-to-back. Proteja seus carries e use sua durabilidade.";

  return {
    winProbability: Math.min(Math.max(winProb, 10), 90),
    dpsScore: allyStats.dps,
    tankinessScore: allyStats.tank,
    ccScore: allyStats.cc,
    mobilityScore: allyStats.mobility,
    scalingScore: allyStats.scaling,
    vulnerabilities,
    strengths,
    winCondition
  };
};
