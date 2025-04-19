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
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

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

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    BABYLON.SceneLoader.ImportMesh("", "/", "model.glb", scene, function (meshes) {
      modelRef.current = new BABYLON.TransformNode("modelRoot", scene);
meshes.forEach(mesh => {
  mesh.setParent(modelRef.current);
});


      // ✅ Section 1: Zoom in only
      gsap.to(cameraRef.current, {
        radius: 3,
        scrollTrigger: {
          trigger: "#section1",
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });

      // ✅ Section 2: Spin only
      gsap.to(modelRef.current.rotation, {
        y: Math.PI / 1,
        scrollTrigger: {
          trigger: "#section2",
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });

      // ✅ Feature Text 1 fade-in
      gsap.to("#featureText1", {
        opacity: 1,
        scrollTrigger: {
          trigger: "#section1",
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });

      // ✅ Feature Text 2 fade-in
      gsap.to("#featureText2", {
        opacity: 1,
        scrollTrigger: {
          trigger: "#section2",
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });
    });

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {/* Babylon Canvas */}
      <canvas ref={canvasRef} style={{ width: '100vw', height: '100vh', display: 'block', position: 'fixed', top: 0, left: 0, zIndex: 0 }} />
  
      {/* Feature Sections */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <section id="section1" style={{ height: '100vh', position: 'relative' }}>
          <div
            className="featureText"
            id="featureText1"
            style={{
              position: 'sticky',
              top: '30%',
              textAlign: 'center',
              fontSize: '3em',
              opacity: 0,
              color: '#111',
            }}
          >
            🛠 Precision Machining
          </div>
        </section>
  
        <section id="section2" style={{ height: '100vh', position: 'relative' }}>
          <div
            className="featureText"
            id="featureText2"
            style={{
              position: 'sticky',
              top: '30%',
              textAlign: 'center',
              fontSize: '3em',
              opacity: 0,
              color: '#111',
            }}
          >
            ⚙️ Modular Design
          </div>
        </section>
  
        {/* 🧩 Add Extra Scroll Room */}
        <section style={{ height: '100vh' }}>
          <div style={{ textAlign: 'center', paddingTop: '40vh', color: '#aaa' }}>
            Scroll ends here
          </div>
        </section>
      </div>
    </div>
  );
  
}

export default App;
