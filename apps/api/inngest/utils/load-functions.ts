import { readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Получаем текущую директорию
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Автоматически сканируем папку functions и импортируем все файлы
export async function loadFunctions() {
  const functionsDir = join(__dirname, "../functions");
  const files = readdirSync(functionsDir).filter(file => 
    file.endsWith(".ts") && !file.includes("index")
  );
  
  const functions = [];
  
  for (const file of files) {
    const modulePath = `../functions/${file.replace(".ts", "")}`;
    const module = await import(modulePath);
    if (module.default) {
      functions.push(module.default);
    }
  }
  
  return functions;
} 