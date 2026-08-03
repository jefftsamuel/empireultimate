
(function () {
  const config = window.EMPIRE_CONFIG || {};
  const fallback = Array.isArray(config.fallbackPlayers) ? config.fallbackPlayers : [];

  function slug(name) {
    return String(name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function cleanPlayers(players) {
    const excluded = new Set(["totals", "total", "empire ultimate"]);
    const seen = new Set();

    return players.filter(player => {
      const name = String(player.name || "").trim();
      const key = name.toLowerCase();

      if (!name || excluded.has(key) || seen.has(key)) return false;
      seen.add(key);
      player.name = name;
      return true;
    });
  }

  function parseGviz(text) {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start < 0 || end < 0) throw new Error("Unexpected Google Sheets response");

    const payload = JSON.parse(text.slice(start, end + 1));
    const rows = payload.table && payload.table.rows ? payload.table.rows : [];

    const players = rows.map(row => {
      const cells = row.c || [];
      const value = index =>
        cells[index] && cells[index].v != null ? cells[index].v : "";

      return {
        name: String(value(0)).trim(),
        assists: Number(value(1)) || 0,
        goals: Number(value(2)) || 0,
        points: Number(value(3)) || 0,
        defenses: Number(value(4)) || 0
      };
    });

    return cleanPlayers(players);
  }

  async function loadPlayers() {
    const sheet = encodeURIComponent(config.sheetName);
    const query = encodeURIComponent("select A,B,C,D,G where A is not null");
    const range = encodeURIComponent("A3:G1000");
    const url =
      `https://docs.google.com/spreadsheets/d/${config.spreadsheetId}` +
      `/gviz/tq?sheet=${sheet}&range=${range}&tqx=out:json&tq=${query}`;

    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to reach Google Sheets");

      const players = parseGviz(await response.text());
      if (!players.length) throw new Error("No player rows returned");

      return { players, live: true };
    } catch (error) {
      console.warn("Using embedded Empire roster preview:", error);
      return { players: cleanPlayers([...fallback]), live: false };
    }
  }

  window.EmpireData = { loadPlayers, slug };
})();
