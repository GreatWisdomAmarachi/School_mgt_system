
function getGrade(score) {
    if (score >= 70) return 'A';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C';
    if (score >= 45) return 'D';
    if (score >= 40) return 'E';
    return 'F';
}

function calculatePositions(reportCards) {
    // Sort by totalScore descending
    reportCards.sort((a, b) => b.totalScore - a.totalScore);

    let currentPosition = 1;
    let lastScore = null;
    
    reportCards.forEach((rc, index) => {
        if (lastScore !== null && rc.totalScore === lastScore) {
            // same score => same position
            rc.position = currentPosition;
        } else {
            //new score => update position
            currentPosition = index + 1;
            rc.position = currentPosition;
        }
        lastScore = rc.totalScore;
    });
    return reportCards;
}

module.exports = { getGrade, calculatePositions };