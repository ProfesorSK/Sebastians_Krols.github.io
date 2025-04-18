// src/components/ModelPage.jsx
import React, { useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function ModelPage() {
  const mountRef = useRef(null);
  const [searchParams] = useSearchParams();
  const modelName = searchParams.get('model') || 'model1.glb';
  const modelPath = `/models/${modelName}`;

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 2.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    scene.add(hemiLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      const model = gltf.scene;

      // Auto-center and scale
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxAxis = Math.max(size.x, size.y, size.z);
      model.scale.setScalar(1 / maxAxis);
      const center = new THREE.Vector3();
      box.getCenter(center);
      model.position.sub(center);

      scene.add(model);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      // Set renderer background color to white
renderer.setClearColor(0xffffff); // White background


      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mount.innerHTML = '';
    };
  }, [modelPath]);

  return (
    <div style={{ backgroundColor: '#ffffff', width: '100vw', height: '100vh', position: 'relative' }}>
      <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 2 }}>
        <button className="btn btn-outline-dark">← Back to Home</button>
      </Link>
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
  
}

export default ModelPage;
