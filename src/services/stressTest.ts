/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SOBERBA RIFT - STRESS TEST SUITE v1.0
 * Validação de lógica adaptativa sob cenários extremos.
 */

import { CHAMPIONS, ITEMS } from '../data/wildrift';
import { getAdaptiveBuild, GameContext } from './decisionEngine';

const runTest = (name: string, context: GameContext) => {
  console.log(`\n[TEST] ${name}`);
  const recs = getAdaptiveBuild(context);
  
  if (recs.length === 0) {
    console.error(`FAILED: No recommendations for ${name}`);
    return false;
  }

  console.log(`SUCCESS: Found ${recs.length} items. Top pick: ${recs[0].item.name}`);
  console.log(`Reason: ${recs[0].reason}`);
  return true;
};

// Cenário 1: Assassino AD vs Time de Tanques
const test1 = () => {
  const zed = CHAMPIONS.find(c => c.id === 'zed')!;
  const tanks = CHAMPIONS.filter(c => c.archetype === 'Tank').slice(0, 3);
  
  return runTest("Zed vs Triple Tank", {
    myChamp: zed,
    enemies: tanks,
    allies: [],
    gold: 5000,
    time: 15,
    state: 'Even'
  });
};

// Cenário 2: Mago Squishy vs Full Burst AP
const test2 = () => {
  const lux = CHAMPIONS.find(c => c.id === 'lux')!;
  const burstAP = CHAMPIONS.filter(c => c.damageType === 'AP' && c.archetype === 'Assassin').slice(0, 3);
  
  return runTest("Lux vs Full Burst AP", {
    myChamp: lux,
    enemies: burstAP,
    allies: [],
    gold: 3000,
    time: 10,
    state: 'Behind'
  });
};

// Cenário 3: ADC vs Full AD/Crit
const test3 = () => {
  const jinx = CHAMPIONS.find(c => c.id === 'jinx')!;
  const fullAD = CHAMPIONS.filter(c => c.damageType === 'AD').slice(0, 5);
  
  return runTest("Jinx vs Full AD Team", {
    myChamp: jinx,
    enemies: fullAD,
    allies: [],
    gold: 10000,
    time: 20,
    state: 'Ahead'
  });
};

export const runAllTests = () => {
  const results = [test1(), test2(), test3()];
  const allPassed = results.every(r => r === true);
  console.log(`\n[FINAL RESULT] ${allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);
  return allPassed;
};
