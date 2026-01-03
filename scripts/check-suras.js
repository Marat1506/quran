#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const translationsDir = path.join(__dirname, '..', 'data', 'translations');

console.log('Checking Sura files...');
console.log('Translations directory:', translationsDir);

if (!fs.existsSync(translationsDir)) {
  console.error('❌ Translations directory does not exist!');
  process.exit(1);
}

const files = fs.readdirSync(translationsDir);
const suraFiles = files.filter(file => file.match(/sura_\d+_tabasaran\.json$/));

console.log(`\n📁 Found ${suraFiles.length} sura files:`);

const suraNumbers = [];
const errors = [];

suraFiles.forEach(file => {
  const match = file.match(/sura_(\d+)_tabasaran\.json/);
  if (match) {
    const suraNum = parseInt(match[1]);
    suraNumbers.push(suraNum);
    
    // Check file validity
    try {
      const filePath = path.join(translationsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);
      
      if (!data.suraNumber || !data.suraName || !data.ayahs) {
        errors.push(`❌ ${file}: Missing required fields`);
      } else if (data.suraNumber !== suraNum) {
        errors.push(`❌ ${file}: suraNumber mismatch (${data.suraNumber} vs ${suraNum})`);
      } else {
        console.log(`✅ ${file} - Sura ${suraNum}: "${data.suraName}" (${data.ayahs.length} ayahs)`);
      }
    } catch (error) {
      errors.push(`❌ ${file}: ${error.message}`);
    }
  }
});

suraNumbers.sort((a, b) => a - b);

console.log(`\n📊 Summary:`);
console.log(`Total files: ${suraFiles.length}`);
console.log(`Valid suras: ${suraNumbers.length - errors.length}`);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log('\n🚨 Errors found:');
  errors.forEach(error => console.log(error));
}

console.log('\n📋 Available sura numbers:');
console.log(suraNumbers.join(', '));

// Check for missing suras in common ranges
const commonSuras = [1, 2, 3, 18, 36, 55, 67, 78, 112, 113, 114];
const missing = commonSuras.filter(num => !suraNumbers.includes(num));

if (missing.length > 0) {
  console.log('\n⚠️  Missing common suras:');
  console.log(missing.join(', '));
}