// ====================== CONFIGURATION VARIABLES (EDIT THESE) ======================
const CONFIG = {
  // Couple info
  groomName: "Anwar",
  brideName: "Soad",
  
  // Wedding details
  weddingDate: "Saturday, May 30, 2026",
  weddingTime: "8:00 PM",
  venueName: "Royal Plaza Hall",
  venueMapLink: "https://maps.app.goo.gl/3x5ee1JcdpoErC6X9?g_st=ic",
  imageUrl: "assets/images/couple.webp",
  musicUrl: "assets/music/music.mp3",
  romanticMessage: "We are waiting for you to celebrate with us",
  timerTargetDate: "May 30, 2026 20:00:00",
  
  // ========== SOCIAL MEDIA & CONTACT LINKS (EDIT THESE) ==========
  socialLinks: {
    whatsapp: "https://wa.me/201505646406",        // WhatsApp link (number with country code)
    phone: "tel:+201505646406",                     // Phone number (click to call)
    tiktok: "https://www.tiktok.com/@loventa68",     // TikTok profile link
    instagram: "https://www.instagram.com/love__nta", // Instagram profile
    facebook: "https://www.facebook.com/profile.php?id=61565289157594&mibextid=wwXIfr&rdid=LvOEQfQIXRkCukV0&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Ck7EUrzmW%2F%3Fmibextid%3DwwXIfr#",   // Facebook profile
    displayPhoneNumber: "+20 150 564 6406"          // Phone number shown in footer
  }
};

// DOM Elements
const hookScreen = document.getElementById("hookScreen");
const mainCard = document.getElementById("mainCard");
const tapBtn = document.getElementById("tapToOpenBtn");
const locationBtn = document.getElementById("locationBtn");
const bgMusic = document.getElementById("bgMusic");
const musicToggleDiv = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
const musicStatusSpan = document.getElementById("musicStatus");
const weddingImg = document.getElementById("weddingImage");

// Timer Elements
const daysSpan = document.getElementById("days");
const hoursSpan = document.getElementById("hours");
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");

// Social Elements
const whatsappLink = document.getElementById("whatsappLink");
const phoneLink = document.getElementById("phoneLink");
const tiktokLink = document.getElementById("tiktokLink");
const instagramLink = document.getElementById("instagramLink");
const facebookLink = document.getElementById("facebookLink");
const phoneNumberDisplaySpan = document.getElementById("phoneNumberText");

// Apply dynamic content from CONFIG
function applyDynamicContent() {
  // Update names
  const namesContainer = document.querySelector(".big-names");
  if (namesContainer) {
    namesContainer.innerHTML = `${CONFIG.groomName} <span class="heart-icon">❤️</span> ${CONFIG.brideName}`;
  }
  
  // Update date
  const dateValueDiv = document.querySelector(".date-value");
  if (dateValueDiv) {
    dateValueDiv.innerHTML = `<i class="fas fa-star-of-life"></i>  ${CONFIG.weddingDate}  <i class="fas fa-star-of-life"></i>`;
    const timeSpan = document.querySelector(".wedding-time-text");
    if (timeSpan) timeSpan.innerHTML = `at ${CONFIG.weddingTime} · sunset ceremony`;
  }
  
  // Update location
  const hallPlace = document.querySelector(".hall-place");
  if (hallPlace) hallPlace.innerHTML = `🌹 ${CONFIG.venueName} 🌹`;
  
  // Update message
  const msgParagraph = document.querySelector(".message-card p");
  if (msgParagraph) msgParagraph.innerHTML = `✨ "${CONFIG.romanticMessage}" ✨`;
  
  // Update image
  if (weddingImg) {
    weddingImg.src = CONFIG.imageUrl;
    weddingImg.alt = `${CONFIG.groomName} & ${CONFIG.brideName}`;
  }
  
  // Update music
  if (bgMusic) {
    bgMusic.src = CONFIG.musicUrl;
    bgMusic.load();
  }
  
  // Location button handler
  if (locationBtn) {
    locationBtn.onclick = (e) => {
      e.preventDefault();
      window.open(CONFIG.venueMapLink, "_blank");
      locationBtn.style.transform = "scale(0.96)";
      setTimeout(() => locationBtn.style.transform = "", 150);
    };
  }
  
  // ========== APPLY SOCIAL LINKS ==========
  if (whatsappLink) whatsappLink.href = CONFIG.socialLinks.whatsapp;
  if (phoneLink) phoneLink.href = CONFIG.socialLinks.phone;
  if (tiktokLink) tiktokLink.href = CONFIG.socialLinks.tiktok;
  if (instagramLink) instagramLink.href = CONFIG.socialLinks.instagram;
  if (facebookLink) facebookLink.href = CONFIG.socialLinks.facebook;
  if (phoneNumberDisplaySpan) phoneNumberDisplaySpan.innerText = CONFIG.socialLinks.displayPhoneNumber;
}

// Countdown Timer
let countdownInterval = null;

function startCountdown() {
  const targetDate = new Date(CONFIG.timerTargetDate).getTime();
  if (isNaN(targetDate)) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      if (daysSpan) daysSpan.innerText = "00";
      if (hoursSpan) hoursSpan.innerText = "00";
      if (minutesSpan) minutesSpan.innerText = "00";
      if (secondsSpan) secondsSpan.innerText = "00";
      if (countdownInterval) clearInterval(countdownInterval);
      const label = document.querySelector(".countdown-label");
      if (label) label.innerHTML = '<i class="fas fa-heart"></i> TODAY IS THE DAY! <i class="fas fa-heart"></i>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysSpan) daysSpan.innerText = days < 10 ? "0" + days : days;
    if (hoursSpan) hoursSpan.innerText = hours < 10 ? "0" + hours : hours;
    if (minutesSpan) minutesSpan.innerText = minutes < 10 ? "0" + minutes : minutes;
    if (secondsSpan) secondsSpan.innerText = seconds < 10 ? "0" + seconds : seconds;
  }

  updateTimer();
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(updateTimer, 1000);
}

// Music handling
let musicPlaying = false;
let musicStarted = false;

function enableMusic() {
  if (!musicStarted) {
    bgMusic.volume = 0.45;
    bgMusic.play().then(() => {
      musicPlaying = true;
      musicStarted = true;
      updateMusicUI(true);
    }).catch(() => {
      musicPlaying = false;
      updateMusicUI(false);
    });
  } else {
    if (musicPlaying) {
      bgMusic.pause();
      musicPlaying = false;
      updateMusicUI(false);
    } else {
      bgMusic.play().then(() => {
        musicPlaying = true;
        updateMusicUI(true);
      }).catch(() => {});
    }
  }
}

function updateMusicUI(isPlaying) {
  if (isPlaying) {
    musicIcon.className = "fas fa-volume-up";
    musicStatusSpan.innerText = "♥ Melody";
  } else {
    musicIcon.className = "fas fa-music";
    musicStatusSpan.innerText = "♫ muted";
  }
}

// Open invitation
function openInvitation() {
  hookScreen.classList.add("hidden");
  mainCard.classList.add("visible");
  enableMusic();
  startCountdown();
  
  const imgEl = document.querySelector(".wedding-img");
  if (imgEl) {
    imgEl.style.transform = "scale(1.02)";
    setTimeout(() => imgEl.style.transform = "", 400);
  }
}

// Event listeners
tapBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  tapBtn.style.transform = "scale(0.94)";
  setTimeout(() => tapBtn.style.transform = "", 150);
  openInvitation();
});

hookScreen.addEventListener("click", (e) => {
  if (!e.target.closest("#tapToOpenBtn")) {
    openInvitation();
  }
});

musicToggleDiv.addEventListener("click", (e) => {
  e.stopPropagation();
  enableMusic();
});

if (weddingImg) {
  weddingImg.addEventListener("click", () => {
    weddingImg.style.transform = "scale(1.03)";
    setTimeout(() => weddingImg.style.transform = "", 280);
  });
}

// Initialize
applyDynamicContent();
window.addEventListener("load", () => {
  mainCard.classList.remove("visible");
  bgMusic.volume = 0.4;
  if (daysSpan) daysSpan.innerText = "00";
  if (hoursSpan) hoursSpan.innerText = "00";
  if (minutesSpan) minutesSpan.innerText = "00";
  if (secondsSpan) secondsSpan.innerText = "00";
});