const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealElements.forEach(el => observer.observe(el));
}

const typedEl = document.getElementById('typed');
if (typedEl) {
  const words = [
    'Computer Science Student',
    'Aspiring Developer',
    'Problem Solver',
    'Continuous Learner',
  ];
  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function type() {
    const current = words[wordIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 55 : 90);
  }
  type();
}

const skillFills = document.querySelectorAll('.skill-fill');
if (skillFills.length) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const width = target.getAttribute('data-width') + '%';
          setTimeout(() => {
            target.style.width = width;
          }, 300);
          skillObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.3 }
  );
  skillFills.forEach(fill => skillObserver.observe(fill));
}


(function () {
  const currentPage = window.location.pathname.split('/').pop().toLowerCase();
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href').toLowerCase();
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();

const hamburger = document.querySelector('.nav-hamburger');
const navEl = document.getElementById('navbar');

if (hamburger && navEl) {
  hamburger.addEventListener('click', function () {
    navEl.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', navEl.classList.contains('nav-open'));
  });

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      navEl.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', function (e) {
    if (!navEl.contains(e.target)) {
      navEl.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navEl.classList.contains('nav-open')) {
      navEl.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.focus();
    }
  });
}
const sharePortfolioBtn = document.getElementById('sharePortfolioBtn');
const shareStatus = document.getElementById('shareStatus');

if (sharePortfolioBtn) {
  const portfolioUrl = 'https://eyoba2216-tech.github.io/portfolio/';

  sharePortfolioBtn.addEventListener('click', async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Eyob Berhanu — Portfolio',
          text: 'Check out my portfolio.',
          url: portfolioUrl
        });
        if (shareStatus) shareStatus.textContent = 'Portfolio shared.';
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(portfolioUrl);
        if (shareStatus) shareStatus.textContent = 'Portfolio link copied to your clipboard.';
        return;
      }

      window.prompt('Copy my portfolio link:', portfolioUrl);
    } catch (error) {
      if (error && error.name !== 'AbortError') {
        if (shareStatus) shareStatus.textContent = 'Sharing was not available on this device.';
      }
    }
  });
}
