# Empire Ultimate Website v3.5 — Player Profile Fallback Fix

Includes everything from v3.4.

Fixes:
- profile.html now contains the full embedded Empire roster instead of an empty fallback.
- Player profile pages continue working if Google Sheets is slow, unavailable, or the live request fails.
- Landen Grimard-Newstead is included in the embedded fallback roster.
- Live Games Played (GP) and Points Per Game (PPG) remain unchanged.
- The live Google Sheet remains the primary source; the embedded roster is only a backup.
