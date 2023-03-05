import { Paper, styled, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { Mesh, MeshStandardMaterial, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { IFCLoader } from "web-ifc-three/IFCLoader";

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

const selectedColor = '#ABFF55'

const selectedMaterial = new THREE.MeshBasicMaterial({color: selectedColor})

export interface BuildingVisualisationProps {
  onRFID?: (rfid: string) => unknown;
}

function initializeThreeSegmentView(
  canvas: HTMLCanvasElement,
  onRFID: BuildingVisualisationProps["onRFID"]
) {
  // SCENE
  const scene = new THREE.Scene();

  let blocksWithoutFloor: Object3D[] = [];

  const materialMap: Record<string, THREE.Material> = {}
  gltfLoader.load("/DigitalTwin.glb", (wholeModel) => {
    blocksWithoutFloor = wholeModel.scene.children.filter(
      ({ name }) =>
        name.startsWith("IfcBuildingElementProxy") &&
        name !== "IfcBuildingElementProxy00000000000000000000000" // floor
    );

    const group = new THREE.Group();
    group.add(
      ...wholeModel.scene.children.filter(({ name }) =>
        name.startsWith("IfcBuildingElementProxy")
      )
    );
    const materialsToDispose: MeshStandardMaterial[] = [];
    group.traverse((object3d) => {
      if (
        object3d instanceof Mesh &&
        object3d.material instanceof MeshStandardMaterial
      ) {
        materialsToDispose.push(object3d.material);
        object3d.material = object3d.material.clone();
        object3d.material.color.set(colorMap[object3d.material.name]);
        object3d.material.needsUpdate = true;
        materialMap[object3d.name] = object3d.material;
      }
    });
    materialsToDispose.forEach((m) => m.dispose());
    group.scale.setScalar(10);
    scene.add(group);
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
    renderer.setSize(
      canvas.getBoundingClientRect().width,
      canvas.getBoundingClientRect().height
    );
    camera.aspect =
      canvas.getBoundingClientRect().width /
      canvas.getBoundingClientRect().height;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", resizeListener);

  let pressedObject: Object3D | null = null;
  canvas.addEventListener("dblclick", (e) => {
    const mouseVector = new THREE.Vector2();
    const sizes = canvas.getBoundingClientRect();

    mouseVector.x = ((e.clientX - sizes.left) / sizes.width) * 2 - 1;
    mouseVector.y = -(((e.clientY - sizes.top) / sizes.height) * 2) + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouseVector, camera);

    const intersections = raycaster.intersectObjects(blocksWithoutFloor);
    pressedObject = intersections[0]?.object ?? null;
    if (pressedObject && onRFID) {
      onRFID(pressedObject.name.replace("IfcBuildingElementProxy", ""));
    }
  });

  let running = true;
  renderer.render(scene, camera);

  const size = new THREE.Vector2()
  function tick() {
    renderer.getSize(size)
    const currentRect = canvas.getBoundingClientRect();
    if (
      size.width !== currentRect.width &&
      size.height !== currentRect.height
    ) {
      resizeListener();
    }

    controls.update();

    scene.traverse((element) => {
      if (element instanceof Mesh) {
        if (element.name === pressedObject?.name) {
          element.material = selectedMaterial;
        } else {
          element.material = materialMap[element.name];
        }
      }
    });

    renderer.render(scene, camera);
    if (running) {
      window.requestAnimationFrame(tick);
    }
  }

  console.log("resized", canvas.width, canvas.height);

  tick();

  return () => {
    // dispose threejs element
    console.log("disposing threejs");
    running = false;
    window.removeEventListener("dblclick", resizeListener);
    controls.dispose();
    scene.traverse((element: any) => {
      if (element && typeof element.dispose === "function") {
        element.dispose();
      }
    });
    renderer.dispose();
  };
}

export const BuildingVisualisation = ({
  onRFID,
}: BuildingVisualisationProps) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>();

  useEffect(() => {
    if (canvas != null) {
      return initializeThreeSegmentView(canvas, onRFID);
    }
  }, [canvas, onRFID]);

  return (
    <StyledVisualisation>
      <Tabs value={0}  aria-label="basic tabs example">
        <Tab label="Building" />
        <Tab label="Temperature" />
        <Tab label="Humidity" />
        <Tab label="Light" />
      </Tabs>
      <canvas id="building-canvas" ref={setCanvas} />
    </StyledVisualisation>
  );
};

const StyledVisualisation = styled(Paper)`
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & #building-canvas {
    overflow: hidden;
    object-fit: fill;
    width: 100%;
    height: 100%;
    outline: none;
  }
`;
