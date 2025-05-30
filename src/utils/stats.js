
function getTotalPoints(user) {
    let totalPoints = 0;
    for (const levelKey in user.levels) {
        const level = user.levels[levelKey];
        if (level.finish_time && typeof level.finish_time === 'number') {
            totalPoints += level.points;
        }
    }
    return totalPoints;
}

function getTotalTime(user) {
    let totalTime = 0;
    for (const levelKey in user.levels) {
        const level = user.levels[levelKey];
        if (level.finish_time && typeof level.finish_time === 'number') {
            totalTime += level.finish_time - level.start_time;
        }
    }
    return totalTime;
}

function getCompletedLevelsCount(user) {
    let count = 0;
    for (const levelKey in user.levels) {
        const level = user.levels[levelKey];
        if (level.finish_time && typeof level.finish_time === 'number') {
            count++;
        }
    }
    return count;
}

function getAverageTimePerLevel(user) {
    const totalTime = getTotalTime(user);
    const completedLevels = getCompletedLevelsCount(user);
    return completedLevels > 0 ? totalTime / completedLevels : 0;
}

function getFastestLevel(user) {
    let minTime = Infinity;
    let fastestLevel = null;
    for (const levelKey in user.levels) {
        const level = user.levels[levelKey];
        if (level.finish_time && typeof level.finish_time === 'number') {
            const timeTaken = level.finish_time - level.start_time;
            if (timeTaken < minTime) {
                minTime = timeTaken;
                fastestLevel = level.level_nr;
            }
        }
    }
    return fastestLevel;
}

function getHardestLevel(user) {
    let maxTime = -Infinity;
    let hardestLevel = null;
    for (const levelKey in user.levels) {
        const level = user.levels[levelKey];
        if (level.finish_time && typeof level.finish_time === 'number') {
            const timeTaken = level.finish_time - level.start_time;
            if (timeTaken > maxTime) {
                maxTime = timeTaken;
                hardestLevel = level.level_nr;
            }
        }
    }
    return hardestLevel;
}

function getHintsUsed(user) {
    let hintsCount = 0;
    for (const levelKey in user.levels) {
        const level = user.levels[levelKey];
        if (level.hint) {
            hintsCount++;
        }
    }
    return hintsCount;
}

function getUserStats(user) {
    return {
        punctajTotal: getTotalPoints(user),
        timpTotal: getTotalTime(user),
        mediaTimpPerNivel: getAverageTimePerLevel(user),
        celMaiRapidNivel: getFastestLevel(user),
        celMaiGreuNivel: getHardestLevel(user),
        hinturiFolosite: getHintsUsed(user)
    };
}

export { getUserStats };