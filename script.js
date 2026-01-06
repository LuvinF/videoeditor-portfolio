/* NAVBAR */
const menu = document.querySelector(".menu");
const navbar = document.querySelector(".navbar");
if (menu && navbar) menu.addEventListener("click", () => {
  menu.classList.toggle("change");
  navbar.classList.toggle("change");
});

/* FOOTER YEAR */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ABOUT VIDEO LAZY LOAD */
const aboutIframe = document.querySelector(".video");
const playBtn = document.querySelector(".play-btn");
const playIcon = document.querySelector(".play-btn i");

if (aboutIframe) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        aboutIframe.src = aboutIframe.dataset.src;
        obs.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(aboutIframe);
}

if (playBtn && aboutIframe) {
  playBtn.addEventListener("click", () => {
    playIframeVideo(aboutIframe, playIcon);
  });
}

function playIframeVideo(iframe, icon) {
  iframe.contentWindow.postMessage(JSON.stringify({
    event: "command",
    func: icon.classList.contains("fa-play-circle") ? "playVideo" : "pauseVideo"
  }), "*");
  icon.classList.toggle("fa-play-circle");
  icon.classList.toggle("fa-pause-circle");
}

/* EMAILJS */
function sanitizeInput(value) {
  return value.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")
              .replace(/'/g,"&#039;").replace(/javascript:/gi,"").replace(/onerror=/gi,"").replace(/onload=/gi,"");
}
if (typeof emailjs !== "undefined") emailjs.init("KI9rrTfJyUKRLqc08");

const contactForm = document.getElementById("contact-form");
if (contactForm && typeof emailjs !== "undefined") {
  contactForm.addEventListener("submit", function(e){
    e.preventDefault();
    this.from_name.value = sanitizeInput(this.from_name.value);
    this.from_email.value = sanitizeInput(this.from_email.value);
    this.message.value = sanitizeInput(this.message.value);
    emailjs.sendForm("service_er634gp","template_d8hzzvs",this,"KI9rrTfJyUKRLqc08")
      .then(()=>{ alert("Message sent!"); this.reset(); })
      .catch(()=>{ alert("Failed to send message."); });
  });
}

/* SWIPER LAZY INIT */
const swiperSection = document.querySelector(".videoSwiper");
if (swiperSection && typeof Swiper !== "undefined") {
  const swiperObs = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        new Swiper(".videoSwiper", {
          slidesPerView:1, spaceBetween:30, loop:true,
          pagination:{el:".swiper-pagination",clickable:true},
          navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},
          breakpoints:{1024:{slidesPerView:2}}
        });
        obs.disconnect();
      }
    });
  }, {threshold:0.2});
  swiperObs.observe(swiperSection);
}

/* VIDEO MODAL (EXPLORE) */
function openVideo(url){
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("modalIframe");
  if(!modal || !iframe) return;
  iframe.src = url+"?autoplay=1";
  modal.classList.add("show");
}
function closeVideo(){
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("modalIframe");
  if(!modal || !iframe) return;
  iframe.src = "";
  modal.classList.remove("show");
}

/* DISABLE DEV TOOLS */
document.addEventListener("contextmenu", e=>e.preventDefault());
document.addEventListener("keydown", e=>{
  if(e.key==="F12"||(e.ctrlKey&&e.shiftKey&&["I","J","C"].includes(e.key))||(e.ctrlKey&&e.key==="U")) e.preventDefault();
});
