import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function formatWithPrettier(filePath: string) {
  try {
    await execAsync(`npx prettier --write "${filePath}"`);
    console.log(`✔ Prettier formatted: "${filePath}"`);
  } catch (error) {
    console.error(`✖ Failed to format ${filePath} with Prettier:`, error);
  }
}
