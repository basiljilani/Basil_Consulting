"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { manifoldFragmentShader, manifoldVertexShader } from "./shaders";

const BASIL_CREST = new THREE.Color("#4dfaa2");
const SIGNAL_TROUGH = new THREE.Color("#1b3a8f");

/** Points on a subdivided icosahedron — even coverage, no pole pinching. */
function useManifoldGeometry(detail: number) {
  return useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.55, detail);
    // Normals and UVs are dead weight for a point cloud.
    geo.deleteAttribute("normal");
    geo.deleteAttribute("uv");
    return geo;
  }, [detail]);
}

export function Manifold({
  quality = "high",
  intensity = 1,
}: {
  quality?: "high" | "low";
  intensity?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const pointsMat = useRef<THREE.ShaderMaterial>(null);

  const { viewport, size, camera } = useThree();
  const dpr = useThree((s) => s.gl.getPixelRatio());

  // World-units-to-pixels at unit depth. Recomputed whenever the canvas
  // resizes so point size stays visually constant across viewports.
  const projScale = useMemo(() => {
    const fov = (camera as THREE.PerspectiveCamera).fov ?? 42;
    return size.height / (2 * Math.tan((fov * Math.PI) / 360));
  }, [size.height, camera]);

  // detail n yields 20 * (n+1)^2 * 3 points — 18 gives ~21.7k, dense enough to
  // read as a surface rather than a scatter, and still trivial for the GPU.
  const detail = quality === "high" ? 18 : 9;

  const manifoldGeo = useManifoldGeometry(detail);

  const manifoldUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      // World-space point diameter — projected to ~4px at the default framing.
      uSize: { value: 0.017 },
      uPixelRatio: { value: dpr },
      uProjScale: { value: projScale },
      uAmplitude: { value: 1 },
      uPointerInfluence: { value: 0 },
      uOpacity: { value: 0 },
      uColorCrest: { value: BASIL_CREST },
      uColorTrough: { value: SIGNAL_TROUGH },
    }),
    // projScale is intentionally excluded: it is pushed in the frame loop below
    // so a resize never rebuilds the material (which would re-compile shaders).
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dpr],
  );

  // Smoothed pointer, so the parallax glides instead of snapping.
  const smoothed = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 0.05); // clamp after tab-switch stalls

    if (pointsMat.current) {
      const u = pointsMat.current.uniforms;
      u.uTime.value = t;
      u.uProjScale.value = projScale;
      // Fade in over roughly the first second so the cloud materialises.
      const cur = u.uOpacity.value as number;
      u.uOpacity.value = cur + (intensity - cur) * Math.min(d * 4, 1);
      u.uPointerInfluence.value = Math.hypot(smoothed.current.x, smoothed.current.y) * 0.5;
    }

    // Pointer parallax — normalised device coords, damped toward the target.
    smoothed.current.x += (state.pointer.x - smoothed.current.x) * d * 2.2;
    smoothed.current.y += (state.pointer.y - smoothed.current.y) * d * 2.2;

    if (group.current) {
      group.current.rotation.y = t * 0.075 + smoothed.current.x * 0.32;
      group.current.rotation.x = -smoothed.current.y * 0.22 + Math.sin(t * 0.21) * 0.05;
    }

  });

  // Sized to overshoot the headline block, so the cloud reads as a field
  // *around* the message rather than a disc sitting behind it. The hero's
  // radial scrim then carves the legible clearing through the middle.
  //
  // Driven by the SMALLER viewport dimension: keying off width alone made the
  // sphere wider than a portrait phone screen, burying the body copy.
  const span = Math.min(viewport.width, viewport.height);
  const scale = Math.min(1.25, Math.max(0.42, span / 4.2));

  return (
    <group ref={group} scale={scale}>
      <points geometry={manifoldGeo}>
        <shaderMaterial
          ref={pointsMat}
          vertexShader={manifoldVertexShader}
          fragmentShader={manifoldFragmentShader}
          uniforms={manifoldUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

    </group>
  );
}
