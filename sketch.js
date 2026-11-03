let ball;
let sparks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = newBall();
}

function newBall() {
  return new Particle(width / 2, height / 3);
}

function draw() {
  // 반투명 검정 배경 → 잔상(트레일) 효과
  background(0, 60);

  // 빛나는 네온 느낌을 위해 가산 블렌딩
  blendMode(ADD);

  const gravity = createVector(0, 0.3);

  ball.addForce(gravity);
  ball.update();
  // 좌·우·천장(벽)에 닿으면 폭발 → 새 공이 위에서 다시 등장
  if (ball.checkEdge()) {
    explode(ball.pos.x, ball.pos.y);
    ball = newBall();
  } else {
    ball.show();
  }

  const sparkGravity = createVector(0, 0.08);
  for (const s of sparks) {
    s.addForce(sparkGravity);
    s.update();
    s.show();
  }
  sparks = sparks.filter((s) => !s.isDead());

  blendMode(BLEND);
}

function mousePressed() {
  // 공 → 클릭 지점 방향으로 발사
  const dir = createVector(mouseX - ball.pos.x, mouseY - ball.pos.y);
  if (dir.mag() === 0) {
    dir.set(0, -1);
  }
  ball.vel = dir.normalize().mult(18);
}

function explode(x, y) {
  const count = 90; // 한 번에 터지는 입자 수
  for (let i = 0; i < count; i++) {
    sparks.push(new Particle(x, y, true));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
