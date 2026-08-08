
if (window.EmpireData) {
  window.EmpireData.loadPlayers().then(({ players, live }) => {
    const grid = document.getElementById("profile-grid");
    const status = document.getElementById("roster-status");
    const playerMeta = {"Ben Lahey": {"position": "Cutter", "hometown": "Vernon, BC"}, "Benji Cooke": {"position": "Handler", "hometown": "Vernon, BC"}, "Charlie McKnight": {"position": "Handler", "hometown": "Vernon, BC"}, "Chase Knowlton": {"position": "Handler", "hometown": "Summerland, BC"}, "Coby Martyn": {"position": "Cutter", "hometown": "Vernon, BC"}, "Daniel Cooke": {"position": "Cutter", "hometown": "Vernon, BC"}, "David Oyekanmi": {"position": "Striker", "hometown": "Vernon, BC"}, "Devon Berglund": {"position": "Cutter", "hometown": "Vernon, BC"}, "Dylan Gfeller": {"position": "Striker", "hometown": "Summerland, BC"}, "Emerson Mitchell": {"position": "Handler", "hometown": "Summerland, BC"}, "Euan Hague": {"position": "Handler", "hometown": "Vernon, BC"}, "Joseph Bonda": {"position": "Striker", "hometown": "Summerland, BC"}, "Kaden Terleski": {"position": "Cutter", "hometown": "Vernon, BC"}, "Kai Lalonde": {"position": "Cutter", "hometown": "Vernon, BC"}, "Kayden Weiss": {"position": "Handler", "hometown": "Vernon, BC"}, "Leo Dollevoet": {"position": "Handler", "hometown": "Summerland, BC"}, "Ryan Ansdell": {"position": "Striker", "hometown": "Vernon, BC"}, "Rylan Terleski": {"position": "Striker", "hometown": "Vernon, BC"}, "Samuel Oyekanmi": {"position": "Cutter", "hometown": "Vernon, BC"}, "Siyong Shim": {"position": "Striker", "hometown": "Vernon, BC"}, "Landen Grimard-Newstead": {"position": "Striker", "hometown": "Oliver, BC"}};
    const cardPlayers = new Set(["ben-lahey", "benji-cooke", "charlie-mcknight", "chase-knowlton", "coby-martyn", "daniel-cooke", "david-oyekanmi", "devon-berglund", "euan-hague", "joseph-bonda", "kaden-terleski", "kai-lalonde", "kayden-weiss", "ryan-ansdell", "rylan-terleski", "samuel-oyekanmi", "siyong-shim"]);
    const sorted = [...players].sort((a, b) => a.name.localeCompare(b.name));

    if (grid) {
      grid.innerHTML = sorted.map(player => {
        const slug = window.EmpireData.slug(player.name);
        const meta = playerMeta[player.name] || {position:"Coming soon", hometown:"Coming soon"};
        const image = cardPlayers.has(slug)
          ? `assets/images/players/${slug}.jpg`
          : "assets/images/players/placeholder.jpg";

        const placeholderName = cardPlayers.has(slug)
          ? ""
          : `<span class="placeholder-player-name">${player.name}</span>`;

        return `
          <a class="roster-tile" href="profile.html?player=${encodeURIComponent(slug)}"
             aria-label="View ${player.name} profile">
            <img src="${image}" alt="${player.name} Empire player card">
            ${placeholderName}
            <span class="roster-tile-overlay">
              <span class="overlay-position">${meta.position}</span>
              <span class="overlay-location">${meta.hometown}</span>
              <span class="overlay-link">View Profile →</span>
            </span>
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
