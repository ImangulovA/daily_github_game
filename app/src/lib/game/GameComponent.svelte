<script>
  // ===========================================================================
  // EXAMPLE GAME — Lights Out 3x3. REPLACE this with your own puzzle UI.
  //
  // CONTRACT with the platform (see docs/GAME_CONTRACT.md):
  //   props in:
  //     puzzle  - the day's data from GAME.loadDay(dayIdx)
  //     dayIdx  - the day index being played
  //     saved   - the previously stored `state` blob (resume), or null
  //   callbacks out (props):
  //     onstart()          - call ONCE on the first real interaction
  //     onprogress(state)  - call whenever resumable state changes
  //     onfinish(result)   - call ONCE when the game is over; `result` is yours
  //                          (the platform attaches `ms` = active play time)
  // ===========================================================================
  import { press } from './data/days.js';

  let { puzzle, dayIdx, saved = null, onstart, onprogress, onfinish } = $props();

  // Resume from saved state if present, else start from the day's board.
  let board = $state(saved?.board ? saved.board.slice() : puzzle.board.slice());
  let moves = $state(saved?.moves ?? 0);
  let done = $state(false);
  let startedOnce = false;

  const allOff = (b) => b.every((on) => !on);

  function tap(cell) {
    if (done) return;
    if (!startedOnce) {
      startedOnce = true;
      onstart?.();
    }
    board = press(board, cell);
    moves += 1;
    onprogress?.({ board: board.slice(), moves });
    if (allOff(board)) {
      done = true;
      onfinish?.({ won: true, moves });
    }
  }
</script>

<div class="lights">
  <p class="hint">Tap a cell to flip it and its neighbours. Turn them all off.</p>
  <div class="grid" role="group" aria-label="Lights Out board">
    {#each board as on, i}
      <button
        class="cell"
        class:on
        aria-pressed={on}
        aria-label={`Cell ${i + 1} ${on ? 'on' : 'off'}`}
        onclick={() => tap(i)}
      ></button>
    {/each}
  </div>
  <p class="moves">Moves: <strong>{moves}</strong> <span class="par">(par {puzzle.par})</span></p>
</div>

<style>
  .lights {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }
  .hint {
    margin: 0;
    color: var(--muted);
    font-size: 15px;
    text-align: center;
    max-width: 28ch;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .cell {
    width: clamp(64px, 22vw, 92px);
    height: clamp(64px, 22vw, 92px);
    border: var(--border);
    border-radius: 10px;
    background: var(--surface-2);
    box-shadow: var(--shadow);
    cursor: pointer;
    transition: transform 0.05s ease, background 0.12s ease;
  }
  .cell:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }
  .cell.on {
    background: var(--accent);
  }
  .moves {
    margin: 0;
    font-family: var(--mono);
    font-size: 16px;
  }
  .par {
    color: var(--muted);
  }
</style>
