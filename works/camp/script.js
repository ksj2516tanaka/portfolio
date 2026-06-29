// GSAPプラグインの有効化
gsap.registerPlugin(ScrollTrigger);

// ==================================
// 01. LOADER ANIMATION
// ==================================
window.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline();

  // ロード画面タイトルのフェードイン
  tl.fromTo(".loader h1", 
    { opacity: 0, y: 30 }, 
    { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
  );

  // タイトルのフェードアウト
  tl.to(".loader h1", {
    opacity: 0,
    y: -30,
    duration: 0.8,
    ease: "power3.in",
    delay: 0.6
  });

  // ローダー幕の引き上げ
  tl.to(".loader", {
    yPercent: -100,
    duration: 1,
    ease: "power4.inOut"
  });

  // メイン画面（HEROなど）の時間差フェードイン
  tl.fromTo(".header", 
    { opacity: 0, y: -20 }, 
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    "-=0.4"
  );

  tl.fromTo(".hero-image", 
    { scale: 1.2 }, 
    { scale: 1.1, duration: 2, ease: "power2.out" },
    "-=1.4"
  );

  tl.fromTo(".hero-content > *", 
    { opacity: 0, y: 40 }, 
    { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" },
    "-=1.2"
  );
});

// ==================================
// 02. HEADER BACKGROUND CONTROLLER
// ==================================
const header = document.querySelector(".header");
ScrollTrigger.create({
  start: "top -60px",
  onToggle: (self) => {
    if (self.isActive) {
      header.style.background = "rgba(21, 19, 15, 0.85)";
      header.style.backdropFilter = "blur(12px)";
      header.style.padding = "20px 6%";
    } else {
      header.style.background = "transparent";
      header.style.backdropFilter = "none";
      header.style.padding = "34px 6%";
    }
  }
});

// ==================================
// 03. HORIZONTAL SCROLL (STAY SECTION)
// ==================================
const horizontalSection = document.querySelector(".horizontal-section");
const horizontalTrack = document.querySelector(".horizontal-track");

if (horizontalSection && horizontalTrack) {
  gsap.to(horizontalTrack, {
    x: () => -(horizontalTrack.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: horizontalSection,
      pin: true,
      scrub: 1,
      start: "top top",
      end: () => `+=${horizontalTrack.scrollWidth - window.innerWidth}`,
      invalidateOnRefresh: true
    }
  });
}

// ==================================
// 04. SCROLL FADE-IN EFFECT
// ==================================
const fadeElements = gsap.utils.toArray(".concept-content, .cinema-content, .experience, .founder, .journal, .access-content");

fadeElements.forEach((element) => {
  gsap.fromTo(element,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
});