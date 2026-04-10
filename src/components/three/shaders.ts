export const fresnelVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const fresnelFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uGlowColor;
  uniform float uRimIntensity;
  uniform float uPulseSpeed;

  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 baseColor = vec3(0.01, 0.01, 0.02);
    float rim = 1.0 - max(dot(normalize(vNormal), normalize(vViewPosition)), 0.0);
    rim = pow(rim, 3.0);

    float pulse = 0.95 + 0.1 * sin(uTime * uPulseSpeed);

    // HDR rim glow — values exceed 1.0 to trigger bloom
    vec3 rimGlow = uGlowColor * rim * uRimIntensity * pulse;

    float alpha = mix(0.15, 0.85, rim);

    gl_FragColor = vec4(baseColor + rimGlow, alpha);
  }
`;
