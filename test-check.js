const fs = require('fs');
const jsFile = fs.readdirSync('dist/assets').find(f => f.endsWith('.js'));
const jsContent = fs.readFileSync('dist/assets/' + jsFile, 'utf8');
console.log('JS contains figma-hero:', jsContent.includes('figma-hero.webp'));
console.log('JS contains figma-car:', jsContent.includes('figma-car.webp'));
