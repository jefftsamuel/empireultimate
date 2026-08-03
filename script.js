
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
\nif(window.EMPIRE_CONFIG&&window.EmpireData){window.EmpireData.loadPlayers().then(({players,live})=>{const lg=document.getElementById("leaders-grid"),rl=document.getElementById("roster-list"),st=document.getElementById("stats-status");const cats=[["Goals","goals"],["Assists","assists"],["Points","points"],["Defenses","defenses"]];if(lg)lg.innerHTML=cats.map(([l,k])=>{const p=[...players].sort((a,b)=>b[k]-a[k]||a.name.localeCompare(b.name))[0];return `<a class="leader-card" href="roster.html#${window.EmpireData.slug(p.name)}"><span>${l}</span><strong>${p[k]}</strong><h3>${p.name}</h3></a>`}).join("");if(rl)rl.innerHTML=[...players].sort((a,b)=>a.name.localeCompare(b.name)).map(p=>`<a href="roster.html#${window.EmpireData.slug(p.name)}">${p.name}<span>View profile →</span></a>`).join("");if(st){st.textContent=live?"Live from Google Sheets":"Showing saved stats preview";if(live)st.classList.add("live")}})}