import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Create component to return red cube in a canvas
const RedCube = () => {
  const canvasRef = useRef(null);
  const getInnerHeight = () => window.innerHeight - 57;

  useEffect(() => {
    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / getInnerHeight(),
      0.1,
      1000
    );

    // Create renderer
    let renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });

    // Create cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: "red" });
    const cube = new THREE.Mesh(geometry, material);

    // Add cube to scene
    scene.add(cube);

    // Set camera position
    camera.position.z = 5;

    // Create resize listener
    let onWindowResize = function () {
      camera.aspect = window.innerWidth / getInnerHeight();
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, getInnerHeight());
      renderer.resetState();
      renderer.render(scene, camera);
    };

    window.addEventListener("resize", onWindowResize, false);
    renderer.render(scene, camera);
  }, []);

  return (
    <canvas
      height={getInnerHeight()}
      width={window.innerWidth}
      ref={canvasRef}
    />
  );
};

const BasicScene = () => {
  return <RedCube />;
};

export default BasicScene;
