class Particle {
  // isSpark: true = 폭발 잔불, false = 원래 공(바닥을 튕기는 원)
  constructor(x, y, isSpark = false) {
    this.pos = createVector(x, y);
    this.acc = createVector(0, 0);

    if (isSpark) {
      // 랜덤한 방향과 속도로 퍼져나가게
      const angle = random(TWO_PI);
      this.vel = p5.Vector.fromAngle(angle).mult(random(2, 8));
      this.size = random(3, 9);
      this.life = 255;
      this.decay = random(2, 4.5);
    } else {
      this.vel = createVector(0, 0);
      this.size = 50;
      this.life = 255;
      this.decay = 0; // 원은 사라지지 않음
    }
  }

  addForce(aForce) {
    this.acc.add(aForce);
  }

  update() {
    // 폭발 잔불만 공기 저항 적용
    if (this.decay > 0) {
      this.vel.mult(0.985);
    }

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.life -= this.decay;
  }

  isDead() {
    return this.life <= 0;
  }

  // 공 전용: 바닥은 기존처럼 튕기고, 좌·우·천장(벽)에 닿으면 true 반환
  checkEdge() {
    const r = this.size / 2;

    if (this.pos.y + r > height) {
      this.pos.y = height - r;
      this.vel.y = this.vel.y * -1;
      return false;
    }

    // 좌·우·천장에 닿으면 벽 충돌
    return (
      this.pos.x - r < 0 || this.pos.x + r > width || this.pos.y - r < 0
    );
  }

  show() {
    noStroke();
    // 형광 하늘색 (네온 시안)
    fill(0, 255, 255, this.life);
    circle(this.pos.x, this.pos.y, this.size);
  }
}
