const birthdayDate = new Date("2026-08-21T00:00:00");

const giftButton = document.getElementById("giftButton");

const previewMode = 
  new URLSearchParams(window.location.search).get("preview") === "1";
const messageSection = document.getElementById("messageSection");
const typedMessage = document.getElementById("typedMessage");
const finalMessage = document.getElementById("finalMessage");
const pageTwo = document.getElementById("pageTwo");
const videoButton = document.getElementById("videoButton");
const videoWrapper = document.getElementById("videoWrapper");
const birthdayVideo = document.getElementById("birthdayVideo");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const statusEl = document.getElementById("status");

const musicButton = document.getElementById("musicButton");
const audio = document.getElementById("birthdayAudio");

let opened = false;


/* =========================
   STARS
========================= */

const starsContainer = document.getElementById("stars");

for (let i = 0; i < 45; i++) {
  const star = document.createElement("span");

  star.className = "star";
  star.textContent = Math.random() > 0.5 ? "✦" : "·";

  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.fontSize = Math.random() * 8 + 5 + "px";
  star.style.animationDelay = Math.random() * 4 + "s";
  star.style.animationDuration =
    Math.random() * 3 + 2 + "s";

  starsContainer.appendChild(star);
}


/* =========================
   COUNTDOWN
========================= */

function pad(number) {
  return String(number).padStart(2, "0");
}

function updateCountdown() {

  const now = new Date();
  const difference = birthdayDate - now;

  // PREVIEW MODE
  if (previewMode) {

    statusEl.textContent = "👀 Preview mode";

    giftButton.disabled = false;
    giftButton.classList.add("ready");

    return;
  }

  // COUNTDOWN SELESAI
  if (difference <= 0) {

    statusEl.textContent =
      "🎉 Hari ini hari spesialnya!";

    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";

    giftButton.disabled = false;
    giftButton.classList.add("ready");

    return;
  }

  // COUNTDOWN MASIH BERJALAN
  const days = Math.floor(
    difference / 86400000
  );

  const hours = Math.floor(
    (difference / 3600000) % 24
  );

  const minutes = Math.floor(
    (difference / 60000) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);

  statusEl.textContent =
  "Menuju hari spesial...";

// Tombol hanya terkunci jika bukan preview
giftButton.disabled = !previewMode;

if (previewMode) {
  giftButton.classList.add("ready");
} else {
  giftButton.classList.remove("ready");
}
}

updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================
   MESSAGE
========================= */

const message = `Selamat ulang tahun ke-24, Ananda! 🎉

Semoga di umur yang baru ini, semakin banyak hal baik yang datang dalam hidupmu.

Semoga selalu diberikan kesehatan, kebahagiaan, rezeki yang lancar, dan kekuatan untuk melewati setiap proses yang sedang dijalani.

Tidak semua hari harus sempurna. Yang penting, selalu ada alasan kecil untuk tetap bersyukur, tertawa, dan melangkah lagi.

Semoga semua target yang sedang dikejar satu per satu bisa tercapai. Kalau belum tercapai tahun ini, tidak apa-apa. Masih ada banyak waktu untuk terus mencoba.

Nikmati perjalananmu, kumpulkan pengalaman sebanyak-banyaknya, dan jangan lupa menikmati momen-momen kecil di sepanjang jalan.

Semoga tahun ini membawa lebih banyak cerita seru, kejutan menyenangkan, kesempatan baru, dan tentunya banyak kebahagiaan.

Sekali lagi, Happy Birthday, Ananda Gustia! 🎂✨`;


/* =========================
   TYPEWRITER
========================= */

function typeMessage() {

  typedMessage.textContent = "";

  finalMessage.classList.remove("show");

  let index = 0;

  function type() {

    if (index >= message.length) {

      typedMessage.classList.add("done");

      setTimeout(() => {

        finalMessage.classList.add("show");

        // Setelah pesan selesai dibaca, buka halaman kedua.
        setTimeout(() => {
          pageTwo.classList.add("show");
          pageTwo.setAttribute("aria-hidden", "false");
        }, 1500);

      }, 700);

      return;
    }

    const character = message[index];

    typedMessage.textContent += character;

    index++;

    let delay = 25;

    if (character === ".") {
      delay = 180;
    }

    if (character === ",") {
      delay = 70;
    }

    if (character === "\n") {
      delay = 450;
    }

    setTimeout(type, delay);
  }

  type();
}


/* =========================
   OPEN BUTTON
========================= */

giftButton.addEventListener("click", function () {

  if (opened) return;

  opened = true;

  giftButton.disabled = true;

  messageSection.classList.add("show");

  createConfetti();

  typeMessage();

  playMusic();

  setTimeout(() => {

    messageSection.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }, 300);

});


/* =========================
   PAGE TWO / VIDEO
========================= */

videoButton.addEventListener("click", function () {

  // Hentikan musik dari halaman pertama.
  audio.pause();
  audio.currentTime = 0;
  musicButton.classList.remove("playing");

  videoWrapper.classList.add("show");

  birthdayVideo.play().catch(() => {
    console.log("Video menunggu interaksi pengguna.");
  });

  setTimeout(() => {
    videoWrapper.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 200);

});


/* =========================
   MUSIC
========================= */

function playMusic() {

  audio.volume = 0.45;

  audio.play()
    .then(() => {

      musicButton.classList.add("playing");

    })
    .catch(() => {

      console.log(
        "Browser menunggu interaksi pengguna untuk memutar musik."
      );

    });
}


musicButton.addEventListener("click", function () {

  if (audio.paused) {

    audio.play()
      .then(() => {
        musicButton.classList.add("playing");
      })
      .catch(() => {});

  } else {

    audio.pause();

    musicButton.classList.remove("playing");

  }

});


/* =========================
   SIMPLE HTML CONFETTI
========================= */

function createConfetti() {

  const container =
    document.createElement("div");

  container.className = "confetti-container";

  document.body.appendChild(container);

  const symbols = [
    "✦",
    "✧",
    "•",
    "◆",
    "★"
  ];

  for (let i = 0; i < 80; i++) {

    const piece =
      document.createElement("span");

    piece.className = "confetti-piece";

    piece.textContent =
      symbols[
        Math.floor(
          Math.random() * symbols.length
        )
      ];

    piece.style.left =
      Math.random() * 100 + "vw";

    piece.style.top =
      -Math.random() * 20 + "vh";

    piece.style.fontSize =
      Math.random() * 12 + 8 + "px";

    piece.style.animationDuration =
      Math.random() * 2 + 2 + "s";

    piece.style.animationDelay =
      Math.random() * .7 + "s";

    container.appendChild(piece);
  }

  setTimeout(() => {
    container.remove();
  }, 5000);
}
