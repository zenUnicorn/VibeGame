// game-logic.js
// Pure, testable functions extracted from the game's collision and physics
// logic, no canvas or DOM dependency, so they can be verified directly
// with real assertions before being wired into the rendering loop.

function ballHitsPaddle(ball, paddle) {
  return (
    ball.y + ball.radius >= paddle.y &&
    ball.y - ball.radius <= paddle.y + paddle.height &&
    ball.x >= paddle.x &&
    ball.x <= paddle.x + paddle.width
  );
}

function paddleBounceAngle(ball, paddle) {
  // Where the ball hit the paddle, from -1 (far left edge) to 1 (far right
  // edge), used to angle the bounce instead of always reflecting straight
  // up, which is what makes the paddle feel controllable rather than a
  // flat wall.
  const hitPos = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
  const clamped = Math.max(-1, Math.min(1, hitPos));
  const maxAngle = Math.PI / 3; // 60 degrees at the extreme edges
  return clamped * maxAngle;
}

function brickCollision(ball, brick) {
  if (brick.destroyed) return false;
  return (
    ball.x + ball.radius > brick.x &&
    ball.x - ball.radius < brick.x + brick.width &&
    ball.y + ball.radius > brick.y &&
    ball.y - ball.radius < brick.y + brick.height
  );
}

module.exports = { ballHitsPaddle, paddleBounceAngle, brickCollision };
