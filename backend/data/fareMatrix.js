// backend/data/fareMatrix.js

// --- COMPLETE STATION LISTS ---
// Names must EXACTLY match your database and frontend dropdown options

const purpleLine = [
  "Whitefield (Kadugodi)",
  "Hopefarm Channasandra",
  "Kadugodi Tree Park",
  "Pattanduru Agrahara",
  "Sri Sathya Sai Hospital",
  "Nallurhalli",
  "Kundalahalli",
  "Seetharamapalya",
  "Hoodi",
  "Garudacharapalya",
  "Singayyanapalya",
  "Krishnarajapura (KR Pura)",
  "Benniganahalli",
  "Baiyappanahalli",
  "Swami Vivekananda Road",
  "Indiranagar",
  "Halasuru", // Correct spelling
  "Trinity",
  "Mahatma Gandhi Road (MG Road)",
  "Cubbon Park",
  "Dr. B.R. Ambedkar Stn., Vidhana Soudha",
  "Sir M. Visveswaraya Stn., Central College",
  "Majestic (Nadaprabhu Kempegowda)", // Interchange
  "Krantivira Sangolli Rayanna Railway Station",
  "Magadi Road",
  "Sri Balagangadharanatha Swamiji Stn., Hosahalli", // Check if frontend sends "Hosahalli"
  "Vijayanagar",
  "Attiguppe", // Correct spelling
  "Deepanjali Nagar",
  "Mysuru Road",
  "Pantharapalya–Nayandahalli", // Check if frontend sends "Nayandahalli"
  "Rajarajeshwari Nagar",
  "Jnanabharathi",
  "Pattanagere",
  "Kengeri Bus Terminal",
  "Kengeri",
  "Challaghatta" // Correct spelling
];

const greenLine = [
  "Madavara (BIEC)",
  "Chikkabidarakallu",
  "Manjunath Nagar",
  "Nagasandra",
  "Dasarahalli",
  "Jalahalli",
  "Peenya Industry",
  "Peenya",
  "Goraguntepalya",
  "Yeshwanthpur",
  "Sandal Soap Factory",
  "Mahalakshmi",
  "Rajajinagar",
  "Mahakavi Kuvempu Road",
  "Srirampura",
  "Mantri Square Sampige Road",
  "Majestic (Nadaprabhu Kempegowda)", // Interchange
  "Chickpet",
  "Krishna Rajendra Market",
  "National College",
  "Lalbagh",
  "South End Circle",
  "Jayanagar",
  "Rashtreeya Vidyalaya Road",
  "Banashankari",
  "Jaya Prakash Nagar",
  "Yelachenahalli",
  "Konanakunte Cross",
  "Doddakallasandra",
  "Vajarahalli",
  "Thalaghattapura",
  "Silk Institute"
];


// --- getFare function (Updated error handling slightly) ---
const getFare = (start, end) => {
  if (start === end) return 10;

  const majesticStationName = "Majestic (Nadaprabhu Kempegowda)";
  let startLine = purpleLine.includes(start) ? purpleLine : greenLine;
  let endLine = purpleLine.includes(end) ? purpleLine : greenLine;
  let startIndex = startLine.indexOf(start);
  let endIndex = endLine.indexOf(end);

  // Check if stations were found
  if (startIndex === -1 || endIndex === -1) {
    // Log the exact names received from the frontend
    console.error(`FARE MATRIX ERROR: Station name mismatch. Received Start: "${start}", End: "${end}". Check against arrays.`);
    // You could add more specific checks here if needed, e.g., trim whitespace
    return null; // Station name doesn't match arrays
  }

  // Calculate distance (stations travelled, excluding start)
  let distance = 0;
  if (startLine === endLine) {
    distance = Math.abs(endIndex - startIndex);
  } else {
    // Different lines: Calculate via Majestic
    let majesticStartLineIndex = startLine.indexOf(majesticStationName);
    let majesticEndLineIndex = endLine.indexOf(majesticStationName);
    if (majesticStartLineIndex === -1 || majesticEndLineIndex === -1) {
       console.error("FARE MATRIX ERROR: Majestic interchange not found in line arrays.");
       return null;
    }
    distance = Math.abs(startIndex - majesticStartLineIndex) + Math.abs(endIndex - majesticEndLineIndex);
  }

  // Determine fare based on distance (BMRCL chart)
   if (distance <= 0) return 10;
   else if (distance <= 2) return 10;
   else if (distance <= 4) return 20;
   else if (distance <= 6) return 30;
   else if (distance <= 8) return 40;
   else if (distance <= 10) return 50;
   else if (distance <= 15) return 60;
   else if (distance <= 18) return 70;
   else if (distance <= 19) return 70; // 19 stations
   else if (distance <= 22) return 80; // 20-22 stations
   else if (distance <= 30) return 90; // 23-30 stations (simplified)
   else return 90; // > 30 stations
};
// --- END of getFare function ---


module.exports = getFare;