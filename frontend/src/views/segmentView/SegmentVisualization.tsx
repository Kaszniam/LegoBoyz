import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function initializeThreeSegmentView(canvas: HTMLCanvasElement) {
  // SCENE
  const scene = new THREE.Scene();

  // LIGHTNING
  const ambientLight = new THREE.AmbientLight("#fff", 0.3);
  scene.add(ambientLight)
  const sun = new THREE.DirectionalLight("#fff", 2);
  sun.position.set(3, 10, -4);
  scene.add(sun);

  // scene.add(new THREE.DirectionalLightHelper(sun))

  // OBJECTS
  const testCube = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({
      color: "#FF0",
    })
  );
  scene.add(testCube);

  // CAMERA
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.width / canvas.height,
    0.1,
    100
  );
  camera.position.set(0, 1, -4);

  // RENDERER
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(2);


  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const resizeListener = () => {
    renderer.setSize(canvas.width, canvas.height);
    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();
  };
  canvas.addEventListener("resize", resizeListener);

  let running = true;
  renderer.render(scene, camera);

  function tick() {
    controls.update();
    renderer.render(scene, camera)
    if (running) {
      window.requestAnimationFrame(tick);
    }
  }

  tick();

  return () => {
    // dispose threejs element
    console.log('disposing threejs')
    running = false;
    canvas.removeEventListener("resize", resizeListener);
    controls.dispose();
    scene.traverse((element: any) => {
      if(element && typeof element.dispose === 'function') {
        element.dispose();
      }
    });
    renderer.dispose();
  };
}

export const SegmentVisualization = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>();

  useEffect(() => {
    if (canvas != null) {
      return  initializeThreeSegmentView(canvas);
    }
  }, [canvas]);

  return (
    <StyledVisualisation>
      <canvas id="segment-canvas" ref={setCanvas} />
    </StyledVisualisation>
  );
};

const StyledVisualisation = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;

  & #segment-canvas {
    overflow: hidden;
    object-fit: fill;
    width: 100%;
    height: 100%;
    outline: none;
  }
`;
