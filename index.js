if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  document.body.classList.add("_touch");
  // Проверка, с какого устройства к нам зашли

  let menuArrows = document.querySelectorAll(".menu__arrow");

  if (menuArrows.length > 0) {
    let i;
    for (i = 0; i < menuArrows.length; i++) {
      const menuArrow = menuArrows[i];
      menuArrow.addEventListener("click", function () {
        menuArrow.parentElement.classList.toggle("_active");
      });
    }
  }
} else document.body.classList.add("_pc");
//Появление стрелок на touch устройствах

let menu = document.querySelector(".menu__list");
let burger = document.querySelector(".burger");

burger.addEventListener("click", function () {
  document.querySelector(".burger span").classList.toggle("active");
  document.querySelector("body").classList.toggle("active");
  menu.style.marginTop = window.outerHeight / 5 + "px";
  menu.style.marginRight = window.outerWidth / 3.2 + "px";
});
//Управление положением меню

const player = document.querySelector(".player");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");
const audio = document.querySelector(".audio");
const progressContainer = document.querySelector(".progress__case");
const progressBar = document.querySelector(".progress");
const albumPic = document.getElementById("album");
const albumPicSmall = document.getElementById("albumSmall");
const songTitel = document.getElementById("song__titel");
const mix = document.getElementById("mix");
const volume = document.querySelector(".volume__item");
const volIcon = document.getElementById("vol");

//Названия песен
const songTitles = ["RB Gimn", "USSR Gimn"];

//Песня по умолчанию
let songIndex = 0;

//Инициализация
function loadSong(song) {
  songTitel.innerHTML = song;
  audio.src = `./audio/${song}.mp3`;
  if (albumPic) {
    albumPic.src = `./images/Music/AlbumPicMus${songIndex + 1}.png`;
  }

  albumPicSmall.src = `./images/Music/AlbumPic${songIndex + 1}.png`;
}
loadSong(songTitles[songIndex]);

//Функционал

function playSong() {
  player.classList.add("_playing");
  play.src = "./icons/player/player-pause.svg";
  audio.play();
}

play.addEventListener("click", () => {
  const playing = player.classList.contains("_playing");
  if (playing) {
    audio.pause();
    player.classList.remove("_playing");
    play.src = "./icons/player/player-play.svg";
  } else {
    playSong();
  }
});

next.addEventListener("click", () => {
  songIndex++;
  if (songIndex <= songTitles.length - 1) {
    loadSong(songTitles[songIndex]);
    playSong();
  } else {
    songIndex = 0;
    loadSong(songTitles[songIndex]);
    playSong();
  }
});

prev.addEventListener("click", () => {
  songIndex--;
  if (songIndex >= 0) {
    loadSong(songTitles[songIndex]);
    playSong();
  } else {
    songIndex = songTitles.length - 1;
    loadSong(songTitles[songIndex]);
    playSong();
  }
});

volIcon.onclick = function () {
  var coordinates = this.getBoundingClientRect();
  let volCase = document.getElementById("volCase");
  volCase.classList.toggle("volume__active");
  volCase.style.marginLeft = coordinates.left - 10 + "px";
};

//Авто плей
setInterval(() => {
  if (audio.duration - audio.currentTime == 0) {
    songIndex++;
    if (songIndex <= songTitles.length - 1) {
      loadSong(songTitles[songIndex]);
      playSong();
    } else {
      songIndex = 0;
      loadSong(songTitles[songIndex]);
      playSong();
    }
  }
}, 10000);

volume.addEventListener("change", () => {
  console.log(volume.value * 0.01);
  audio.volume = volume.value * 0.01;
});

//Функция перемотки

function updateProgress() {
  const {duration, currentTime} = audio;
  let progressPart = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPart}%`;
}
audio.addEventListener("timeupdate", updateProgress);

function setProgress(e) {
  let containerWidth = progressContainer.getBoundingClientRect().width;
  let clickX = e.offsetX;
  let duration = audio.duration;
  let num = (clickX / containerWidth) * duration;
  audio.currentTime = num;
}

progressContainer.addEventListener("click", setProgress);
