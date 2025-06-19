import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to update HTML files
function updateHTMLFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if search-index.js is already included
    if (content.includes('search-index.js')) {
        console.log(`Already updated: ${filePath}`);
        return;
    }
    
    // Find the search.js script tag and add search-index.js before it
    const searchScriptRegex = /(<script src="\.\.\/assets\/js\/search\.js" defer><\/script>)/;
    const toolsSearchScriptRegex = /(<script src="\.\.\/\.\.\/assets\/js\/search\.js" defer><\/script>)/;
    
    if (searchScriptRegex.test(content)) {
        content = content.replace(
            searchScriptRegex,
            '<script src="../assets/js/search-index.js"></script>\n    $1'
        );
    } else if (toolsSearchScriptRegex.test(content)) {
        content = content.replace(
            toolsSearchScriptRegex,
            '<script src="../../assets/js/search-index.js"></script>\n    $1'
        );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${filePath}`);
}

// Get all HTML files in documentation directory
function getAllHTMLFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            getAllHTMLFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Update all documentation HTML files
const docDir = path.join(__dirname, 'documentation');
const htmlFiles = getAllHTMLFiles(docDir);

console.log(`Found ${htmlFiles.length} HTML files to update`);

htmlFiles.forEach(file => {
    updateHTMLFile(file);
});

console.log('All files updated successfully!');