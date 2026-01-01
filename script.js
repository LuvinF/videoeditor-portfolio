/* NAVBAR */
const menu = document.querySelector(".menu");
const navbar = document.querySelector(".navbar");

menu.addEventListener("click", () => {
  menu.classList.toggle("change");
  navbar.classList.toggle("change");
});

/* ABOUT VIDEO */
const video = document.querySelector(".video");
const playBtn = document.querySelector(".play-btn i");
const videoBar = document.querySelector(".video-bar");

document.querySelector(".play-btn").addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playBtn.className = "far fa-pause-circle";
  } else {
    video.pause();
    playBtn.className = "far fa-play-circle";
  }
});

video.addEventListener("timeupdate", () => {
  videoBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
});

/* EMAILJS */
(function () {
  emailjs.init("KI9rrTfJyUKRLqc08");
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_er634gp",
    "template_d8hzzvs",
    this,
    "KI9rrTfJyUKRLqc08"
  )
  .then(() => {
    alert("Message sent successfully!");
    this.reset();
  })
  .catch((error) => {
    console.error(error);
    alert("Failed to send message.");
  });
});

/* VIDEO SWIPER */
const videoSwiper = new Swiper(".videoSwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    1024: { slidesPerView: 2 },
  },

  on: {
    slideChangeTransitionStart: pauseAllVideos,
  },
});

function pauseAllVideos() {
  document.querySelectorAll(".videoSwiper iframe").forEach((iframe) => {
    iframe.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
  });
}
