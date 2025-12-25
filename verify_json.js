const fs = require("fs");
const METADATA_FILE = "data/nft-metadata.json";

if (fs.existsSync(METADATA_FILE)) {
  const data = JSON.parse(fs.readFileSync(METADATA_FILE));
  if (data.rarityRanks && data.rarityScores) {
    console.log("VERIFICATION SUCCESS: rarityRanks and rarityScores found.");
    console.log("RarityRanks count: " + Object.keys(data.rarityRanks).length);
    console.log("RarityScores count: " + Object.keys(data.rarityScores).length);
  } else {
    console.log("VERIFICATION FAILED: Keys missing.");
    console.log("Keys found: " + Object.keys(data).join(", "));
  }
} else {
  console.log("File not found");
}
