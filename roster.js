
if (window.EmpireData) {
  window.EmpireData.loadPlayers().then(({ players, live }) => {
    const grid = document.getElementById("profile-grid");
    const status = document.getElementById("roster-status");

    if (grid) {
      grid.innerHTML = [...players]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(
          player => `
            <article class="player-card" id="${window.EmpireData.slug(player.name)}">
              <div class="player-photo-placeholder">
                <img src="assets/images/empire-helmet-transparent.png" alt="">
                <span>Player photo coming soon</span>
              </div>
              <div class="player-card-body">
                <p class="section-label">Empire Ultimate</p>
                <h2>${player.name}</h2>
                <dl class="player-details">
                  <div><dt>Position</dt><dd>Coming soon</dd></div>
                  <div><dt>Hometown</dt><dd>Coming soon</dd></div>
                </dl>
                <p class="player-bio">Player bio coming soon.</p>
                <div class="mini-stats">
                  <span><strong>${player.goals}</strong> Goals</span>
                  <span><strong>${player.assists}</strong> Assists</span>
                  <span><strong>${player.points}</strong> Points</span>
                  <span><strong>${player.defenses}</strong> Defenses</span>
                </div>
              </div>
            </article>`
        )
        .join("");
    }

    if (status) {
      status.textContent = live
        ? `${players.length} Empire players loaded live from Google Sheets.`
        : `${players.length} Empire players shown from the saved preview.`;
      status.classList.toggle("live", live);
    }
  });
}
