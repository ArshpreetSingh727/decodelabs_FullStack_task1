
  // Sticky shadow
  const hdr = document.getElementById('site-header');
  window.addEventListener('scroll', () => hdr.classList.toggle('scrolled', scrollY > 10), {passive:true});

  // Nav toggle
  const tog = document.getElementById('nav-toggle');
  const nl  = document.getElementById('nav-links');
  tog.addEventListener('click', () => {
    const open = tog.getAttribute('aria-expanded') === 'true';
    tog.setAttribute('aria-expanded', String(!open));
    nl.classList.toggle('open', !open);
  });
  nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    tog.setAttribute('aria-expanded','false'); nl.classList.remove('open');
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nl.classList.contains('open')) {
      tog.setAttribute('aria-expanded','false'); nl.classList.remove('open'); tog.focus();
    }
  });

  // Stat counters
  const counters = document.querySelectorAll('.stat-n');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const raw = el.textContent.trim();
      const num = parseFloat(raw.replace(/[^0-9.]/g,''));
      const suffix = raw.replace(/[0-9.]/g,'');
      let start; const dur = 1400;
      const step = ts => {
        if (!start) start = ts;
        const p = Math.min((ts - start)/dur, 1);
        const v = 1 - Math.pow(1 - p, 3);
        el.textContent = (num < 10 ? Math.round(v*num*10)/10 : Math.round(v*num)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, {threshold:0.6});
  counters.forEach(c => io.observe(c));

  // Contact form
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type=submit]');
    btn.textContent = 'Sending…'; btn.disabled = true;
    setTimeout(() => {
      document.getElementById('form-success').classList.add('show');
      this.reset(); btn.textContent = 'Send Enquiry →'; btn.disabled = false;
      document.getElementById('form-success').focus();
    }, 900);
  });