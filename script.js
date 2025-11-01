const songs = [
  { title: "Calm Waves", src: "songs/song1.mp3" },
  { title: "Dream Beats", src: "songs/song2.mp3" },
  { title: "Skyline", src: "songs/song3.mp3" }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.getElementById("song-title");

let songIndex = 0;

function loadSong(song) {
  title.textContent = song.title;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

playBtn.addEventListener("click", () => {
  const isPlaying = !audio.paused;
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = progressPercent + "%";
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

loadSong(songs[songIndex]);