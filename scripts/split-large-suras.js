#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const translationsDir = path.join(__dirname, '..', 'data', 'translations');
const MAX_SIZE = 30000; // 30KB limit

console.log('Checking for large sura files...');

const files = fs.readdirSync(translationsDir);
const suraFiles = files.filter(file => file.match(/sura_\d+_tabasaran\.json$/));

suraFiles.forEach(file => {
  const filePath = path.join(translationsDir, file);
  const stats = fs.statSync(filePath);
  
  if (stats.size > MAX_SIZE) {
    console.log(`⚠️  Large file detected: ${file} (${stats.size} bytes)`);
    
    // Read and validate the file
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);
      
      console.log(`   - Sura ${data.suraNumber}: "${data.suraName}"`);
      console.log(`   - Ayahs: ${data.ayahs.length}`);
      console.log(`   - Average ayah size: ${Math.round(content.length / data.ayahs.length)} chars`);
      
      // Check for problematic characters
      const problematicChars = content.match(/[^\x00-\x7F]/g);
      if (problematicChars) {
        const uniqueChars = [...new Set(problematicChars)].slice(0, 10);
        console.log(`   - Non-ASCII chars found: ${uniqueChars.join(', ')}`);
      }
      
    } catch (error) {
      console.log(`   - ❌ Error reading file: ${error.message}`);
    }
  }
});

console.log('\nDone.');