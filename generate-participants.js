const fs = require("fs");
const path = require("path");

const CONFIG = {
  NULL_ADDRESS: "0x0000000000000000000000000000000000000000",
  START_THRESHOLD: new Date("2025-12-02T07:59:59.000Z").getTime(),
  DEFAULT_END_DATE: new Date("2025-12-05T03:00:00.000Z").getTime(),
  POINTS_PER_DAY: 10,
  BONUS_POINT: 50,
};

async function generate() {
  try {
    const filePath = path.join(__dirname, "llamao.holdings.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const transactions = JSON.parse(fileContents);

    const leaderboard = new Map();
    transactions.forEach((tx) => {
      let score = 0;
      if (tx.fromAccountAddress === CONFIG.NULL_ADDRESS) {
        score += CONFIG.BONUS_POINT;
      }

      const originalStart = new Date(tx.fromTimestamp).getTime();
      const effectiveStart = Math.max(originalStart, CONFIG.START_THRESHOLD);

      let effectiveEnd;
      if (tx.toTimestamp) {
        effectiveEnd = new Date(tx.toTimestamp).getTime();
      } else {
        effectiveEnd = CONFIG.DEFAULT_END_DATE;
      }

      if (effectiveEnd > effectiveStart) {
        const durationMs = effectiveEnd - effectiveStart;
        const durationDays = Math.floor(durationMs / (1000 * 60 * 60 * 24));

        score += durationDays * CONFIG.POINTS_PER_DAY;
      }

      const currentScore = leaderboard.get(tx.accountAddress) || 0;
      leaderboard.set(tx.accountAddress, currentScore + score);
    });

    const result = Array.from(leaderboard.entries()).map(
      ([address, point]) => ({
        accountAddress: address,
        totalPoints: parseFloat(point.toFixed(2)),
      })
    );

    result.sort((a, b) => b.totalPoints - a.totalPoints);

    const outputPath = path.join(__dirname, "public", "participants.json");
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    console.log(
      `Successfully wrote ${result.length} participants to ${outputPath}`
    );
  } catch (error) {
    console.error("Error generating participants:", error);
  }
}

generate();
