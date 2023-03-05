import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { IFCLoader } from "web-ifc-three/IFCLoader";
import { BufferGeometry, Mesh, MeshStandardMaterial } from "three";

const ifcLoader = new IFCLoader();
ifcLoader.ifcManager.setWasmPath("/");

const gltfLoader = new GLTFLoader();

const colorMap: Record<string, string> = {
  BLACK: "#2E2E2E",
  BLUE: "#365EC2",
  GREEN: "#008000",
  RED: "#FF0000",
  YELLOW: "#ffff00",
  ORANGE: "#E8BB60",
  WHITE: "#eaeaea",
};
function initializeThreeSegmentView(
  segmentId: string,
  canvas: HTMLCanvasElement
) {
  // SCENE
  const scene = new THREE.Scene();

  // Loading digital twin
  // ifcLoader.load('/DigitalTwin.ifc', (digitalTwinModel) => {
  //   digitalTwinModel.scale.setScalar(10)
  //   digitalTwinModel.geometry.center()
  //   scene.add(digitalTwinModel)
  //   console.log("Model loaded!");
  // })

  // gltfLoader.load("/DigitalTwin.glb", (wholeModel) => {
  //   const group = new THREE.Group()
  //   group.add(...wholeModel.scene.children.filter(it => it.name.startsWith('IfcBuildingElementProxy')))
  //   group.traverse((element) => {
  //     if (
  //       element instanceof Mesh &&
  //       element.material instanceof MeshStandardMaterial
  //     ) {
  //       element.material.color.set(colorMap[element.material.name] ?? "#fff");
  //     }
  //   });
  //   group.scale.setScalar(10)
  //   console.log("Model loaded!", group.children.slice(10, 20).map(it=> it.name.replace('IfcBuildingElementProxy', '')));
  //   scene.add(group)
  // });030200000000000000006738

  gltfLoader.load("/DigitalTwin.glb", (wholeModel) => {
    let segment: Mesh<BufferGeometry, MeshStandardMaterial> =
      wholeModel.scene.children.find(
        (it) => it.name === `IfcBuildingElementProxy${segmentId}`
      ) as Mesh<BufferGeometry, MeshStandardMaterial>;
    segment = segment ??  wholeModel.scene.children.find(
        (it) => it.name === `IfcBuildingElementProxy030200000000000000006738`
    ) as Mesh<BufferGeometry, MeshStandardMaterial>;
    segment.material.color.set(colorMap[segment.material.name]);
    segment.geometry.center();
    segment.scale.setScalar(30);
    scene.add(segment);
  });

  // LIGHTNING
  const ambientLight = new THREE.AmbientLight("#fff", 0.3);
  scene.add(ambientLight);
  const sun = new THREE.DirectionalLight("#fff", 2);
  sun.position.set(3, 10, -4);
  scene.add(sun);

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
    alpha: true,
  });
  renderer.setPixelRatio(2);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const resizeListener = () => {
    renderer.setSize(canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
    camera.aspect = canvas.getBoundingClientRect().width / canvas.getBoundingClientRect().height;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", resizeListener);

  let running = true;
  renderer.render(scene, camera);

  function tick() {
    controls.update();
    renderer.render(scene, camera);
    if (running) {
      window.requestAnimationFrame(tick);
    }
  }

  tick();

  return () => {
    // dispose threejs element
    console.log("disposing threejs");
    running = false;
    window.removeEventListener("resize", resizeListener);
    controls.dispose();
    scene.traverse((element: any) => {
      if (element && typeof element.dispose === "function") {
        element.dispose();
      }
    });
    renderer.dispose();
  };
}

export const SegmentVisualization = ({ segmentId }: { segmentId: string }) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>();

  useEffect(() => {
    if (canvas != null) {
      return initializeThreeSegmentView(segmentId, canvas);
    }
  }, [canvas, segmentId]);

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
