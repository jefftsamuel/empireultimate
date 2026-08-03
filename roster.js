
if (window.EmpireData) {
  window.EmpireData.loadPlayers().then(({ players, live }) => {
    const grid = document.getElementById("profile-grid");
    const status = document.getElementById("roster-status");
    const playerMeta = {"Ben Lahey": {"position": "Cutter", "hometown": "Vernon, BC"}, "Benji Cooke": {"position": "Handler", "hometown": "Vernon, BC"}, "Charlie McKnight": {"position": "Handler", "hometown": "Vernon, BC"}, "Chase Knowlton": {"position": "Handler", "hometown": "Summerland, BC"}, "Coby Martyn": {"position": "Cutter", "hometown": "Vernon, BC"}, "Daniel Cooke": {"position": "Cutter", "hometown": "Vernon, BC"}, "David Oyekanmi": {"position": "Striker", "hometown": "Vernon, BC"}, "Devon Berglund": {"position": "Cutter", "hometown": "Vernon, BC"}, "Dylan Gfeller": {"position": "Striker", "hometown": "Summerland, BC"}, "Emerson Mitchell": {"position": "Handler", "hometown": "Summerland, BC"}, "Euan Hague": {"position": "Handler", "hometown": "Vernon, BC"}, "Joseph Bonda": {"position": "Striker", "hometown": "Summerland, BC"}, "Kaden Terleski": {"position": "Cutter", "hometown": "Vernon, BC"}, "Kai Lalonde": {"position": "Cutter", "hometown": "Vernon, BC"}, "Kayden Weiss": {"position": "Cutter", "hometown": "Vernon, BC"}, "Leo Dollevoet": {"position": "Handler", "hometown": "Summerland, BC"}, "Ryan Ansdell": {"position": "Striker", "hometown": "Vernon, BC"}, "Rylan Terleski": {"position": "Striker", "hometown": "Vernon, BC"}, "Samuel Oyekanmi": {"position": "Cutter", "hometown": "Vernon, BC"}, "Siyong Shim": {"position": "Striker", "hometown": "Vernon, BC"}, "Landen Grimard-Newstead": {"position": "Striker", "hometown": "Oliver, BC"}};
    const cardPlayers = new Set(["ben-lahey", "benji-cooke", "charlie-mcknight", "chase-knowlton", "coby-martyn", "daniel-cooke", "david-oyekanmi", "devon-berglund", "euan-hague", "joseph-bonda", "kaden-terleski", "kai-lalonde", "kayden-weiss", "ryan-ansdell", "rylan-terleski", "samuel-oyekanmi", "siyong-shim"]);
    const sorted = [...players].sort((a, b) => a.name.localeCompare(b.name));

    if (grid) {
      grid.innerHTML = sorted.map(player => {
        const slug = window.EmpireData.slug(player.name);
        const meta = playerMeta[player.name] || {position:"Coming soon", hometown:"Coming soon"};
        const image = cardPlayers.has(slug)
          ? `assets/images/players/${slug}.jpg`
          : "assets/images/players/placeholder.jpg";

        return `
          <a class="quick-player-card" href="profile.html?player=${encodeURIComponent(slug)}">
            <div class="quick-player-art">
              <img src="${image}" alt="${player.name} Empire player card">
            </div>
            <div class="quick-player-body">
              <h2>${player.name}</h2>
              <div class="quick-player-meta">
                <span><small>Primary Position</small>${meta.position}</span>
                <span><small>Hometown</small>${meta.hometown}</span>
              </div>
              <div class="quick-player-stats">
                <span><strong>${player.goals}</strong>Goals</span>
                <span><strong>${player.assists}</strong>Assists</span>
                <span><strong>${player.points}</strong>Points</span>
                <span><strong>${player.defenses}</strong>Defenses</span>
              </div>
              <div class="quick-player-link">View full profile →</div>
            </div>
          </a>`;
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
