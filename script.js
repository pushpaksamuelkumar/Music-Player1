// GitHub repository details
const githubUsername = "pushpaksamuel";
const repoName = "English_Songs";
const branch = "main";  // Change if using a different branch

async function loadSongs() {
    const apiUrl = `https://api.github.com/repos/${githubUsername}/${repoName}/contents/`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const songSelector = document.getElementById("song-selector");

        data.forEach(file => {
            if (file.name.endsWith(".mp3")) { // Only add MP3 files
                let option = document.createElement("option");
                option.value = `https://raw.githubusercontent.com/${githubUsername}/${repoName}/${branch}/${encodeURIComponent(file.name)}`;
                option.textContent = file.name.replace(/-/g, " ").replace(".mp3", ""); // Format name
                songSelector.appendChild(option);
            }
        });
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
}

document.getElementById('song-selector').addEventListener('change', function () {
    var player = document.getElementById('audio-player');
    var source = document.getElementById('audio-source');
    source.src = this.value;
    player.load();
    player.play();
});

// Load songs on page load
window.onload = loadSongs;
