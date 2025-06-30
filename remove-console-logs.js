import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to search
const directories = [
  path.join(__dirname, 'src')
];

// File extensions to process
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// Regex to match console.* statements
const consoleRegex = /\s*console\.(log|warn|error|info|debug|trace|dir|dirxml|group|groupEnd|time|timeEnd|timeLog|table|clear|count|countReset|assert|profile|profileEnd|timeStamp|context|memory)\([^)]*\)\s*;?/g;

// Function to process a single file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Remove console.* statements
    content = content.replace(consoleRegex, '');
    
    // Only write if content changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Removed console.* statements from: ${filePath}`);
      return 1;
    }
    return 0;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return 0;
  }
}

// Function to walk through directories
function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirPath = path.join(dir, file);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, file));
    }
  }
}

// Main function
async function main() {
  let totalFilesProcessed = 0;
  let totalConsoleLogsRemoved = 0;
  
  for (const dir of directories) {
    walkDir(dir, (filePath) => {
      if (extensions.includes(path.extname(filePath).toLowerCase())) {
        totalFilesProcessed++;
        totalConsoleLogsRemoved += processFile(filePath);
      }
    });
  }
  
  console.log(`\nProcessed ${totalFilesProcessed} files`);
  console.log(`Removed console.* statements from ${totalConsoleLogsRemoved} files`);
}

main().catch(console.error);
