
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});


const contactModal = document.getElementById('contact-modal');
const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

document.querySelectorAll('[data-open-contact]').forEach(button => {
  button.addEventListener('click', () => {
    contactModal.classList.add('open');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

document.querySelectorAll('[data-close-contact]').forEach(button => {
  button.addEventListener('click', () => {
    contactModal.classList.remove('open');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  formNote.textContent = 'Thanks — the form layout works. Message delivery will be connected before launch.';
  formNote.style.color = '#ffffff';
  contactForm.reset();
});


if (window.EMPIRE_CONFIG && window.EmpireData) {
  window.EmpireData.loadPlayers().then(({ players, live }) => {
    const leadersGrid = document.getElementById("leaders-grid");
    const rosterList = document.getElementById("roster-list");
    const status = document.getElementById("stats-status");

    const categories = [
      ["Goals", "goals"],
      ["Assists", "assists"],
      ["Total Pts", "points"],
      ["PPG", "pointsPerGame"],
      ["Defenses", "defenses"]
    ];

    if (leadersGrid && players.length) {
      leadersGrid.innerHTML = categories
        .map(([label, key]) => {
          const leader = [...players].sort(
            (a, b) => b[key] - a[key] || a.name.localeCompare(b.name)
          )[0];

          return `
            <a class="leader-card" href="roster.html#${window.EmpireData.slug(leader.name)}">
              <span>${label}</span>
              <strong>${key === "pointsPerGame" ? leader[key].toFixed(2) : leader[key]}</strong>
              <h3>${leader.name}</h3>
            </a>`;
        })
        .join("");
    }

    if (rosterList) {
      rosterList.innerHTML = [...players]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(
          player => `
            <a href="roster.html#${window.EmpireData.slug(player.name)}">
              ${player.name}<span>View profile →</span>
            </a>`
        )
        .join("");
    }

    if (status) {
      status.textContent = live
        ? "Live from Google Sheets"
        : "Saved Empire stats preview";
      status.classList.toggle("live", live);
    }
  });
}
