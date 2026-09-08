# 🕹️ VibeGame - Classic Breakout

A retro-style 2D Breakout arcade game built with vanilla HTML5 Canvas and JavaScript. It features dynamic paddle bounce physics, brick grid management, real-time score and lives tracking, and pure, unit-tested collision logic.

---

## 🎮 How to Play

### Objective
Destroy all bricks on the screen by bouncing the ball off your paddle without letting the ball fall past your paddle.

### Controls
| Key | Action |
| --- | --- |
| <kbd>◀</kbd> / <kbd>ArrowLeft</kbd> | Move paddle left |
| <kbd>▶</kbd> / <kbd>ArrowRight</kbd> | Move paddle right |
| <kbd>F5</kbd> / <kbd>Cmd</kbd> + <kbd>R</kbd> | Restart / Play again after Game Over or Win |

### Rules & Scoring
- **Bricks**: 4 rows × 7 columns (28 bricks in total).
- **Points**: Each destroyed brick awards **10 points** (maximum score: 280 points).
- **Lives**: You start with **3 lives**. Losing the ball below the bottom boundary consumes 1 life and resets the ball and paddle.
- **Victory Condition**: Clear all 28 bricks to win the game!
- **Game Over**: Losing all 3 lives ends the game.

---

## ✨ Features

- **Smooth HTML5 Canvas Rendering**: Powered by `requestAnimationFrame` running at 60 FPS.
- **Realistic Dynamic Bounce Angles**: The rebound trajectory varies based on where the ball strikes the paddle (angles up to $\pm 60^\circ$), giving players precise control over ball direction.
- **Clean State Management**: Clear distinction between game state (score, lives, active bricks) and visual rendering.
- **Decoupled & Testable Logic**: Core collision detection and physics calculations are isolated as pure functions without DOM or Canvas dependencies.
- **Zero Dependencies**: Pure HTML, CSS, and modern JavaScript running natively in any browser and Node.js environment.

---

## 📂 Project Structure

```text
VibeGame/
├── breakout.html        # Main playable game: canvas setup, input handlers, and render loop
├── game-logic.js        # Pure collision and physics functions (CommonJS export)
├── test-game-logic.js   # Automated unit tests for physics and collision rules
└── README.md            # Game documentation and instructions
```

---

## 🚀 Getting Started

### 1. Run the Game Locally
You do not need to install any packages to play the game. Simply open `breakout.html` in your favorite web browser:

- **Option A (Direct File)**: Double-click `breakout.html` in your file manager or drag it into your browser.
- **Option B (Local Web Server)**:
  ```bash
  # Using Python 3
  python3 -m http.server 8000
  ```
  Then navigate to `http://localhost:8000/breakout.html` in your browser.

### 2. Run the Unit Tests
The test suite validates collision bounds, paddle rebound angles, and destroyed brick state checking:

```bash
node test-game-logic.js
```

**Expected Output:**
```text
PASSED: ballHitsPaddle correctly identifies hits and misses
PASSED: paddleBounceAngle correctly angles center vs edge hits
PASSED: brickCollision correctly handles hits, misses, and destroyed bricks

ALL COLLISION LOGIC TESTS PASSED
```

---

## ⚙️ Physics & Mechanics

- **Paddle Collision (`ballHitsPaddle`)**: Uses bounding box intersection against the ball's coordinates and radius.
- **Bounce Angle Calculation (`paddleBounceAngle`)**: Calculates normalized hit position relative to the paddle's center (from `-1.0` at the far left to `+1.0` at the far right), scaled up to a maximum reflection angle of $60^\circ$ ($\frac{\pi}{3}$ radians).
- **Brick Collision (`brickCollision`)**: Checks intersection between the ball and active brick bounds, and ignores already-destroyed bricks to prevent ghost collisions.
