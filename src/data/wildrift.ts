/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SOBERBA RIFT - DATA LAYER v3.0
 * Normalização de Schemas para Motor de Decisão Adaptativo
 * Wild Rift Patch 7.0c - COMPLETO
 */

export type Role = 'Top' | 'Jungle' | 'Mid' | 'ADC' | 'Support';
export type DamageType = 'AD' | 'AP' | 'True' | 'Mixed';
export type Archetype = 'Assassin' | 'Fighter' | 'Mage' | 'Marksman' | 'Support' | 'Tank';
export type GamePhase = 'Early' | 'Mid' | 'Late';

export interface Champion {
  id: string;
  name: string;
  role: Role;
  damageType: DamageType;
  archetype: Archetype;
  scaling: 'Early' | 'Mid' | 'Late' | 'Linear';
  range: 'Melee' | 'Ranged';
  ccDensity: 'Low' | 'Medium' | 'High';
  mobility: 'Low' | 'Medium' | 'High';
}

export interface Item {
  id: string;
  name: string;
  price: number;
  category: 'Physical' | 'Magical' | 'Defense' | 'Boots' | 'Enchantment' | 'Utility';
  stats: {
    ad?: number;
    ap?: number;
    hp?: number;
    armor?: number;
    mr?: number;
    as?: number;
    ah?: number;
    crit?: number;
    pen?: number;
    omnivamp?: number;
  };
  tags: string[];
  description: string;
}

export interface Rune {
  id: string;
  name: string;
  tree: 'Keystone' | 'Domination' | 'Precision' | 'Resolve' | 'Inspiration';
  scalingType: 'Flat' | 'Percentage' | 'Stacking';
  description: string;
}

export interface SummonerSpell {
  id: string;
  name: string;
  cooldown: number;
  description: string;
  icon?: string;
}

export const CHAMPIONS: Champion[] = [
  { id: 'aatrox', name: 'Aatrox', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'Medium' },
  { id: 'ahri', name: 'Ahri', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'Medium', mobility: 'High' },
  { id: 'akali', name: 'Akali', role: 'Mid', damageType: 'AP', archetype: 'Assassin', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'akshan', name: 'Akshan', role: 'Mid', damageType: 'AD', archetype: 'Marksman', scaling: 'Early', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'alistar', name: 'Alistar', role: 'Support', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'Medium' },
  { id: 'ambessa', name: 'Ambessa', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'amumu', name: 'Amumu', role: 'Jungle', damageType: 'AP', archetype: 'Tank', scaling: 'Late', range: 'Melee', ccDensity: 'High', mobility: 'Medium' },
  { id: 'annie', name: 'Annie', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'ashe', name: 'Ashe', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Linear', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'aurelion_sol', name: 'Aurelion Sol', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Late', range: 'Ranged', ccDensity: 'Medium', mobility: 'Medium' },
  { id: 'bard', name: 'Bard', role: 'Support', damageType: 'AP', archetype: 'Support', scaling: 'Late', range: 'Ranged', ccDensity: 'High', mobility: 'High' },
  { id: 'blitzcrank', name: 'Blitzcrank', role: 'Support', damageType: 'AP', archetype: 'Tank', scaling: 'Early', range: 'Melee', ccDensity: 'High', mobility: 'Medium' },
  { id: 'brand', name: 'Brand', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'Low' },
  { id: 'braum', name: 'Braum', role: 'Support', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'Low' },
  { id: 'caitlyn', name: 'Caitlyn', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Early', range: 'Ranged', ccDensity: 'Medium', mobility: 'Medium' },
  { id: 'camille', name: 'Camille', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Late', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'corki', name: 'Corki', role: 'Mid', damageType: 'Mixed', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'darius', name: 'Darius', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Early', range: 'Melee', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'diana', name: 'Diana', role: 'Mid', damageType: 'AP', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'dr_mundo', name: 'Dr. Mundo', role: 'Top', damageType: 'AD', archetype: 'Tank', scaling: 'Late', range: 'Melee', ccDensity: 'Low', mobility: 'Low' },
  { id: 'draven', name: 'Draven', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Early', range: 'Ranged', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'ekko', name: 'Ekko', role: 'Jungle', damageType: 'AP', archetype: 'Assassin', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'evelynn', name: 'Evelynn', role: 'Jungle', damageType: 'AP', archetype: 'Assassin', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'ezreal', name: 'Ezreal', role: 'ADC', damageType: 'Mixed', archetype: 'Marksman', scaling: 'Mid', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'fiddlesticks', name: 'Fiddlesticks', role: 'Jungle', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'fiora', name: 'Fiora', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Late', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'fizz', name: 'Fizz', role: 'Mid', damageType: 'AP', archetype: 'Assassin', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'galio', name: 'Galio', role: 'Mid', damageType: 'AP', archetype: 'Tank', scaling: 'Mid', range: 'Melee', ccDensity: 'High', mobility: 'Medium' },
  { id: 'garen', name: 'Garen', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Linear', range: 'Melee', ccDensity: 'Low', mobility: 'Low' },
  { id: 'gnar', name: 'Gnar', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Mixed', ccDensity: 'High', mobility: 'High' },
  { id: 'gragas', name: 'Gragas', role: 'Jungle', damageType: 'AP', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'High', mobility: 'Medium' },
  { id: 'graves', name: 'Graves', role: 'Jungle', damageType: 'AD', archetype: 'Marksman', scaling: 'Mid', range: 'Ranged', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'gwen', name: 'Gwen', role: 'Top', damageType: 'AP', archetype: 'Fighter', scaling: 'Late', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'hecarim', name: 'Hecarim', role: 'Jungle', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'irelia', name: 'Irelia', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'janna', name: 'Janna', role: 'Support', damageType: 'AP', archetype: 'Support', scaling: 'Linear', range: 'Ranged', ccDensity: 'High', mobility: 'High' },
  { id: 'jarvan_iv', name: 'Jarvan IV', role: 'Jungle', damageType: 'AD', archetype: 'Tank', scaling: 'Early', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'jax', name: 'Jax', role: 'Top', damageType: 'Mixed', archetype: 'Fighter', scaling: 'Late', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'jayce', name: 'Jayce', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Early', range: 'Mixed', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'jhin', name: 'Jhin', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Mid', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'jinx', name: 'Jinx', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'Low' },
  { id: 'kaisa', name: 'Kai\'Sa', role: 'ADC', damageType: 'Mixed', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'kalista', name: 'Kalista', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Early', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'karma', name: 'Karma', role: 'Support', damageType: 'AP', archetype: 'Mage', scaling: 'Early', range: 'Ranged', ccDensity: 'Medium', mobility: 'Medium' },
  { id: 'kassadin', name: 'Kassadin', role: 'Mid', damageType: 'AP', archetype: 'Assassin', scaling: 'Late', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'katarina', name: 'Katarina', role: 'Mid', damageType: 'AP', archetype: 'Assassin', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'kayle', name: 'Kayle', role: 'Top', damageType: 'AP', archetype: 'Fighter', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'kennen', name: 'Kennen', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Medium' },
  { id: 'khazix', name: 'Kha\'Zix', role: 'Jungle', damageType: 'AD', archetype: 'Assassin', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'kindred', name: 'Kindred', role: 'Jungle', damageType: 'AD', archetype: 'Marksman', scaling: 'Mid', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'kled', name: 'Kled', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Early', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'kogmaw', name: 'Kog\'Maw', role: 'ADC', damageType: 'Mixed', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'Low' },
  { id: 'leblanc', name: 'LeBlanc', role: 'Mid', damageType: 'AP', archetype: 'Assassin', scaling: 'Mid', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'lee_sin', name: 'Lee Sin', role: 'Jungle', damageType: 'AD', archetype: 'Fighter', scaling: 'Early', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'leona', name: 'Leona', role: 'Support', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'Medium' },
  { id: 'lissandra', name: 'Lissandra', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'lulu', name: 'Lulu', role: 'Support', damageType: 'AP', archetype: 'Support', scaling: 'Linear', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'lux', name: 'Lux', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'malphite', name: 'Malphite', role: 'Top', damageType: 'AP', archetype: 'Tank', scaling: 'Mid', range: 'Melee', ccDensity: 'High', mobility: 'Medium' },
  { id: 'malzahar', name: 'Malzahar', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'maokai', name: 'Maokai', role: 'Top', damageType: 'AP', archetype: 'Tank', scaling: 'Late', range: 'Melee', ccDensity: 'High', mobility: 'Low' },
  { id: 'master_yi', name: 'Master Yi', role: 'Jungle', damageType: 'AD', archetype: 'Assassin', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'miss_fortune', name: 'Miss Fortune', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Early', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'mordekaiser', name: 'Mordekaiser', role: 'Top', damageType: 'AP', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'morgana', name: 'Morgana', role: 'Support', damageType: 'AP', archetype: 'Mage', scaling: 'Linear', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'nami', name: 'Nami', role: 'Support', damageType: 'AP', archetype: 'Support', scaling: 'Linear', range: 'Ranged', ccDensity: 'High', mobility: 'Medium' },
  { id: 'nasus', name: 'Nasus', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Late', range: 'Melee', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'nautilus', name: 'Nautilus', role: 'Support', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'Low' },
  { id: 'neeko', name: 'Neeko', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'nidalee', name: 'Nidalee', role: 'Jungle', damageType: 'AP', archetype: 'Assassin', scaling: 'Mid', range: 'Mixed', ccDensity: 'Medium', mobility: 'High' },
  { id: 'nocturne', name: 'Nocturne', role: 'Jungle', damageType: 'AD', archetype: 'Assassin', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'olaf', name: 'Olaf', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Early', range: 'Melee', ccDensity: 'Medium', mobility: 'Medium' },
  { id: 'orianna', name: 'Orianna', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'pantheon', name: 'Pantheon', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Early', range: 'Melee', ccDensity: 'High', mobility: 'Medium' },
  { id: 'poppy', name: 'Poppy', role: 'Support', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'Medium' },
  { id: 'pyke', name: 'Pyke', role: 'Support', damageType: 'AD', archetype: 'Assassin', scaling: 'Early', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'qiyana', name: 'Qiyana', role: 'Mid', damageType: 'AD', archetype: 'Assassin', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'quinn', name: 'Quinn', role: 'Top', damageType: 'AD', archetype: 'Marksman', scaling: 'Early', range: 'Ranged', ccDensity: 'Medium', mobility: 'High' },
  { id: 'rakan', name: 'Rakan', role: 'Support', damageType: 'AP', archetype: 'Support', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'rammus', name: 'Rammus', role: 'Jungle', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'rek_sai', name: 'Rek\'Sai', role: 'Jungle', damageType: 'AD', archetype: 'Tank', scaling: 'Early', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'renekton', name: 'Renekton', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Early', range: 'Melee', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'rengar', name: 'Rengar', role: 'Jungle', damageType: 'AD', archetype: 'Assassin', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'riven', name: 'Riven', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'rumble', name: 'Rumble', role: 'Top', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'ryze', name: 'Ryze', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'samira', name: 'Samira', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Mid', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'sejuani', name: 'Sejuani', role: 'Jungle', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'Medium' },
  { id: 'senna', name: 'Senna', role: 'Support', damageType: 'AD', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'seraphine', name: 'Seraphine', role: 'Support', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'sett', name: 'Sett', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Early', range: 'Melee', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'shaco', name: 'Shaco', role: 'Jungle', damageType: 'AD', archetype: 'Assassin', scaling: 'Early', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'shen', name: 'Shen', role: 'Top', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'shyvana', name: 'Shyvana', role: 'Jungle', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'singed', name: 'Singed', role: 'Top', damageType: 'AP', archetype: 'Tank', scaling: 'Late', range: 'Melee', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'sion', name: 'Sion', role: 'Top', damageType: 'AD', archetype: 'Tank', scaling: 'Late', range: 'Melee', ccDensity: 'High', mobility: 'Low' },
  { id: 'sivir', name: 'Sivir', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Mid', range: 'Ranged', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'skarner', name: 'Skarner', role: 'Jungle', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'Medium' },
  { id: 'sona', name: 'Sona', role: 'Support', damageType: 'AP', archetype: 'Support', scaling: 'Linear', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'soraka', name: 'Soraka', role: 'Support', damageType: 'AP', archetype: 'Support', scaling: 'Linear', range: 'Ranged', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'swain', name: 'Swain', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'sylas', name: 'Sylas', role: 'Mid', damageType: 'AP', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'syndra', name: 'Syndra', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'tahm_kench', name: 'Tahm Kench', role: 'Support', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'taliyah', name: 'Taliyah', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'Medium', mobility: 'Medium' },
  { id: 'talon', name: 'Talon', role: 'Mid', damageType: 'AD', archetype: 'Assassin', scaling: 'Early', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'taric', name: 'Taric', role: 'Support', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'teemo', name: 'Teemo', role: 'Top', damageType: 'AP', archetype: 'Marksman', scaling: 'Mid', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'thresh', name: 'Thresh', role: 'Support', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'Medium' },
  { id: 'tristana', name: 'Tristana', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'trundle', name: 'Trundle', role: 'Jungle', damageType: 'AD', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'Medium', mobility: 'Medium' },
  { id: 'tryndamere', name: 'Tryndamere', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Late', range: 'Melee', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'twisted_fate', name: 'Twisted Fate', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'twitch', name: 'Twitch', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'udyr', name: 'Udyr', role: 'Jungle', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'urgot', name: 'Urgot', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'varus', name: 'Varus', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'vayne', name: 'Vayne', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'veigar', name: 'Veigar', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Late', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'vel_koz', name: 'Vel\'Koz', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'vex', name: 'Vex', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'vi', name: 'Vi', role: 'Jungle', damageType: 'AD', archetype: 'Fighter', scaling: 'Early', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'viego', name: 'Viego', role: 'Jungle', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'vladimir', name: 'Vladimir', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Late', range: 'Melee', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'volibear', name: 'Volibear', role: 'Top', damageType: 'AP', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'Medium' },
  { id: 'warwick', name: 'Warwick', role: 'Jungle', damageType: 'AD', archetype: 'Fighter', scaling: 'Early', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'wukong', name: 'Wukong', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'xayah', name: 'Xayah', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Mid', range: 'Ranged', ccDensity: 'Medium', mobility: 'High' },
  { id: 'xerath', name: 'Xerath', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'Low', mobility: 'Low' },
  { id: 'xin_zhao', name: 'Xin Zhao', role: 'Jungle', damageType: 'AD', archetype: 'Fighter', scaling: 'Early', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'yasuo', name: 'Yasuo', role: 'Mid', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'yone', name: 'Yone', role: 'Mid', damageType: 'AD', archetype: 'Fighter', scaling: 'Late', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'yorick', name: 'Yorick', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'Low' },
  { id: 'young_ryze', name: 'Young Ryze', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'yuumi', name: 'Yuumi', role: 'Support', damageType: 'AP', archetype: 'Support', scaling: 'Linear', range: 'Ranged', ccDensity: 'Medium', mobility: 'High' },
  { id: 'zac', name: 'Zac', role: 'Jungle', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'Medium' },
  { id: 'zed', name: 'Zed', role: 'Mid', damageType: 'AD', archetype: 'Assassin', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'zeri', name: 'Zeri', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'ziggs', name: 'Ziggs', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'Low', mobility: 'Low' },
  { id: 'zilean', name: 'Zilean', role: 'Support', damageType: 'AP', archetype: 'Mage', scaling: 'Linear', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'zoe', name: 'Zoe', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'Medium', mobility: 'High' },
  { id: 'zyra', name: 'Zyra', role: 'Support', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
];

export const ITEMS: Item[] = [
  { id: 'adaptive_force', name: 'Adaptive Force', price: 1000, category: 'Physical', stats: { ad: 20 }, tags: ['Early', 'Damage'], description: 'Basic AD item for early game.' },
  { id: 'abyss_mask', name: 'Abyss Mask', price: 2600, category: 'Magical', stats: { ap: 60, hp: 300, mr: 40 }, tags: ['Defense', 'Scaling'], description: 'Grants AP scaling with health.' },
  { id: 'adaptive_helm', name: 'Adaptive Helm', price: 2700, category: 'Defense', stats: { hp: 400, mr: 50 }, tags: ['Anti-AP', 'Defense'], description: 'Reduces magic damage taken.' },
  { id: 'aegis_of_the_legion', name: 'Aegis of the Legion', price: 2500, category: 'Defense', stats: { armor: 40, mr: 40, hp: 200 }, tags: ['Team-Utility', 'Defense'], description: 'Grants aura to nearby allies.' },
  { id: 'black_cleaver', name: 'Black Cleaver', price: 3000, category: 'Physical', stats: { ad: 40, hp: 350, ah: 20 }, tags: ['Anti-Armor', 'Sustained'], description: 'Reduces enemy armor by up to 24%.' },
  { id: 'blade_of_the_ruined_king', name: 'Blade of the Ruined King', price: 3100, category: 'Physical', stats: { ad: 20, as: 35 }, tags: ['Anti-Tank', 'Sustained'], description: 'Attacks deal 6% current health damage.' },
  { id: 'divine_sunderer', name: 'Divine Sunderer', price: 3300, category: 'Physical', stats: { ad: 25, hp: 400, ah: 20 }, tags: ['Anti-Tank', 'Sustained'], description: 'Spellblade deals max health damage and heals.' },
  { id: 'mortal_reminder', name: 'Mortal Reminder', price: 3000, category: 'Physical', stats: { ad: 45, pen: 30 }, tags: ['Anti-Heal', 'Anti-Armor'], description: 'Applies Grievous Wounds and Armor Pen.' },
  { id: 'serpents_fang', name: 'Serpent\'s Fang', price: 2800, category: 'Physical', stats: { ad: 50, ah: 10 }, tags: ['Anti-Shield', 'Burst'], description: 'Reduces enemy shields by 50%.' },
  { id: 'the_collector', name: 'The Collector', price: 2900, category: 'Physical', stats: { ad: 40, crit: 25 }, tags: ['Execute', 'Burst'], description: 'Executes enemies below 5% health.' },
  { id: 'guardian_angel', name: 'Guardian Angel', price: 3400, category: 'Physical', stats: { ad: 40, armor: 40 }, tags: ['Revive', 'Defense'], description: 'Resurrects upon taking lethal damage.' },
  { id: 'steraks_gage', name: 'Sterak\'s Gage', price: 3000, category: 'Physical', stats: { hp: 400 }, tags: ['Anti-Burst', 'Shield'], description: 'Grants a shield when taking heavy damage.' },
  { id: 'deaths_dance', name: 'Death\'s Dance', price: 3100, category: 'Physical', stats: { ad: 35, armor: 40, ah: 15 }, tags: ['Anti-Burst', 'Sustained'], description: 'Defers 35% of damage taken into a bleed.' },
  { id: 'wits_end', name: 'Wit\'s End', price: 2700, category: 'Physical', stats: { as: 45, mr: 50 }, tags: ['Anti-AP', 'Sustained'], description: 'On-hit magic damage and MR.' },
  { id: 'magnetic_blaster', name: 'Magnetic Blaster', price: 2900, category: 'Physical', stats: { as: 35, crit: 25 }, tags: ['Waveclear', 'Burst'], description: 'Energized attacks deal splash magic damage.' },
  { id: 'galeforce', name: 'Galeforce', price: 3100, category: 'Physical', stats: { ad: 30, crit: 25, as: 15 }, tags: ['Mobility', 'Execute'], description: 'Active: Dash and fire missiles at low health enemies.' },
  { id: 'terminus', name: 'Terminus', price: 3300, category: 'Physical', stats: { ad: 40, as: 30 }, tags: ['Anti-Tank', 'Hybrid-Pen'], description: 'Alternates between Armor and Magic penetration.' },
  { id: 'titanic_hydra', name: 'Titanic Hydra', price: 3000, category: 'Physical', stats: { ad: 40, hp: 500, ah: 10 }, tags: ['Waveclear', 'Sustained'], description: 'AoE damage based on max health.' },
  { id: 'trinity_force', name: 'Trinity Force', price: 3300, category: 'Physical', stats: { ad: 25, as: 25, ah: 20, hp: 250 }, tags: ['Spellblade', 'Hybrid'], description: 'Grants Spellblade and MS after attacks.' },
  { id: 'essence_reaver', name: 'Essence Reaver', price: 3000, category: 'Physical', stats: { ad: 55, ah: 20 }, tags: ['Sustain', 'Scaling'], description: 'Grants mana on crit and heals on crit.' },
  { id: 'manamune', name: 'Manamune', price: 2800, category: 'Physical', stats: { ad: 35, ah: 10 }, tags: ['Scaling', 'Mana-Based'], description: 'Grants AD based on mana.' },
  { id: 'muramana', name: 'Muramana', price: 3000, category: 'Physical', stats: { ad: 50, ah: 15 }, tags: ['Burst', 'Mana-Based'], description: 'Evolved Manamune with on-hit damage.' },
  { id: 'infinity_edge', name: 'Infinity Edge', price: 3400, category: 'Physical', stats: { ad: 60, crit: 35 }, tags: ['Burst', 'Crit'], description: 'Increases crit damage to 250%.' },
  { id: 'rapid_firecannon', name: 'Rapid Firecannon', price: 2800, category: 'Physical', stats: { as: 50, crit: 20 }, tags: ['Waveclear', 'Range'], description: 'Energized attacks gain extra range.' },
  { id: 'runaans_hurricane', name: 'Runaan\'s Hurricane', price: 2800, category: 'Physical', stats: { as: 45, crit: 20 }, tags: ['Waveclear', 'AoE'], description: 'Attacks hit nearby enemies.' },
  { id: 'statikk_shiv', name: 'Statikk Shiv', price: 2800, category: 'Physical', stats: { as: 40, crit: 20 }, tags: ['Waveclear', 'Burst'], description: 'Energized attacks deal AoE damage.' },
  { id: 'stormrazor', name: 'Stormrazor', price: 3000, category: 'Physical', stats: { ad: 45, crit: 25, as: 15 }, tags: ['Burst', 'Crit'], description: 'Energized attacks slow and deal bonus damage.' },
  { id: 'youmuus_ghostblade', name: 'Youmuu\'s Ghostblade', price: 2900, category: 'Physical', stats: { ad: 55, ah: 15 }, tags: ['Mobility', 'Burst'], description: 'Active: Gain MS and lethality.' },
  { id: 'duskblade_of_draktharr', name: 'Duskblade of Draktharr', price: 3000, category: 'Physical', stats: { ad: 50, ah: 15 }, tags: ['Burst', 'Invisibility'], description: 'Grants invisibility after kills.' },
  { id: 'profane_hydra', name: 'Profane Hydra', price: 3000, category: 'Physical', stats: { ad: 50, ah: 15 }, tags: ['Waveclear', 'Burst'], description: 'Active: Dash and deal AoE damage.' },
  { id: 'liandry_torment', name: 'Liandry\'s Torment', price: 3000, category: 'Magical', stats: { ap: 80, hp: 300 }, tags: ['Burn', 'Scaling'], description: 'Deals burn damage to enemies.' },
  { id: 'ludens_echo', name: 'Luden\'s Echo', price: 3200, category: 'Magical', stats: { ap: 90, ah: 20 }, tags: ['Burst', 'Waveclear'], description: 'Spells deal AoE damage on hit.' },
  { id: 'rylais_crystal_scepter', name: 'Rylai\'s Crystal Scepter', price: 3000, category: 'Magical', stats: { ap: 80, hp: 400 }, tags: ['Control', 'Scaling'], description: 'Spells slow enemies.' },
  { id: 'morellonomicon', name: 'Morellonomicon', price: 3000, category: 'Magical', stats: { ap: 80, ah: 20 }, tags: ['Anti-Heal', 'Burst'], description: 'Applies Grievous Wounds with spells.' },
  { id: 'zhonyas_hourglass', name: 'Zhonya\'s Hourglass', price: 3000, category: 'Magical', stats: { ap: 65, armor: 45, ah: 10 }, tags: ['Defense', 'Stasis'], description: 'Active: Become invulnerable for 2.5s.' },
  { id: 'banshees_veil', name: 'Banshee\'s Veil', price: 3000, category: 'Magical', stats: { ap: 60, mr: 50, ah: 10 }, tags: ['Defense', 'Shield'], description: 'Grants a spell shield.' },
  { id: 'void_staff', name: 'Void Staff', price: 2900, category: 'Magical', stats: { ap: 75, pen: 40 }, tags: ['Penetration', 'Scaling'], description: 'Grants magic penetration.' },
  { id: 'abyssal_mask', name: 'Abyssal Mask', price: 2600, category: 'Magical', stats: { ap: 60, hp: 300, mr: 40 }, tags: ['Defense', 'Scaling'], description: 'Grants AP scaling with health.' },
  { id: 'demonic_embrace', name: 'Demonic Embrace', price: 2900, category: 'Magical', stats: { ap: 70, hp: 350 }, tags: ['Burn', 'Scaling'], description: 'Deals burn damage to nearby enemies.' },
  { id: 'cosmic_drive', name: 'Cosmic Drive', price: 3000, category: 'Magical', stats: { ap: 75, ah: 25 }, tags: ['Mobility', 'Scaling'], description: 'Grants MS after spells.' },
  { id: 'nashors_tooth', name: 'Nashor\'s Tooth', price: 3000, category: 'Magical', stats: { ap: 80, as: 50, ah: 20 }, tags: ['Hybrid', 'Scaling'], description: 'Grants on-hit magic damage.' },
  { id: 'protobelt_enchant', name: 'Protobelt Enchant', price: 800, category: 'Enchantment', stats: {}, tags: ['Mobility', 'Active'], description: 'Active: Dash forward and fire missiles.' },
  { id: 'thornmail', name: 'Thornmail', price: 2700, category: 'Defense', stats: { armor: 75, hp: 200 }, tags: ['Anti-Heal', 'Anti-AD'], description: 'Reflects damage and applies Grievous Wounds.' },
  { id: 'force_of_nature', name: 'Force of Nature', price: 2850, category: 'Defense', stats: { mr: 50, hp: 350 }, tags: ['Anti-AP', 'Mobility'], description: 'Increases MR and MS when taking magic damage.' },
  { id: 'heartsteel', name: 'Heartsteel', price: 3000, category: 'Defense', stats: { hp: 700, ah: 20 }, tags: ['Scaling', 'Anti-Burst'], description: 'Infinite health scaling via basic attacks.' },
  { id: 'frozen_heart', name: 'Frozen Heart', price: 2700, category: 'Defense', stats: { armor: 80, ah: 25 }, tags: ['Anti-AS', 'Anti-AD'], description: 'Reduces nearby enemies\' attack speed.' },
  { id: 'randuins_omen', name: 'Randuin\'s Omen', price: 2800, category: 'Defense', stats: { armor: 60, hp: 400 }, tags: ['Anti-Crit', 'Anti-AD'], description: 'Reduces damage from critical strikes.' },
  { id: 'amaranths_twinguard', name: 'Amaranth\'s Twinguard', price: 3200, category: 'Defense', stats: { armor: 55, mr: 55 }, tags: ['Hybrid-Resist', 'Tenacity'], description: 'Increases size and resistances in combat.' },
  { id: 'kaenic_rookern', name: 'Kaenic Rookern', price: 3000, category: 'Defense', stats: { hp: 400, mr: 80, ah: 10 }, tags: ['Anti-AP', 'Shield'], description: 'Grants a magic shield after not taking damage.' },
  { id: 'mantle_of_twelfth_hour', name: 'Mantle of the Twelfth Hour', price: 2900, category: 'Defense', stats: { armor: 50, mr: 50, hp: 200 }, tags: ['Anti-Burst', 'Heal'], description: 'Heals and grants speed when low health.' },
  { id: 'radiant_virtue', name: 'Radiant Virtue', price: 3000, category: 'Defense', stats: { hp: 400, ah: 15, armor: 40, mr: 40 }, tags: ['Team-Heal', 'Utility'], description: 'Heals nearby allies after using Ultimate.' },
  { id: 'hollow_radiance', name: 'Hollow Radiance', price: 2900, category: 'Defense', stats: { hp: 500, mr: 40 }, tags: ['Waveclear', 'Anti-AP'], description: 'Deals magic damage to nearby enemies.' },
  { id: 'psychic_projector', name: 'Psychic Projector', price: 3000, category: 'Magical', stats: { ap: 60, hp: 300 }, tags: ['Defense', 'Scaling'], description: 'Grants AP based on bonus health.' },
  { id: 'malignance', name: 'Malignance', price: 3000, category: 'Magical', stats: { ap: 80, ah: 20 }, tags: ['Ultimate-Haste', 'Zone-Control'], description: 'Ultimate creates a zone that shreds MR.' },
  { id: 'horizon_focus', name: 'Horizon Focus', price: 2800, category: 'Magical', stats: { ap: 80, ah: 15 }, tags: ['Burst', 'Vision'], description: 'Damaging enemies from afar reveals and marks them.' },
];

export const RUNES: Rune[] = [
  { id: 'electrocute', name: 'Electrocute', tree: 'Keystone', scalingType: 'Flat', description: 'Burst damage on 3 hits.' },
  { id: 'conqueror', name: 'Conqueror', tree: 'Keystone', scalingType: 'Stacking', description: 'Adaptive force and healing on stacks.' },
  { id: 'kraken_slayer', name: 'Kraken Slayer', tree: 'Keystone', scalingType: 'Flat', description: 'True damage on every 3rd attack.' },
  { id: 'first_strike', name: 'First Strike', tree: 'Keystone', scalingType: 'Percentage', description: 'Bonus damage and gold on initial hit.' },
  { id: 'lethal_tempo', name: 'Lethal Tempo', tree: 'Keystone', scalingType: 'Stacking', description: 'Stacking attack speed.' },
  { id: 'grasp_undying', name: 'Grasp of the Undying', tree: 'Keystone', scalingType: 'Stacking', description: 'Health and damage on attack every 4s.' },
  { id: 'aftershock', name: 'Aftershock', tree: 'Keystone', scalingType: 'Flat', description: 'Resistances and burst after CC.' },
  { id: 'aery', name: 'Summon Aery', tree: 'Keystone', scalingType: 'Flat', description: 'Poke or shield allies.' },
  { id: 'phase_rush', name: 'Phase Rush', tree: 'Keystone', scalingType: 'Flat', description: 'Movement speed on 3 hits.' },
  { id: 'fleet_footwork', name: 'Fleet Footwork', tree: 'Keystone', scalingType: 'Flat', description: 'Heal and speed on energized attack.' },
  { id: 'dark_harvest', name: 'Dark Harvest', tree: 'Domination', scalingType: 'Stacking', description: 'Harvest souls from enemies for bonus damage.' },
  { id: 'sudden_impact', name: 'Sudden Impact', tree: 'Domination', scalingType: 'Flat', description: 'Grants lethality after dash or blink.' },
  { id: 'cheap_shot', name: 'Cheap Shot', tree: 'Domination', scalingType: 'Flat', description: 'Bonus true damage to CC\'d enemies.' },
  { id: 'eyeball_collection', name: 'Eyeball Collection', tree: 'Domination', scalingType: 'Stacking', description: 'Collect eyes for bonus AP.' },
  { id: 'treasure_hunter', name: 'Treasure Hunter', tree: 'Domination', scalingType: 'Stacking', description: 'Gain gold from takedowns.' },
  { id: 'zombie_ward', name: 'Zombie Ward', tree: 'Domination', scalingType: 'Stacking', description: 'Convert enemy wards into your own.' },
  { id: 'triumph', name: 'Triumph', tree: 'Precision', scalingType: 'Percentage', description: 'Heal on takedowns.' },
  { id: 'legend_alacrity', name: 'Legend: Alacrity', tree: 'Precision', scalingType: 'Stacking', description: 'Gain stacking attack speed.' },
  { id: 'legend_tenacity', name: 'Legend: Tenacity', tree: 'Precision', scalingType: 'Stacking', description: 'Gain stacking tenacity.' },
  { id: 'last_stand', name: 'Last Stand', tree: 'Precision', scalingType: 'Percentage', description: 'Deal more damage when low health.' },
  { id: 'coup_de_grace', name: 'Coup de Grace', tree: 'Precision', scalingType: 'Percentage', description: 'Deal more damage to low health enemies.' },
  { id: 'cut_down', name: 'Cut Down', tree: 'Precision', scalingType: 'Percentage', description: 'Deal more damage to tankier enemies.' },
  { id: 'conditioning', name: 'Conditioning', tree: 'Resolve', scalingType: 'Stacking', description: 'Gain armor and MR over time.' },
  { id: 'second_wind', name: 'Second Wind', tree: 'Resolve', scalingType: 'Flat', description: 'Heal when taking damage.' },
  { id: 'bone_plating', name: 'Bone Plating', tree: 'Resolve', scalingType: 'Flat', description: 'Reduce damage from enemy attacks.' },
  { id: 'overgrowth', name: 'Overgrowth', tree: 'Resolve', scalingType: 'Stacking', description: 'Gain stacking health.' },
  { id: 'revitalize', name: 'Revitalize', tree: 'Resolve', scalingType: 'Percentage', description: 'Increase healing and shielding.' },
  { id: 'unflinching', name: 'Unflinching', tree: 'Resolve', scalingType: 'Percentage', description: 'Reduce CC duration.' },
  { id: 'biscuit_delivery', name: 'Biscuit Delivery', tree: 'Inspiration', scalingType: 'Flat', description: 'Gain free biscuits for mana and health.' },
  { id: 'cosmic_insight', name: 'Cosmic Insight', tree: 'Inspiration', scalingType: 'Flat', description: 'Reduce cooldowns on summoner spells.' },
  { id: 'hextech_flashtraption', name: 'Hextech Flashtraption', tree: 'Inspiration', scalingType: 'Flat', description: 'Gain an extra dash.' },
  { id: 'magical_footwear', name: 'Magical Footwear', tree: 'Inspiration', scalingType: 'Flat', description: 'Gain free boots with bonus MS.' },
  { id: 'minion_dematerializer', name: 'Minion Dematerializer', tree: 'Inspiration', scalingType: 'Flat', description: 'Destroy minions for bonus damage.' },
  { id: 'perfect_timing', name: 'Perfect Timing', tree: 'Inspiration', scalingType: 'Flat', description: 'Gain a free Stopwatch.' },
];

export const SUMMONER_SPELLS: SummonerSpell[] = [
  { id: 'flash', name: 'Flash', cooldown: 300, description: 'Teleport to target location.' },
  { id: 'smite', name: 'Smite', cooldown: 90, description: 'Deal true damage to target minion or monster.' },
  { id: 'ignite', name: 'Ignite', cooldown: 210, description: 'Burn target enemy champion.' },
  { id: 'exhaust', name: 'Exhaust', cooldown: 210, description: 'Slow target enemy.' },
  { id: 'heal', name: 'Heal', cooldown: 240, description: 'Heal you and nearby ally.' },
  { id: 'teleport', name: 'Teleport', cooldown: 300, description: 'Teleport to target location after delay.' },
  { id: 'barrier', name: 'Barrier', cooldown: 210, description: 'Grant yourself a shield.' },
  { id: 'cleanse', name: 'Cleanse', cooldown: 210, description: 'Remove all CC from yourself.' },
];
