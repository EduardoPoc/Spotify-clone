//variaveis
const songName = document.getElementById("song-name");
const song = document.getElementById("audio");
const play = document.getElementById("play");
const cover = document.getElementById("cover");
const bandName = document.getElementById("band-name");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const shuffle = document.getElementById("shuffle");
const repeat = document.getElementById("repeat");
const songTime = document.getElementById("song-time");
const totalTime = document.getElementById("total-time");
const like = document.getElementById("like");

//objeto musica
const Dai_Dai = {
  songName: "Dai Dai",
  bandName: "Shakira, Burna Boy",
  cover: "img/dai-dai.webp",
  song: "songs/Shakira, Burna Boy - Dai Dai.mp3",
  liked: false,
};
const amiga_da_minha_mulher = {
  songName: "Amiga da minha mulher",
  bandName: "Seu Jorge",
  cover: "img/amiga-da-minha-mulher.webp",
  song: "songs/amiga-da-minha-mulher.mp3",
  liked: false,
};
const believer = {
  songName: "Believer",
  bandName: "Imagine Dragons",
  cover: "img/beliver.webp",
  song: "songs/imagine-dragons-believer.mp3",
  liked: false,
};

//variaveis de controle
const OriginalPlaylist = JSON.parse(localStorage.getItem("playlist")) ?? [
  Dai_Dai,
  amiga_da_minha_mulher,
  believer,
];
let playlist = [...OriginalPlaylist];
let indexSong = 0;
let isShuffled = false;
let isPlaying = false;
let repeatMode = false;

function playsong() {
  play.querySelector(".bi").classList.remove("bi-play-circle");
  play.querySelector(".bi").classList.add("bi-pause-circle");
  song.play();
  isPlaying = true;
}
function pausesong() {
  play.querySelector(".bi").classList.add("bi-play-circle");
  play.querySelector(".bi").classList.remove("bi-pause-circle");
  song.pause();
  isPlaying = false;
}
function playORpause() {
  if (isPlaying) {
    pausesong();
  } else {
    playsong();
  }
}
function previousSong() {
  indexSong--;
  if (indexSong < 0) {
    indexSong = playlist.length - 1;
  }
  inicializeSong();
  playsong();
}
function nextSong() {
  indexSong++;
  if (indexSong > playlist.length - 1) {
    indexSong = 0;
  }
  inicializeSong();
  playsong();
}
function likeClicked() {
  playlist[indexSong].liked = !playlist[indexSong].liked;
  likedSong();

  localStorage.setItem("playlist", JSON.stringify(originalPlaylist));
}

function likedSong() {
  if (playlist[indexSong].liked) {
    like.querySelector(".bi").classList.remove("bi-heart");
    like.querySelector(".bi").classList.add("bi-heart-fill");
    like.classList.add("button-active");
  } else {
    like.querySelector(".bi").classList.remove("bi-heart-fill");
    like.querySelector(".bi").classList.add("bi-heart");
    like.classList.remove("button-active");
  }
}

function inicializeSong() {
  cover.src = playlist[indexSong].cover;
  song.src = playlist[indexSong].song;
  songName.innerText = playlist[indexSong].songName;
  bandName.innerText = playlist[indexSong].bandName;
  likedSong();
}
function updateProgress() {
  const barWidth = (song.currentTime / song.duration) * 100;
  currentProgress.style.setProperty("--progress", `${barWidth}%`);
  songTime.innerText = toHHMMSS(song.currentTime);
}
function jumpTo(event) {
  const width = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition / width) * song.duration;
  song.currentTime = jumpToTime;
}
function sufflearray(array) {
  let size = playlist.length;
  let currentIndex = size - 1;
  while (currentIndex > 0) {
    let randomIndex = Math.floor(Math.random() * size);
    let aux = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = aux;
    currentIndex--;
  }
}

function shuffleClicked() {
  if (!isShuffled) {
    isShuffled = true;
    sufflearray(playlist);
    shuffle.classList.add("button-active");
  } else {
    isShuffled = false;
    playlist = [...OriginalPlaylist];
    shuffle.classList.remove("button-active");
  }
}
function repeatClicked() {
  if (!repeatMode) {
    repeatMode = true;
    repeat.classList.add("button-active");
  } else {
    repeatMode = false;
    repeat.classList.remove("button-active");
  }
}
function nextSongORRepeat() {
  if (!repeatMode) {
    nextSong();
  } else {
    playsong();
  }
}
function toHHMMSS(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - hours * 3600) / 60);
  let secs = Math.floor(seconds - hours * 3600 - minutes * 60);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
function updateTotalTime() {
  totalTime.innerText = toHHMMSS(song.duration);
}

inicializeSong();
play.addEventListener("click", playORpause);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgress);
song.addEventListener("ended", nextSongORRepeat);
song.addEventListener("loadedmetadata", updateTotalTime);
progressContainer.addEventListener("click", jumpTo);
shuffle.addEventListener("click", shuffleClicked);
repeat.addEventListener("click", repeatClicked);
like.addEventListener("click", likeClicked);
