
//preload function Load the audio file in the preload function.
let song;

function preload() {
  // audio file from freesound https://freesound.org/people/multitonbits/sounds/383935/?
  song = loadSound("assets/bgm.mp3");
}

//Class for creating bubbles, each with attributes such as color, position, size, and noise offset.
class MovingBubble {
  constructor(col1, col2) {
    this.x = random(width);
    this.y = random(height);
    this.size = random(100, 190);
    this.col1 = col1;
    this.col2 = col2;
    this.noiseOffset = random(1000); // Noise offset for each bubble
    this.phase = 0;
    this.scaleValue = 1;
    this.scaleDirection = 1;
    this.speedX = random(-0.5, 0.5); // horizontal speed
    this.speedY = random(-0.5, 0.5); // vertical speed
    this.curve = this.createCurve(); // Create curve around bubble
  }

  createCurve() {
    return {
      size: this.size * 1.2, // Curve size slightly larger than bubble
      col: color(random(100, 255), random(100, 255), random(100, 255), 150),
      noiseOffset: random(1000),
      strokeWeight: random(2, 6) // Random stroke weight between 2 and 6
    };
  }

  move() {
    // allowing the bubbles to move slowly on the screen
    this.x += this.speedX;
    this.y += this.speedY;

    // ensuring they remain within the screen boundaries
    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;

    // Maintain the breathing effect
    this.phase += 0.01; // achieve the animation

    // Ensure the breathing effect slows down
    //scale from p5.js reference
    if (this.scaleDirection === 1) {
      this.scaleValue += 0.002;
      if (this.scaleValue >= 1.2) {
        this.scaleDirection = -1;
      }
    } else {
      this.scaleValue -= 0.002;
      if (this.scaleValue <= 1) {
        this.scaleDirection = 1;
      }
    }
  }

  display() {
    noStroke();
    let gradientSteps = 10; // Number of steps in the gradient
    for (let i = gradientSteps; i > 0; i--) {
      let t = i / gradientSteps;
      let col = lerpColor(this.col1, this.col2, t);
      fill(col);
      beginShape();
      let angleStep = TWO_PI / 100;
      for (let angle = 0; angle < TWO_PI; angle += angleStep) {
        let r = (this.size / 2) * t + 20 * noise(cos(angle) + 1, sin(angle) + 1, frameCount * 0.02 + this.noiseOffset);
        let x = this.x + r * cos(angle);
        let y = this.y + r * sin(angle);
        vertex(x, y);
      }
      endShape(CLOSE);
    }
  }

  displayCurve() {
    stroke(this.curve.col);
    strokeWeight(this.curve.strokeWeight); // Set stroke weight
    noFill();
    beginShape();
    let angleStep = TWO_PI / 100;
    for (let angle = 0; angle < TWO_PI; angle += angleStep) {
      let r = this.curve.size / 2 + 10 * noise(cos(angle) + 1, sin(angle) + 1, frameCount * 0.02 + this.curve.noiseOffset);
      let x = this.x + r * cos(angle);
      let y = this.y + r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

//create particle
class Particle {
  constructor(x, y, isExploded = false) {
    this.x = x;
    this.y = y;
    this.size = isExploded ? random(5, 10) : random(10, 20); // Smaller size if exploded
    this.speedX = isExploded ? random(-2, 2) : random(-1, 1);
    this.speedY = isExploded ? random(-2, 2) : random(-1, 1);
    this.alpha = 255;
    this.col = color(random(255), random(255), random(255));
    this.isExploded = isExploded; // Indicates if the particle has exploded
    this.explodedParticles = []; // Array to hold smaller particles after explosion
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.isExploded) {
      this.alpha -= 4; // from p5.js reference ,Faster fade for exploded particles
    } else {
      this.alpha -= 2;
    }

    //isExploded is a property of the Particle class that indicates whether a particle has exploded.
    if (!this.isExploded && this.alpha < 200) {
      this.explode();
      this.isExploded = true;
    }
  }

  display() {
    noStroke();
    fill(this.col.levels[0], this.col.levels[1], this.col.levels[2], this.alpha);
    ellipse(this.x, this.y, this.size);

    for (let particle of this.explodedParticles) {
      particle.move();
      particle.display();
    }
  }

  explode() {
    for (let i = 0; i < 20; i++) { // Create more particles for a more dramatic explosion
      let newParticle = new Particle(this.x, this.y, true);
      this.explodedParticles.push(newParticle);
    }
  }

  isFinished() {
    return this.alpha <= 0 && this.explodedParticles.every(p => p.alpha <= 0);
  }
}

let noiseMax = 1;
let phase = 0;
let scaleValue = 1;
let scaleDirection = 1;

let foamOffset = 0;
let movingBubbles = [];
let particles = [];
let timeOffset = 0; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  // Create bubbles with different colors
  movingBubbles.push(new MovingBubble(color(0, 0, 139, 150), color(221, 160, 221, 150)));
  movingBubbles.push(new MovingBubble(color(173, 216, 230, 150), color(255, 182, 193, 150)));
  movingBubbles.push(new MovingBubble(color(255, 127, 80, 150), color(255, 223, 0, 150)));
  movingBubbles.push(new MovingBubble(color(173, 216, 230, 150), color(143, 188, 143)));
  movingBubbles.push(new MovingBubble(color(227, 218, 201, 150), color(145, 129, 81, 150)));
  movingBubbles.push(new MovingBubble(color(25, 25, 112, 150), color(65, 105, 225, 150)));
  movingBubbles.push(new MovingBubble(color(192, 192, 192, 150), color(220, 220, 220, 150)));
  movingBubbles.push(new MovingBubble(color(255, 223, 0, 150), color(255, 37, 0, 150)));
  movingBubbles.push(new MovingBubble(color(16, 12, 8, 150), color(194, 0, 0, 150)));

  // Create button to play music
  let button = createButton('Play/Stop');
  button.position((width - button.width) / 2, height - button.height - 2);
  button.mousePressed(play_pause);
}

function draw() {
  // Create Background
  background(153, 186, 221); // Base background color

  // Draw multiple layers of Perlin noise waves
  for (let i = 0; i < 5; i++) {
    let yOffset = i * 0.01;
    let xOffset = 0;
    fill(231, 254, 255, 50); // Semi-transparent fill
    beginShape();
    for (let x = 0; x <= width; x += 10) {
      let y = map(noise(xOffset, yOffset + timeOffset), 0, 1, height * 0.4, height * 0.6);//map from p5.js reference Re-maps a number from one range to another.
      vertex(x, y + i * 20); // Offset each layer vertically
      xOffset += 0.03;
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }

  //wave animate
  timeOffset += 0.01;

  // Display circular curves around bubbles
  for (let bubble of movingBubbles) {
    bubble.displayCurve();
  }

  // Display bubbles
  for (let bubble of movingBubbles) {
    bubble.move();
    bubble.display();
  }

  // Generate and display particles
  if (random(1) < 0.05) { // Adjust particle generation rate for fireworks effect
    particles.push(new Particle(random(width), random(height)));
  }//Drawing particle explosions does not affect other operations.
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.move();
    p.display();
    if (p.isFinished()) {
      particles.splice(i, 1);
    }
  }
}

function play_pause() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.loop();
  }
}