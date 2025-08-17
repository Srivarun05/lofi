function updateBackgroundImage() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
        document.body.style.backgroundImage = "url('media/bg/lofi_mrng.jpg')";
    } else if (hour >= 12 && hour < 18) {
        document.body.style.backgroundImage = "url('media/bg/lofi_af.jpg')";
    } else if (hour >= 18 && hour < 21) {
        document.body.style.backgroundImage = "url('media/bg/lofi_eve.jpg')";
    } else {
        document.body.style.backgroundImage = "url('media/bg/lofi_night.jpg')";
    }
}

updateBackgroundImage();

// Audio Player Setup
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const forwardBtn = document.getElementById('forwardBtn');
const backwardBtn = document.getElementById('backwardBtn');

const playlists = {
    default: ["media/song/main1.mp3", "media/song/main2.mp3"],
    study: ["media/song/study1.mp3", "media/song/study2.mp3"],
    retro: ["media/song/retro1.mp3", "media/song/retro2.mp3"],
    chill: ["media/song/chill1.mp3", "media/song/chill2.mp3"],
    focus: ["media/song/focus1.mp3", "media/song/focus2.mp3"]
};

let currentPlaylist = playlists.default;
let currentTrackIndex = 0;
let isPlaying = false;

function loadTrack(index) {
    audioPlayer.src = currentPlaylist[index]; 
    audioPlayer.load();
    if (isPlaying) audioPlayer.play();
}

playPauseBtn.addEventListener('click', function () {
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying = !isPlaying;
    playPauseBtn.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
});

audioPlayer.addEventListener('ended', function () {
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
});

// Forward Button
forwardBtn.addEventListener('click', function () {
    currentTrackIndex = (currentTrackIndex + 1) % currentPlaylist.length;
    loadTrack(currentTrackIndex);
});

// Backward Button
backwardBtn.addEventListener('click', function () {
    currentTrackIndex = (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    loadTrack(currentTrackIndex);
});

// Volume Control
const volumeBtn = document.getElementById('volumeBtn');
const volumeSlider = document.getElementById('volumeSlider');

volumeBtn.addEventListener('click', function () {
    volumeSlider.style.display = volumeSlider.style.display === 'none' ? 'block' : 'none';
});

volumeSlider.addEventListener('input', function () {
    audioPlayer.volume = volumeSlider.value / 100;
    setTimeout(() => volumeSlider.style.display = 'none', 3000);
});

// Background Image Change Popup
const imageBtn = document.getElementById('imageBtn');
const imagePopup = document.getElementById('imagePopup');
const popupImages = document.querySelectorAll('.popup-image');

imageBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    imagePopup.style.display = imagePopup.style.display === 'none' || imagePopup.style.display === '' ? 'flex' : 'none';
});

popupImages.forEach(image => {
    image.addEventListener('click', function () {
        document.body.style.backgroundImage = `url('${this.src}')`;
        imagePopup.style.display = 'none';
    });
});

document.addEventListener('click', function (event) {
    if (!imagePopup.contains(event.target) && event.target !== imageBtn) {
        imagePopup.style.display = 'none';
    }
});

// Options Menu (Playlist Selection)
const barsBtn = document.getElementById('barsBtn');
const optionsContainer = document.getElementById('optionsContainer');

barsBtn.addEventListener('click', function () {
    optionsContainer.style.display = optionsContainer.style.display === 'none' ? 'flex' : 'none';
});

const optionButtons = document.querySelectorAll('.option-btn');
optionButtons.forEach(button => {
    button.addEventListener('click', function () {
        optionButtons.forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');

        // Get selected option and update the playlist
        const selectedOption = this.dataset.option;
        currentPlaylist = playlists[selectedOption] || playlists.default;

        // Reset track index and load first song in the selected playlist
        currentTrackIndex = 0;
        loadTrack(currentTrackIndex);

        optionsContainer.style.display = 'none';
    });
});


// Auto-hide UI on Inactivity
const rectangleBox = document.querySelector('.rectangle-box');
let inactivityTimeout;

function hideRectangleBox() {
    inactivityTimeout = setTimeout(() => rectangleBox.style.display = 'none', 3000);
}

document.addEventListener('mousemove', function () {
    clearTimeout(inactivityTimeout);
    rectangleBox.style.display = 'flex';
    hideRectangleBox();
});

hideRectangleBox();

