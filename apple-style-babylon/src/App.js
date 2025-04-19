import React, { useRef, useEffect } from 'react';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // 1. Setup Babylon engine and scene
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    // 2. Add camera and attach to canvas
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 2.5,
      5,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);
    cameraRef.current = camera;

    // 3. Add light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1.2;

    // 4. Load the 3D model from public/
    BABYLON.SceneLoader.ImportMesh(
      "",
      process.env.PUBLIC_URL + "/",
      "model.glb",
      scene,
      (meshes) => {
        // Create a parent node to transform the model as a group
        const modelRoot = new BABYLON.TransformNode("modelRoot", scene);
        meshes.forEach(mesh => mesh.setParent(modelRoot));
        modelRef.current = modelRoot;

        // START below the screen (y = -5)
        modelRoot.position.y = -5;

        // Wait for everything to be ready
        scene.executeWhenReady(() => {
          // 🔒 Disable scroll while intro is happening
          document.body.style.overflow = 'hidden';

          // 5. Animate intro (name fade out, model slide up)
          const tl = gsap.timeline({
            delay: 0.5,
            onComplete: () => {
              // ✅ Re-enable scrolling
              document.body.style.overflow = 'auto';
            }
          });

          // Fade out the name text
          tl.to("#intro-text", {
            opacity: 0,
            duration: 1,
            ease: "power2.out"
          });

          // Slide model into view
          tl.to(modelRoot.position, {
            y: 0,
            duration: 1.2,
            ease: "power3.out"
          }, "-=0.8");

          // Hide intro overlay
          tl.to("#intro-container", {
            opacity: 0,
            duration: 0.5,
            pointerEvents: 'none'
          }, "-=0.8");

          // Setup scroll triggers AFTER intro
          ScrollTrigger.create({
            trigger: "#canvas-pin",
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: true
          });

          // Zoom the camera during scroll
          gsap.to(cameraRef.current, {
            radius: 3,
            scrollTrigger: {
              trigger: "#section1",
              start: "top center",
              end: "bottom center",
              scrub: true
            }
          });

          // Rotate the model on scroll
          gsap.to(modelRoot.rotation, {
            y: Math.PI,
            scrollTrigger: {
              trigger: "#section2",
              start: "top center",
              end: "bottom center",
              scrub: true
            }
          });
        });
      }
    );

    // Babylon render loop
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, []);

  return (
    <>
      {/* 🔒 Intro Screen: Static Name */}
      <div
        id="intro-container"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: 'opacity 0.5s ease'
        }}
      >
        <h1
          id="intro-text"
          style={{
            fontSize: '4em',
            fontWeight: '600',
            color: '#111',
            transition: 'opacity 0.5s ease'
          }}
        >
          Sebastian Krols
        </h1>
      </div>

      {/* 🖼️ Babylon Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 0
        }}
      />

      {/* 📜 Scroll Sections */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Pinned model canvas section */}
        <section id="canvas-pin" style={{ height: '100vh' }} />

        {/* Scroll starts here */}
        <section id="section1" style={{
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}}>
  <h2 style={{
    fontSize: '2em',
    color: '#fff',
    textShadow: '0 2px 4px rgba(0,0,0,0.4)'
  }}>
    🔍 Zoomed In: Up Close Detail
  </h2>
</section>

<section id="section2" style={{
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}}>
  <h2 style={{
    fontSize: '2em',
    color: '#fff',
    textShadow: '0 2px 4px rgba(0,0,0,0.4)'
  }}>
    🌀 Spinning to Show Full Geometry
  </h2>
</section>


        {/* Final buffer section */}
        <section style={{ height: '100vh', background: '#fafafa' }}>
          <div style={{ textAlign: 'center', paddingTop: '40vh', color: '#aaa' }}>
            End of showcase
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
