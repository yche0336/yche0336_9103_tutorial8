# yche0336_9103_tutorial8
# Emotional Therapy Animation
## Wheel of Fortune Re-creation
### Individual Assignment Instructions

Based on my group's re-creation of an emotional therapy animation inspired by the Wheel of Fortune, I used the techniques of Perlin noise and randomness to make the animation move more naturally and smoothly, as if real emotions were flowing.

The circular curves are similar to the interweaving lines in the Wheel of Fortune, and I wrapped the curves in bubbles of different gradient colors to represent us who are often wrapped in emotions. The particles that keep exploding and disappearing are similar to the dots that flow in the Wheel of Fortune, representing every moment of our individual lives, which are wrapped in emotions but will eventually turn into dust. I hope that this work can give people a power of recovery, and also stimulate the audience to think about and understand their own emotions. Everyone has their own path in the wheel of fortune, and despite being held by emotions, every moment is unique and precious.

### Interactive Instructions
1. Open the web page
2. Click the “play/stop” button to play the music.
3. Watch the bubbles move and particles explode on the screen, and feel the healing power of the animation.

### Animation properties and uniqueness, and a brief technical note
I chose to use Perlin noise and randomness to drive the animation effects. I've divided the code into three main sections to illustrate which properties ，as well as a brief technical description

#### Bubbles.

Breathing feeling: this.scaleValue varies between 1 and 1.2 in a loop, creating a smooth breathing effect that makes the object look like it's breathing as it gradually gets bigger and smaller. Inspired by size() in p5.js.

Position change: Use the random() function to generate the initial position of the bubbles and make them move slowly across the screen with random speeds (speedX and speedY).

NoiseOffset: Each bubble has an independent noiseOffset, making each bubble's movement and shape change unique.

Curve animation: 1.createCurve（） creates a curve for each bubble, the size （） realizes the effect that the curve is bigger than the bubble.
2. Each bubble is surrounded by a curve generated based on Perlin noise, these curves use random colors and line thickness to make them look more natural and unique.

#### Particles.

Randomness: The initial position, size, color, speed and other attributes of the bubbles and particles are generated using the random() function, ensuring that each element is unique.

Explode Generation: Using alpha() Gets the alpha (transparency) value of a color. from p5.js reference When the transparency of a particle falls below 200, the explode method is invoked, generating more small particles. These small particles have a random initial velocity and small size, and their transparency decreases faster, resulting in an explosion effect.

Transparency fade: decreases the transparency of the particle each time its position is updated, simulating the effect of the particle fading away. For exploding particles, the transparency decreases faster, adding to the visual dynamism.

#### Dynamic background.

Five layers of waveforms are drawn using Perlin noise , each using a different offset to make them appear to be moving at different depths.

Use of map(noise()): Creates a more natural wave effect by using the noise function to generate smooth noise values and then using the map function to convert those values to vertical positions.

The use of (timeOffset) is used to vary it on a per-frame basis, making the Perlin noise change over time, creating a dynamic effect.

### Inspiration

I was inspired by the work of SamuelYan the generative art artist, it was difficult to find the link to the website as it was a picture he shared on social media. The combination of circular curves, bubbles and fireworks made a deep impact on me, reminding me of fond memories and passing moments.
![An image of Samuelyan](![alt text](assets/WechatIMG941.jpg))

In my personal code, the wave background is inspired by the ocean scene done with perlin in weekk10quiz. I used Perlin's noise smoothing feature to create a continuous wave effect, which makes the background look more beautiful and dynamic.

The particle explosion was inspired by the youtube tutorial “How to make a firework using particle system” by patt vira from https://www.youtube.com/watch?v=YPKidHmretc&t=1531s. The purpose is to make a firework effect, to express the effect of the fireworks. The purpose is to make a firework effect, to express every moment in our individual life.
![An image of tutorial](![alt text](<assets/Screenshot 2024-05-31 at 13.51.02.png>))