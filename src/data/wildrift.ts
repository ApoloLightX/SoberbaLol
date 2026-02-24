/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SOBERBA RIFT - DATA LAYER v2.0
 * Normalização de Schemas para Motor de Decisão Adaptativo
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
  tags: string[]; // e.g., "Anti-Heal", "Anti-Shield", "Burst", "Sustained", "Tenacity"
  description: string;
}

export interface Rune {
  id: string;
  name: string;
  tree: 'Keystone' | 'Domination' | 'Precision' | 'Resolve' | 'Inspiration';
  scalingType: 'Flat' | 'Percentage' | 'Stacking';
  description: string;
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
  { id: 'kayle', name: 'Kayle', role: 'Top', damageType: 'Mixed', archetype: 'Fighter', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'kayn', name: 'Kayn', role: 'Jungle', damageType: 'AD', archetype: 'Assassin', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'kennen', name: 'Kennen', role: 'Top', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'High' },
  { id: 'khazix', name: 'Kha\'Zix', role: 'Jungle', damageType: 'AD', archetype: 'Assassin', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'kindred', name: 'Kindred', role: 'Jungle', damageType: 'AD', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'leesin', name: 'Lee Sin', role: 'Jungle', damageType: 'AD', archetype: 'Fighter', scaling: 'Early', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'leona', name: 'Leona', role: 'Support', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'Medium' },
  { id: 'lillia', name: 'Lillia', role: 'Jungle', damageType: 'AP', archetype: 'Fighter', scaling: 'Late', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'lissandra', name: 'Lissandra', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'High' },
  { id: 'lucian', name: 'Lucian', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Early', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'lulu', name: 'Lulu', role: 'Support', damageType: 'AP', archetype: 'Support', scaling: 'Linear', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'lux', name: 'Lux', role: 'Support', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'malphite', name: 'Malphite', role: 'Top', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'Low' },
  { id: 'maokai', name: 'Maokai', role: 'Support', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'Low' },
  { id: 'masteryi', name: 'Master Yi', role: 'Jungle', damageType: 'AD', archetype: 'Assassin', scaling: 'Late', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'milio', name: 'Milio', role: 'Support', damageType: 'AP', archetype: 'Support', scaling: 'Linear', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'miss_fortune', name: 'Miss Fortune', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Mid', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'mordekaiser', name: 'Mordekaiser', role: 'Top', damageType: 'AP', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'morgana', name: 'Morgana', role: 'Support', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'nami', name: 'Nami', role: 'Support', damageType: 'AP', archetype: 'Support', scaling: 'Linear', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'nasus', name: 'Nasus', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Late', range: 'Melee', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'nautilus', name: 'Nautilus', role: 'Support', damageType: 'AP', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'Low' },
  { id: 'nilah', name: 'Nilah', role: 'ADC', damageType: 'AD', archetype: 'Assassin', scaling: 'Late', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'norra', name: 'Norra', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'Medium', mobility: 'Medium' },
  { id: 'nunu', name: 'Nunu & Willump', role: 'Jungle', damageType: 'AP', archetype: 'Tank', scaling: 'Mid', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'olaf', name: 'Olaf', role: 'Jungle', damageType: 'AD', archetype: 'Fighter', scaling: 'Early', range: 'Melee', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'orianna', name: 'Orianna', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Late', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'ornn', name: 'Ornn', role: 'Top', damageType: 'Mixed', archetype: 'Tank', scaling: 'Late', range: 'Melee', ccDensity: 'High', mobility: 'Medium' },
  { id: 'pantheon', name: 'Pantheon', role: 'Jungle', damageType: 'AD', archetype: 'Fighter', scaling: 'Early', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'pyke', name: 'Pyke', role: 'Support', damageType: 'AD', archetype: 'Assassin', scaling: 'Early', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'rakan', name: 'Rakan', role: 'Support', damageType: 'AP', archetype: 'Support', scaling: 'Mid', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'rammus', name: 'Rammus', role: 'Jungle', damageType: 'Mixed', archetype: 'Tank', scaling: 'Mid', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'renekton', name: 'Renekton', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Early', range: 'Melee', ccDensity: 'Medium', mobility: 'Medium' },
  { id: 'rengar', name: 'Rengar', role: 'Jungle', damageType: 'AD', archetype: 'Assassin', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'riven', name: 'Riven', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'ryze', name: 'Ryze', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'samira', name: 'Samira', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Mid', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'senna', name: 'Senna', role: 'Support', damageType: 'AD', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'seraphine', name: 'Seraphine', role: 'Support', damageType: 'AP', archetype: 'Mage', scaling: 'Late', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'sett', name: 'Sett', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'Medium' },
  { id: 'shen', name: 'Shen', role: 'Top', damageType: 'Mixed', archetype: 'Tank', scaling: 'Linear', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'shyvana', name: 'Shyvana', role: 'Jungle', damageType: 'Mixed', archetype: 'Fighter', scaling: 'Late', range: 'Melee', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'singed', name: 'Singed', role: 'Top', damageType: 'AP', archetype: 'Tank', scaling: 'Late', range: 'Melee', ccDensity: 'Medium', mobility: 'Medium' },
  { id: 'sion', name: 'Sion', role: 'Top', damageType: 'Mixed', archetype: 'Tank', scaling: 'Late', range: 'Melee', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'sivir', name: 'Sivir', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'smolder', name: 'Smolder', role: 'ADC', damageType: 'Mixed', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'sona', name: 'Sona', role: 'Support', damageType: 'AP', archetype: 'Support', scaling: 'Late', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'soraka', name: 'Soraka', role: 'Support', damageType: 'AP', archetype: 'Support', scaling: 'Linear', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'swain', name: 'Swain', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'syndra', name: 'Syndra', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Late', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'talon', name: 'Talon', role: 'Jungle', damageType: 'AD', archetype: 'Assassin', scaling: 'Early', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'teemo', name: 'Teemo', role: 'Top', damageType: 'AP', archetype: 'Marksman', scaling: 'Mid', range: 'Ranged', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'thresh', name: 'Thresh', role: 'Support', damageType: 'AP', archetype: 'Support', scaling: 'Linear', range: 'Melee', ccDensity: 'High', mobility: 'Medium' },
  { id: 'tristana', name: 'Tristana', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'tryndamere', name: 'Tryndamere', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Late', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'twisted_fate', name: 'Twisted Fate', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'High' },
  { id: 'twitch', name: 'Twitch', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'urgot', name: 'Urgot', role: 'Top', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'varus', name: 'Varus', role: 'ADC', damageType: 'Mixed', archetype: 'Marksman', scaling: 'Mid', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'vayne', name: 'Vayne', role: 'ADC', damageType: 'True', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Medium', mobility: 'High' },
  { id: 'veigar', name: 'Veigar', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Late', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
  { id: 'vex', name: 'Vex', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Medium' },
  { id: 'vi', name: 'Vi', role: 'Jungle', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'viego', name: 'Viego', role: 'Jungle', damageType: 'AD', archetype: 'Fighter', scaling: 'Late', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'viktor', name: 'Viktor', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Late', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'vladimir', name: 'Vladimir', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'Medium' },
  { id: 'volibear', name: 'Volibear', role: 'Jungle', damageType: 'Mixed', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'Medium', mobility: 'Medium' },
  { id: 'warwick', name: 'Warwick', role: 'Jungle', damageType: 'Mixed', archetype: 'Fighter', scaling: 'Early', range: 'Melee', ccDensity: 'Medium', mobility: 'Medium' },
  { id: 'wukong', name: 'Wukong', role: 'Jungle', damageType: 'AD', archetype: 'Fighter', scaling: 'Mid', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'xayah', name: 'Xayah', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Medium', mobility: 'Medium' },
  { id: 'xin_zhao', name: 'Xin Zhao', role: 'Jungle', damageType: 'AD', archetype: 'Fighter', scaling: 'Early', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'yasuo', name: 'Yasuo', role: 'Mid', damageType: 'AD', archetype: 'Fighter', scaling: 'Late', range: 'Melee', ccDensity: 'Medium', mobility: 'High' },
  { id: 'yone', name: 'Yone', role: 'Mid', damageType: 'Mixed', archetype: 'Fighter', scaling: 'Late', range: 'Melee', ccDensity: 'High', mobility: 'High' },
  { id: 'yuumi', name: 'Yuumi', role: 'Support', damageType: 'AP', archetype: 'Support', scaling: 'Late', range: 'Ranged', ccDensity: 'Medium', mobility: 'High' },
  { id: 'zed', name: 'Zed', role: 'Mid', damageType: 'AD', archetype: 'Assassin', scaling: 'Mid', range: 'Melee', ccDensity: 'Low', mobility: 'High' },
  { id: 'zeri', name: 'Zeri', role: 'ADC', damageType: 'AD', archetype: 'Marksman', scaling: 'Late', range: 'Ranged', ccDensity: 'Low', mobility: 'High' },
  { id: 'ziggs', name: 'Ziggs', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'Medium', mobility: 'Low' },
  { id: 'zoe', name: 'Zoe', role: 'Mid', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'High' },
  { id: 'zyra', name: 'Zyra', role: 'Support', damageType: 'AP', archetype: 'Mage', scaling: 'Mid', range: 'Ranged', ccDensity: 'High', mobility: 'Low' },
];

export const ITEMS: Item[] = [
  { id: 'infinity_edge', name: 'Infinity Edge', price: 3400, category: 'Physical', stats: { ad: 55, crit: 25 }, tags: ['Burst', 'Crit'], description: 'Critical Strike damage increased to 230%.' },
  { id: 'black_cleaver', name: 'Black Cleaver', price: 3000, category: 'Physical', stats: { ad: 40, hp: 350, ah: 20 }, tags: ['Anti-Armor', 'Sustained'], description: 'Reduces enemy armor by up to 24%.' },
  { id: 'rabadons_deathcap', name: 'Rabadon\'s Deathcap', price: 3400, category: 'Magical', stats: { ap: 100 }, tags: ['Burst', 'Scaling'], description: 'Increases Ability Power by 40%.' },
  { id: 'thornmail', name: 'Thornmail', price: 2700, category: 'Defense', stats: { armor: 75, hp: 200 }, tags: ['Anti-Heal', 'Anti-AD'], description: 'Reflects damage and applies Grievous Wounds.' },
  { id: 'force_of_nature', name: 'Force of Nature', price: 2850, category: 'Defense', stats: { mr: 50, hp: 350 }, tags: ['Anti-AP', 'Mobility'], description: 'Increases MR and MS when taking magic damage.' },
  { id: 'divine_sunderer', name: 'Divine Sunderer', price: 3300, category: 'Physical', stats: { ad: 25, hp: 400, ah: 20 }, tags: ['Anti-Tank', 'Sustained'], description: 'Spellblade deals max health damage and heals.' },
  { id: 'blade_of_the_ruined_king', name: 'Blade of the Ruined King', price: 3100, category: 'Physical', stats: { ad: 20, as: 35 }, tags: ['Anti-Tank', 'Sustained'], description: 'Attacks deal 6% current health damage.' },
  { id: 'terminus', name: 'Terminus', price: 3300, category: 'Physical', stats: { ad: 40, as: 30 }, tags: ['Anti-Tank', 'Hybrid-Pen'], description: 'Alternates between Armor and Magic penetration.' },
  { id: 'heartsteel', name: 'Heartsteel', price: 3000, category: 'Defense', stats: { hp: 700, ah: 20 }, tags: ['Scaling', 'Anti-Burst'], description: 'Infinite health scaling via basic attacks.' },
  { id: 'sovereign', name: 'Sovereign', price: 3200, category: 'Magical', stats: { ap: 80, hp: 150, ah: 15 }, tags: ['Scaling', 'Utility'], description: 'Unique scaling based on takedowns.' },
  { id: 'titanic_hydra', name: 'Titanic Hydra', price: 3000, category: 'Physical', stats: { ad: 30, hp: 550 }, tags: ['Waveclear', 'Scaling'], description: 'Cleave damage based on max health.' },
  { id: 'shattered_queen', name: 'Crown of the Shattered Queen', price: 3000, category: 'Magical', stats: { ap: 60, hp: 250, ah: 20 }, tags: ['Anti-Burst', 'Defense'], description: 'Shield that reduces incoming damage by 70%.' },
  { id: 'magnetic_blaster', name: 'Magnetic Blaster', price: 2900, category: 'Physical', stats: { as: 35, crit: 25 }, tags: ['Waveclear', 'Burst'], description: 'Energized attacks deal splash magic damage.' },
  { id: 'wits_end', name: 'Wit\'s End', price: 2700, category: 'Physical', stats: { as: 45, mr: 50 }, tags: ['Anti-AP', 'Sustained'], description: 'On-hit magic damage and MR.' },
  { id: 'deaths_dance', name: 'Death\'s Dance', price: 3100, category: 'Physical', stats: { ad: 35, armor: 40, ah: 15 }, tags: ['Anti-Burst', 'Sustained'], description: 'Defers 35% of damage taken into a bleed.' },
  { id: 'liandrys_torment', name: 'Liandry\'s Torment', price: 3100, category: 'Magical', stats: { ap: 70, hp: 250 }, tags: ['Anti-Tank', 'Sustained'], description: 'Burn damage based on max health.' },
  { id: 'frozen_heart', name: 'Frozen Heart', price: 2700, category: 'Defense', stats: { armor: 80, ah: 25 }, tags: ['Anti-AS', 'Anti-AD'], description: 'Reduces nearby enemies\' attack speed.' },
  { id: 'spirit_visage', name: 'Spirit Visage', price: 2900, category: 'Defense', stats: { mr: 50, hp: 350, ah: 20 }, tags: ['Anti-AP', 'Sustained'], description: 'Increases all healing and shielding by 30%.' },
  { id: 'mortal_reminder', name: 'Mortal Reminder', price: 3000, category: 'Physical', stats: { ad: 45, pen: 30 }, tags: ['Anti-Heal', 'Anti-Armor'], description: 'Applies Grievous Wounds and Armor Pen.' },
  { id: 'seraphs_embrace', name: 'Seraph\'s Embrace', price: 3000, category: 'Magical', stats: { ap: 60, ah: 25 }, tags: ['Scaling', 'Anti-Burst'], description: 'Grants a shield when falling below 35% HP.' },
  { id: 'randuins_omen', name: 'Randuin\'s Omen', price: 2800, category: 'Defense', stats: { armor: 60, hp: 400 }, tags: ['Anti-Crit', 'Anti-AD'], description: 'Reduces damage from critical strikes.' },
  { id: 'serpents_fang', name: 'Serpent\'s Fang', price: 2800, category: 'Physical', stats: { ad: 50, ah: 10 }, tags: ['Anti-Shield', 'Burst'], description: 'Reduces enemy shields by 50%.' },
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
];
