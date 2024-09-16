const audio = new Audio();
const playlist = document.getElementById("playlist");
const tracks = playlist.getElementsByTagName("li");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const volume = document.getElementById("volume");
const songStatus = document.getElementById("songStatus");

let currentIndex = 0;

const loadTrack = (index) => {
  audio.src = tracks[index].getAttribute("data-src");
};

const playTrack = () => {
  audio.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
};

const pauseTrack = () => {
  audio.pause();
  pauseBtn.classList.add("hide");
  playBtn.classList.remove("hide");
};

const nextTrack = () => {
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack(currentIndex);
  playTrack();
};

const prevTrack = () => {
  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentIndex);
  playTrack();
};

Array.from(tracks).forEach((item, index) => {
  item.addEventListener("click", () => {
    currentIndex = index;
    loadTrack(currentIndex);
    playTrack();
  });
});

loadTrack(currentIndex);

const updateVolume = () => {
  audio.volume = volume.value;
};

audio.addEventListener("timeupdate", () => {
  const songProgress = (audio.currentTime / audio.duration) * 100;

  songStatus.style.width = songProgress + "%";
});
