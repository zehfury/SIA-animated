// Build script to replace environment variables in script.js
const fs = require('fs');
const path = require('path');

// Read the script.js file
const scriptPath = path.join(__dirname, 'script.v2.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Replace placeholders with environment variables
const replacements = {
    'YOUR_GOOGLE_API_KEY_HERE': process.env.GOOGLE_API_KEY || 'YOUR_GOOGLE_API_KEY_HERE',
    'YOUR_YOUTUBE_PLAYLIST_ID_HERE': process.env.YT_PLAYLIST_ID || 'YOUR_YOUTUBE_PLAYLIST_ID_HERE',
    'YOUR_GOOGLE_CALENDAR_ID_HERE': process.env.GCAL_CALENDAR_ID || 'YOUR_GOOGLE_CALENDAR_ID_HERE'
};

// Perform replacements
Object.entries(replacements).forEach(([placeholder, value]) => {
    scriptContent = scriptContent.replace(new RegExp(placeholder, 'g'), value);
});

// Write the updated script back
fs.writeFileSync(scriptPath, scriptContent);

console.log('Environment variables replaced in script.js');

