/**
 * GLSL for the hero manifold.
 *
 * The visual: a point cloud on a subdivided icosahedron, displaced along its
 * normals by two octaves of 3D simplex noise. Crests read basil-green, troughs
 * fall away to deep signal-blue, and everything is additively blended so the
 * dense regions bloom without a post-processing pass.
 */

/** Ashima Arts simplex noise — public domain, trimmed to the 3D case. */
const SIMPLEX_3D = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

export const manifoldVertexShader = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
/** viewportHeight / (2 * tan(fov/2)) — converts world size to pixels at z=1. */
uniform float uProjScale;
uniform float uAmplitude;
uniform float uPointerInfluence;

varying float vDisp;
varying float vDepth;

${SIMPLEX_3D}

void main() {
  vec3 dir = normalize(position);

  // Two octaves: a slow swell plus a finer ripple travelling against it.
  float swell  = snoise(dir * 1.45 + vec3(0.0, 0.0, uTime * 0.13));
  float ripple = snoise(dir * 3.60 - vec3(uTime * 0.085, 0.0, 0.0));

  float disp = swell * 0.52 + ripple * 0.21;
  disp *= uAmplitude;

  // Pointer proximity gently inflates the surface toward the cursor.
  disp += uPointerInfluence * 0.10;

  vec3 displaced = position + dir * disp * 0.36;

  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Perspective-correct sizing: uSize is a world-space diameter, projected to
  // pixels. Without uProjScale this collapses to ~1px and the cloud vanishes.
  gl_PointSize = uSize * uProjScale * uPixelRatio / max(-mvPosition.z, 0.001);
  gl_PointSize *= 0.75 + disp * 0.85;
  gl_PointSize = clamp(gl_PointSize, 1.0, 12.0);

  vDisp = disp;
  vDepth = -mvPosition.z;
}
`;

export const manifoldFragmentShader = /* glsl */ `
uniform vec3 uColorTrough;
uniform vec3 uColorCrest;
uniform float uOpacity;

varying float vDisp;
varying float vDepth;

void main() {
  // Round the square point sprite into a soft disc.
  vec2 uv = gl_PointCoord - vec2(0.5);
  float d = length(uv);
  if (d > 0.5) discard;

  float alpha = smoothstep(0.5, 0.02, d);

  vec3 color = mix(uColorTrough, uColorCrest, smoothstep(-0.34, 0.52, vDisp));

  // Depth fade keeps the far hemisphere from muddying the silhouette.
  float depthFade = smoothstep(8.6, 3.0, vDepth);

  gl_FragColor = vec4(color, alpha * depthFade * uOpacity);
}
`;
