const cur = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
});

(function tick() {
    if (cur && ring) {
        cur.style.left = `${mx}px`;
        cur.style.top = `${my}px`;

        rx += (mx - rx) * 0.11;
        ry += (my - ry) * 0.11;

        ring.style.left = `${rx}px`;
        ring.style.top = `${ry}px`;
    }
    requestAnimationFrame(tick);
})();

document.querySelectorAll('a, button, .work-item, .photo-thumb, .skill-card, .qual-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cur.classList.add('hov');
        ring.classList.add('hov');
    });
    el.addEventListener('mouseleave', () => {
        cur.classList.remove('hov');
        ring.classList.remove('hov');
    });
});

const preCount = document.getElementById('preCount');
const preBar = document.getElementById('preBar');
const preEl = document.getElementById('preloader');
const t0 = performance.now();
const DUR = 1900;

function runPre(now) {
    const p = Math.min((now - t0) / DUR, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = Math.floor(eased * 100);

    if (preCount) preCount.textContent = (v < 10 ? '0' : '') + v;
    if (preBar) preBar.style.width = (eased * 100) + '%';

    if (p < 1) {
        requestAnimationFrame(runPre);
    } else {
        setTimeout(() => {
            if (preEl) preEl.classList.add('done');
            document.body.classList.remove('loading');
        }, 360);
    }
}
requestAnimationFrame(runPre);

const navEl = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (navEl) {
        navEl.classList.toggle('scrolled', window.scrollY > 60);
    }
}, { passive: true });

document.body.classList.add('light')

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light');
    });
}

const revObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

const barObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            el.style.width = el.dataset.w + '%';
            el.classList.add('lit');
            barObs.unobserve(el);
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll('.skill-fill').forEach(el => barObs.observe(el));

document.querySelectorAll('.work-item').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 6;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 6;

        card.style.transition = 'transform 0.08s linear';
        card.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1)';
        card.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
});

const photoSec = document.getElementById('photoSection');
const photoStrip = document.getElementById('photoStrip');
const photoProgress = document.getElementById('photoProgress');
const photoCursorLb = document.getElementById('photoCursorLabel');

let photoTarget = 0;
let photoCurrent = 0;

if (photoSec && photoStrip && photoProgress && photoCursorLb) {
    photoSec.addEventListener('mousemove', e => {
        const rect = photoSec.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;

        photoCursorLb.style.left = relX + 'px';
        photoCursorLb.style.top = relY + 'px';

        const ratio = relX / rect.width;
        const maxScroll = photoStrip.scrollWidth - photoStrip.clientWidth;
        photoTarget = ratio * maxScroll;
    });

    photoSec.addEventListener('mouseleave', () => {
        photoCursorLb.style.opacity = '0';
    });

    photoSec.addEventListener('mouseenter', () => {
        photoCursorLb.style.opacity = '1';
    });

    (function photoTick() {
        const diff = photoTarget - photoCurrent;

        if (Math.abs(diff) > 0.25) {
            photoCurrent += diff * 0.075;
            photoStrip.scrollLeft = photoCurrent;

            const maxScroll = photoStrip.scrollWidth - photoStrip.clientWidth;
            const pct = maxScroll > 0 ? (photoCurrent / maxScroll) * 100 : 0;
            photoProgress.style.width = pct + '%';
        }

        requestAnimationFrame(photoTick);
    })();
}

const filterButtons = document.querySelectorAll('.filter-btn');
const worksSection = document.getElementById('works');
const illustrationSection = document.getElementById('illustrationSection');
const otherSection = document.getElementById('otherSection');

const photoBackBtn = document.getElementById('photoBackBtn');
const illustrationBackBtn = document.getElementById('illustrationBackBtn');
const otherBackBtn = document.getElementById('otherBackBtn');

function hideAllSections() {
    if (worksSection) worksSection.classList.add('is-hidden');
    if (photoSec) photoSec.classList.add('is-hidden');
    if (illustrationSection) illustrationSection.classList.add('is-hidden');
    if (otherSection) otherSection.classList.add('is-hidden');
}

function hideAllBackButtons() {
    if (photoBackBtn) photoBackBtn.classList.remove('show');
    if (illustrationBackBtn) illustrationBackBtn.classList.remove('show');
    if (otherBackBtn) otherBackBtn.classList.remove('show');
}

function setFilterState(filter) {
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    hideAllSections();
    hideAllBackButtons();

    if (filter === 'all') {
        if (worksSection) worksSection.classList.remove('is-hidden');
        if (photoSec) photoSec.classList.remove('is-hidden');
        if (illustrationSection) illustrationSection.classList.remove('is-hidden');
        if (otherSection) otherSection.classList.remove('is-hidden');
    }

    if (filter === 'website') {
        if (worksSection) worksSection.classList.remove('is-hidden');
    }

    if (filter === 'photo') {
        if (photoSec) photoSec.classList.remove('is-hidden');
        if (photoBackBtn) photoBackBtn.classList.add('show');
    }

    if (filter === 'illustration') {
        if (illustrationSection) illustrationSection.classList.remove('is-hidden');
        if (illustrationBackBtn) illustrationBackBtn.classList.add('show');
    }

    if (filter === 'other') {
        if (otherSection) otherSection.classList.remove('is-hidden');
        if (otherBackBtn) otherBackBtn.classList.add('show');
    }
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        setFilterState(btn.dataset.filter);
    });
});

if (photoBackBtn) {
    photoBackBtn.addEventListener('click', () => {
        setFilterState('all');
    });
}

if (illustrationBackBtn) {
    illustrationBackBtn.addEventListener('click', () => {
        setFilterState('all');
    });
}

if (otherBackBtn) {
    otherBackBtn.addEventListener('click', () => {
        setFilterState('all');
    });
}