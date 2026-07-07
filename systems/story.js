const playedStoryEvents = new Set ();

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function playStory(storyLines) {
    for (const line of storyLines) {
        console.log(line);
        await wait (1800);
    }
}

async function playStoryOnce(eventName, storyLines) {
    if (playedStoryEvents.has(eventName)) {
        return;
    }

    playedStoryEvents.add(eventName);
    await playStory(storyLines);
}

module.exports = {
    playStory,
    playStoryOnce
};