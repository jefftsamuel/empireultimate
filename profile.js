
const playerMeta = {"Ben Lahey": {"position": "Cutter", "hometown": "Vernon, BC"}, "Benji Cooke": {"position": "Handler", "hometown": "Vernon, BC"}, "Charlie McKnight": {"position": "Handler", "hometown": "Vernon, BC"}, "Chase Knowlton": {"position": "Handler", "hometown": "Summerland, BC"}, "Coby Martyn": {"position": "Cutter", "hometown": "Vernon, BC"}, "Daniel Cooke": {"position": "Cutter", "hometown": "Vernon, BC"}, "David Oyekanmi": {"position": "Striker", "hometown": "Vernon, BC"}, "Devon Berglund": {"position": "Cutter", "hometown": "Vernon, BC"}, "Dylan Gfeller": {"position": "Striker", "hometown": "Summerland, BC"}, "Emerson Mitchell": {"position": "Handler", "hometown": "Summerland, BC"}, "Euan Hague": {"position": "Handler", "hometown": "Vernon, BC"}, "Joseph Bonda": {"position": "Striker", "hometown": "Summerland, BC"}, "Kaden Terleski": {"position": "Cutter", "hometown": "Vernon, BC"}, "Kai Lalonde": {"position": "Cutter", "hometown": "Vernon, BC"}, "Kayden Weiss": {"position": "Handler", "hometown": "Vernon, BC"}, "Leo Dollevoet": {"position": "Handler", "hometown": "Summerland, BC"}, "Ryan Ansdell": {"position": "Striker", "hometown": "Vernon, BC"}, "Rylan Terleski": {"position": "Striker", "hometown": "Vernon, BC"}, "Samuel Oyekanmi": {"position": "Cutter", "hometown": "Vernon, BC"}, "Siyong Shim": {"position": "Striker", "hometown": "Vernon, BC"}, "Landen Grimard-Newstead": {"position": "Striker", "hometown": "Oliver, BC"}};
const cardPlayers = new Set(["ben-lahey", "benji-cooke", "charlie-mcknight", "chase-knowlton", "coby-martyn", "daniel-cooke", "david-oyekanmi", "devon-berglund", "euan-hague", "joseph-bonda", "kaden-terleski", "kai-lalonde", "kayden-weiss", "ryan-ansdell", "rylan-terleski", "samuel-oyekanmi", "siyong-shim"]);

window.EmpireData.loadPlayers().then(({players}) => {
  const slug = new URLSearchParams(window.location.search).get("player");
  const player = players.find(p => window.EmpireData.slug(p.name) === slug);
  const container = document.getElementById("individual-profile");

  if (!player) {
    container.innerHTML = "<h1>Player not found</h1><p>This player may not yet be available in the roster.</p>";
    return;
  }

  const meta = playerMeta[player.name] || {position:"Coming soon", hometown:"Coming soon"};
  const image = cardPlayers.has(slug)
    ? `assets/images/players/${slug}.jpg`
    : "assets/images/players/placeholder.jpg";

  const displayName = player.name === "Daniel Cooke" ? 'Daniel "Cookie" Cooke' : player.name;
  const nameClass = displayName.length >= 22 ? "profile-name-very-long" : displayName.length >= 18 ? "profile-name-long" : "";
  const bio = (window.EmpirePlayerBios && window.EmpirePlayerBios[player.name]) || "Player profile coming soon.";

  // Determine 2026 leaders automatically from the same loaded stats.
  // PPG excludes players with zero games played.
  const leaderCategories = [
    { key: "goals", label: "Goals", eligible: p => true },
    { key: "assists", label: "Assists", eligible: p => true },
    { key: "points", label: "Total Pts", eligible: p => true },
    { key: "pointsPerGame", label: "PPG", eligible: p => p.gamesPlayed > 0 },
    { key: "defenses", label: "Defenses", eligible: p => true }
  ];
  const leaderLabels = leaderCategories
    .filter(category => {
      const eligiblePlayers = players.filter(category.eligible);
      if (!eligiblePlayers.length) return false;
      const high = Math.max(...eligiblePlayers.map(p => Number(p[category.key]) || 0));
      return category.eligible(player) && (Number(player[category.key]) || 0) === high && high > 0;
    })
    .map(category => category.label);

  const statLeaderBadge = leaderLabels.length
    ? `<div class="stat-leader-badge" aria-label="2026 stat leader: ${leaderLabels.join(", ")}">
         <span class="stat-leader-mark">★</span>
         <span class="stat-leader-copy"><strong>Stat Leader</strong><small>${leaderLabels.join(" · ")}</small></span>
       </div>`
    : "";

  document.title = `${displayName} | Empire Ultimate`;

  container.innerHTML = `
    <article class="individual-profile">
      <div class="individual-profile-art">
        <img src="${image}" alt="${player.name} Empire player card">
      </div>
      <div class="individual-profile-content">
        <div class="profile-heading-row"><p class="section-label">Player Profile</p></div>
        <h1 class="${nameClass}">${displayName}</h1>
        <dl class="player-details">
          <div><dt>Primary Position</dt><dd>${meta.position}</dd></div>
          <div><dt>Hometown</dt><dd>${meta.hometown}</dd></div>
        </dl>
        <div class="profile-bio-block">
          <h2>About ${player.name.split(" ")[0]}</h2>
          <p>${bio}</p>
        </div>
        ${statLeaderBadge}
        <div class="quick-player-stats expanded-stats profile-stat-line">
          <span><strong>${player.gamesPlayed}</strong>GP</span>
          <span><strong>${player.goals}</strong>Goals</span>
          <span><strong>${player.assists}</strong>Assists</span>
          <span><strong>${player.points}</strong>Total Pts</span>
          <span><strong>${player.pointsPerGame.toFixed(2)}</strong>PPG</span>
          <span><strong>${player.defenses}</strong>Defenses</span>
        </div>
      </div>
    </article>`;
});
