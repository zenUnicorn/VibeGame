const { ballHitsPaddle, paddleBounceAngle, brickCollision } = require("./game-logic.js");
const assert = require("assert");

// --- Paddle collision ---
const paddle = { x: 100, y: 380, width: 80, height: 10 };

// Ball squarely on top of the paddle should register a hit
assert.strictEqual(
  ballHitsPaddle({ x: 140, y: 375, radius: 5 }, paddle),
  true,
  "ball resting on top of the paddle should be a hit"
);

// Ball well above the paddle should NOT register a hit
assert.strictEqual(
  ballHitsPaddle({ x: 140, y: 300, radius: 5 }, paddle),
  false,
  "ball far above the paddle should not be a hit"
);

// Ball horizontally outside the paddle's x-range should NOT register a hit
assert.strictEqual(
  ballHitsPaddle({ x: 500, y: 375, radius: 5 }, paddle),
  false,
  "ball outside the paddle's horizontal range should not be a hit"
);
console.log("PASSED: ballHitsPaddle correctly identifies hits and misses");

// --- Bounce angle ---
// Hitting dead center should bounce nearly straight (angle close to 0)
const centerAngle = paddleBounceAngle({ x: 140 }, paddle); // paddle center is x=140
assert.ok(Math.abs(centerAngle) < 0.01, `center hit should be ~0 radians, got ${centerAngle}`);

// Hitting the far right edge should bounce at close to the max angle
const edgeAngle = paddleBounceAngle({ x: 180 }, paddle); // paddle right edge is x=180
assert.ok(edgeAngle > 1.0, `edge hit should bounce sharply, got ${edgeAngle}`);
console.log("PASSED: paddleBounceAngle correctly angles center vs edge hits");

// --- Brick collision ---
const brick = { x: 50, y: 50, width: 60, height: 20, destroyed: false };

assert.strictEqual(
  brickCollision({ x: 70, y: 55, radius: 5 }, brick),
  true,
  "ball inside brick bounds should collide"
);

assert.strictEqual(
  brickCollision({ x: 500, y: 500, radius: 5 }, brick),
  false,
  "ball far from the brick should not collide"
);

// A destroyed brick should never register a collision again, this is
// the exact check that prevents the classic bug where a destroyed brick
// keeps bouncing the ball as if it were still there
const destroyedBrick = { ...brick, destroyed: true };
assert.strictEqual(
  brickCollision({ x: 70, y: 55, radius: 5 }, destroyedBrick),
  false,
  "a destroyed brick must not collide again"
);
console.log("PASSED: brickCollision correctly handles hits, misses, and destroyed bricks");

console.log("\nALL COLLISION LOGIC TESTS PASSED");
