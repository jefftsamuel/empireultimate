
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


// v3.1 curated player bios
window.EmpirePlayerBios = {
  "Ben Lahey": "Ben is a dynamic cutter and striker with a knack for making difficult plays look effortless. His smooth, one-handed catches are a trademark of his game, and when the disc is within reach, there’s a good chance Ben is coming down with it.",
  "Benji Cooke": "Benji is a relentless defender whose athleticism, intensity, and work ethic make him a difference-maker on the field. Whether shutting down an opponent or creating a big play for his team, he brings energy and competitiveness to every point.",
  "Charlie McKnight": "Charlie is a steady and composed handler with outstanding field vision. He has an ability to see plays develop before they happen, create opportunities for teammates, and keep the offense flowing with smart decisions behind the disc.",
  "Chase Knowlton": "Chase is a versatile player with the ability to contribute as both a handler and cutter. His awareness is particularly valuable against zone defenses, where he has a knack for finding gaps, creating opportunities, and keeping the offense moving when space is difficult to find.",
  "Coby Martyn": "Coby is one of Empire’s most versatile athletes, capable of stepping into virtually any role on the field. He combines athleticism and adaptability with an impressive vertical leap, making him especially dangerous when the disc goes up.",
  "Daniel Cooke": "Cookie plays with an intensity that makes him difficult to miss. Whether making a full-extension layout, coming up with a huge defensive block, or simply outworking the player across from him, he brings relentless energy to every point and isn’t afraid to leave it all on the field for his team.",
  "David Oyekanmi": "David combines speed, athleticism, and determination as a dangerous downfield cutter and defender. Whether chasing down a disc on offense or locking down an assignment on defense, he brings consistent energy and effort to every point.",
  "Devon Berglund": "Devon’s work ethic and willingness to learn set him apart. He is constantly looking for ways to improve, asking questions, responding to feedback, and putting what he learns into his game. That dedication and determination continue to make him a more confident and reliable player.",
  "Euan Hague": "Euan is a creative handler who isn’t afraid to try something new — including a scoober whenever the opportunity presents itself. His persistence is paying off, with growing confidence and an ability to find unconventional throwing lanes making him an increasingly dangerous playmaker.",
  "Joseph Bonda": "Joseph has a knack for finding the disc in the end zone. His timing, athleticism, and ability to elevate make him a difficult matchup for defenders, whether he’s creating separation with a well-timed cut or coming down with a contested disc in traffic.",
  "Kaden Terleski": "Kaden brings hard work and determination to both sides of the disc. As a cutter, he does a great job finding space and creating opportunities within the offense, while his energy and intensity on defense make life difficult for opposing players.",
  "Kai Lalonde": "Kai’s combination of size and game IQ makes him a difficult matchup as a cutter. His calm, thoughtful approach is one of his greatest strengths, allowing him to read the field, make intelligent decisions, and provide a composed presence within the offense.",
  "Kayden Weiss": "Kayden is a composed handler who excels at reading the field and making smart decisions with the disc. He is particularly effective against zone defenses, where his patience and awareness help find openings and keep the offense moving. He also brings a strong defensive presence and has a knack for producing important stops.",
  "Ryan Ansdell": "Ryan brings speed, energy, and effort every time he steps onto the field. His quickness and cutting ability make him a constant downfield threat, while his hustle and positive energy make an impact well beyond the plays that show up on the stat sheet.",
  "Rylan Terleski": "Rylan is a fast, determined cutter who brings intensity to every point. He works hard to create opportunities on offense and is equally relentless defensively, using his speed and effort to challenge opponents and generate important stops.",
  "Samuel Oyekanmi": "Samuel is a reliable cutter with a strong ability to find space and make himself available. His movement helps keep the offense flowing and consistently puts pressure on opposing defenses.",
  "Siyong Shim": "Siyong is a game-changing athlete whose speed impacts both sides of the disc. He creates opportunities downfield as a cutter, applies relentless defensive pressure, and possesses a powerful pull that can immediately put opponents in difficult field position."
};
