import { onCleanup, onMount } from "solid-js";

type CellOffset = readonly [number, number];

const PATTERNS = {
  lightweightSpaceship: [
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [0, 1],
    [4, 1],
    [4, 2],
    [0, 3],
    [3, 3],
  ],
} as const satisfies Record<string, readonly CellOffset[]>;

export default function Background() {
  let canvasRef!: HTMLCanvasElement;

  onMount(() => {
    const canvas = canvasRef;
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let cell = 0;
    let columns = 0;
    let rows = 0;
    let grid = new Uint8Array(0);
    let nextGrid = new Uint8Array(0);
    let animationFrame = 0;
    let lastFrameTime = 0;
    let generation = 0;
    let stagnantGenerations = 0;
    let isVisible = !document.hidden;
    const frameInterval = 1000 / 7;

    const getIndex = (column: number, row: number) => row * columns + column;

    const wrap = (value: number, max: number) => {
      if (value < 0) {
        return max - 1;
      }

      if (value >= max) {
        return 0;
      }

      return value;
    };

    const clearGrid = () => {
      grid.fill(0);
      nextGrid.fill(0);
    };

    const stampPattern = (
      pattern: readonly CellOffset[],
      originColumn: number,
      originRow: number
    ) => {
      for (const [columnOffset, rowOffset] of pattern) {
        const column = wrap(originColumn + columnOffset, columns);
        const row = wrap(originRow + rowOffset, rows);
        grid[getIndex(column, row)] = 1;
      }
    };

    const loadPreset = () => {
      clearGrid();
      const pattern = PATTERNS.lightweightSpaceship;
      const patternWidth = Math.max(...pattern.map(([column]) => column)) + 1;
      const patternHeight = Math.max(...pattern.map(([, row]) => row)) + 1;
      const maxColumnStart = Math.max(0, columns - patternWidth);

      for (let originRow = 0; originRow <= rows - patternHeight; originRow += 1) {
        const originColumn =
          maxColumnStart === 0 ? 0 : (originRow * (patternWidth + 2)) % (maxColumnStart + 1);

        stampPattern(pattern, originColumn, originRow);
      }

      generation = 0;
      stagnantGenerations = 0;
    };

    const buildWorld = () => {
      columns = Math.max(1, Math.ceil(width / cell));
      rows = Math.max(1, Math.ceil(height / cell));
      grid = new Uint8Array(columns * rows);
      nextGrid = new Uint8Array(columns * rows);
      loadPreset();
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      cell = width < 768 ? 14 : 18;
      buildWorld();
      draw();
    };

    const isInteractiveTarget = (target: EventTarget | null) =>
      target instanceof Element &&
      Boolean(target.closest("a, button, input, textarea, select, summary, label"));

    const reviveCell = (clientX: number, clientY: number) => {
      const column = Math.floor(clientX / cell);
      const row = Math.floor(clientY / cell);

      if (column < 0 || column >= columns || row < 0 || row >= rows) {
        return;
      }

      grid[getIndex(column, row)] = 1;
      stagnantGenerations = 0;
      draw();
    };

    const countNeighbors = (column: number, row: number) => {
      let neighbors = 0;

      for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
        for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
          if (columnOffset === 0 && rowOffset === 0) {
            continue;
          }

          const wrappedColumn = wrap(column + columnOffset, columns);
          const wrappedRow = wrap(row + rowOffset, rows);
          neighbors += grid[getIndex(wrappedColumn, wrappedRow)];
        }
      }

      return neighbors;
    };

    const step = () => {
      let changedCells = 0;
      let aliveCells = 0;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const index = getIndex(column, row);
          const cellIsAlive = grid[index];
          const neighbors = countNeighbors(column, row);
          const nextIsAlive =
            neighbors === 3 || (cellIsAlive === 1 && neighbors === 2) ? 1 : 0;

          nextGrid[index] = nextIsAlive;
          aliveCells += nextIsAlive;

          if (nextIsAlive !== cellIsAlive) {
            changedCells += 1;
          }
        }
      }

      [grid, nextGrid] = [nextGrid, grid];
      generation += 1;
      stagnantGenerations = changedCells === 0 ? stagnantGenerations + 1 : 0;

      if (
        aliveCells === 0 ||
        aliveCells > grid.length * 0.52 ||
        stagnantGenerations > 8 ||
        generation > 320
      ) {
        loadPreset();
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const styles = getComputedStyle(document.documentElement);
      const cellColor = styles.getPropertyValue("--life-cell").trim() || "52, 88, 114";

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const index = getIndex(column, row);

          if (grid[index] === 0) {
            continue;
          }

          const x = column * cell;
          const y = row * cell;
          const parity = (row + column + generation) % 4;
          const alpha = 0 + parity * 0.015;

          context.fillStyle = `rgba(${cellColor}, ${alpha})`;
          context.fillRect(x + 1, y + 1, cell - 2, cell - 2);
        }
      }
    };

    const tick = (frameTime: number) => {
      if (!isVisible) {
        animationFrame = window.requestAnimationFrame(tick);
        return;
      }

      if (frameTime - lastFrameTime < frameInterval) {
        animationFrame = window.requestAnimationFrame(tick);
        return;
      }

      lastFrameTime = frameTime;
      step();
      draw();
      animationFrame = window.requestAnimationFrame(tick);
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      lastFrameTime = 0;
    };

    const handleClick = (event: MouseEvent) => {
      if (isInteractiveTarget(event.target)) {
        return;
      }

      reviveCell(event.clientX, event.clientY);
    };

    resize();
    animationFrame = window.requestAnimationFrame(tick);

    window.addEventListener("resize", resize);
    window.addEventListener("click", handleClick);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    onCleanup(() => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.cancelAnimationFrame(animationFrame);
    });
  });

  return (
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div class="absolute inset-0" style={{ background: "var(--bg-gradient)" }} />
      <div
        class="absolute left-[-10rem] top-[12rem] h-80 w-80 rounded-full blur-3xl"
        style={{ background: "var(--bg-orb-left)" }}
      />
      <div
        class="absolute right-[-8rem] top-[6rem] h-96 w-96 rounded-full blur-3xl"
        style={{ background: "var(--bg-orb-right)" }}
      />
      <canvas
        ref={canvasRef}
        class="absolute inset-0 h-full w-full opacity-84"
        style={{ "mix-blend-mode": "var(--life-blend)" }}
      />
      <div class="absolute inset-0" style={{ background: "var(--bg-overlay)" }} />
    </div>
  );
}
