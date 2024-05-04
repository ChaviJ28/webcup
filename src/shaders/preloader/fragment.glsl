uniform sampler2D alphaMap;
uniform float influence;
uniform float brightness;
uniform vec3 color;
uniform float time;

varying vec2 vUv;

void main() {
  vec4 texel = texture2D(alphaMap, vUv * 5.0 + vec2(time, 0.0));
  float alpha = mix(1.0, texel.r, influence); // Interpolate between full alpha and texture's alpha
  alpha *= brightness;
  gl_FragColor = vec4(color, alpha); // Red color with dynamic alpha
}