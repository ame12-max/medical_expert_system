import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execAsync = promisify(exec);

// Path to knowledge.pl (located in the same folder)
const knowledgePath = path.join(__dirname, 'knowledge.pl');

export async function queryProlog(command, timeout = 5000) {
  const prologPath = process.env.PROLOG_PATH || 'swipl';
  const fullCommand = `${prologPath} -q -f "${knowledgePath}" -- ${command}`;
  try {
    const { stdout, stderr } = await execAsync(fullCommand, { timeout });
    if (stderr && !stderr.includes('Warning')) throw new Error(stderr);
    return stdout.trim();
  } catch (error) {
    console.error('Prolog error:', error.message);
    throw new Error(`Prolog execution failed: ${error.message}`);
  }
}

export async function getAllSymptoms() {
  const output = await queryProlog('--get-symptoms');
  return JSON.parse(output);
}

export async function getDiagnosis(symptomsArray) {
  // Format symptoms as Prolog list: ['fever','headache']
  const symptomsList = `[${symptomsArray.map(s => `'${s.replace(/'/g, "\\'")}'`).join(',')}]`;
  const output = await queryProlog(`--diagnose --symptoms="${symptomsList}"`);
  return JSON.parse(output);
}