import { runAllTests } from './src/services/stressTest';

console.log("Iniciando Validação de Estresse do Motor de Decisão...");
const success = runAllTests();
if (!success) {
  process.exit(1);
}
process.exit(0);
