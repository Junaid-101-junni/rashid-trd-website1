const fs = require('fs');
const path = require('path');

function checkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                checkDir(fullPath);
            }
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
            let match;
            while ((match = importRegex.exec(content)) !== null) {
                const importPath = match[1];
                if (importPath.startsWith('.')) {
                    const resolvedPath = path.resolve(dir, importPath);
                    const dirName = path.dirname(resolvedPath);
                    const baseName = path.basename(resolvedPath);
                    
                    try {
                        const actualFiles = fs.readdirSync(dirName);
                        // Check if any file matches case-insensitively but not case-sensitively
                        const exactMatch = actualFiles.find(f => f === baseName || f.startsWith(baseName + '.'));
                        const lowerMatch = actualFiles.find(f => f.toLowerCase() === baseName.toLowerCase() || f.toLowerCase().startsWith(baseName.toLowerCase() + '.'));
                        
                        if (!exactMatch && lowerMatch) {
                            console.log(`ERROR: Case mismatch in ${fullPath}`);
                            console.log(`Imported: ${importPath}`);
                            console.log(`Actual file: ${lowerMatch}`);
                        }
                    } catch (e) {
                        // ignore if dir doesn't exist
                    }
                }
            }
        }
    });
}

checkDir(process.cwd());
console.log('Case check complete.');
