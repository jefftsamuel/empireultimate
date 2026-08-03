
if (window.EmpireData) {
  window.EmpireData.loadPlayers().then(({ players, live }) => {
    const grid = document.getElementById("profile-grid");
    const status = document.getElementById("roster-status");

    const cardPlayers = new Set([
      "ben-lahey",
      "benji-cooke",
      "charlie-mcknight",
      "chase-knowlton",
      "coby-martyn",
      "daniel-cooke",
      "david-oyekanmi",
      "devon-berglund",
      "euan-hague",
      "joseph-bonda",
      "kaden-terleski",
      "kai-lalonde",
      "kayden-weiss",
      "ryan-ansdell",
      "rylan-terleski",
      "samuel-oyekanmi",
      "siyong-shim"
    ]);

    const sorted = [...players].sort((a, b) => a.name.localeCompare(b.name));

    if (grid) {
      grid.innerHTML = sorted.map((player, index) => {
        const slug = window.EmpireData.slug(player.name);
        const image = cardPlayers.has(slug)
          ? `assets/images/players/${slug}.jpg`
          : "assets/images/players/placeholder.jpg";

        const previous = sorted[(index - 1 + sorted.length) % sorted.length];
        const next = sorted[(index + 1) % sorted.length];

        return `
          <article class="player-card player-media-card" id="${slug}">
            <div class="player-card-art">
              <img src="${image}" alt="${player.name} Empire player card">
            </div>

            <div class="player-card-body">
              <p class="section-label">Empire Ultimate</p>
              <h2>${player.name}</h2>

              <dl class="player-details">
                <div><dt>Position</dt><dd>Coming soon</dd></div>
                <div><dt>Hometown</dt><dd>Coming soon</dd></div>
              </dl>

              <p class="player-bio">Player bio coming soon.</p>

              <div class="mini-stats player-live-stats">
                <span><strong>${player.goals}</strong> Goals</span>
                <span><strong>${player.assists}</strong> Assists</span>
                <span><strong>${player.points}</strong> Points</span>
                <span><strong>${player.defenses}</strong> Defenses</span>
              </div>

              <nav class="player-card-nav" aria-label="Player profile navigation">
                <a href="#${window.EmpireData.slug(previous.name)}">← ${previous.name}</a>
                <a href="#${window.EmpireData.slug(next.name)}">${next.name} →</a>
              </nav>
            </div>
          </article>`;
      }).join("");
    }

    if (status) {
      status.textContent = live
        ? `${players.length} Empire players loaded live from Google Sheets.`
        : `${players.length} Empire players shown from the saved preview.`;
      status.classList.toggle("live", live);
    }
  });
}
