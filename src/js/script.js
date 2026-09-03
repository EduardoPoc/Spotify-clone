const songName = document.getElementById("song-name");
const song = document.getElementById("audio");
const play = document.getElementById("play");

songName.innerHTML = "Nome pego do JS";
let isPlaying = false;

function playsong() {
  play.querySelector(".bi").classList.remove("bi bi-play-circle");
  play.querySelector(".bi").classList.add("bi bi-pause-circle");
  song.play();
  isPlaying = true;
}
function pausesong() {
  play.querySelector(".bi").classList.add("bi bi-play-circle");
  play.querySelector(".bi").classList.remove("bi bi-pause-circle");
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

play.addEventListener("click", playORpause);
