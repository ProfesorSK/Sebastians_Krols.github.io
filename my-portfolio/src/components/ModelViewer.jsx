// src/components/ModelViewer.jsx
import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function ModelViewer({ modelPath, title, description }) {
  const mountRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadModel = () => {
    if (loaded || loading) return;

    setLoading(true);
    setError(null);

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 2.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);


    // Load model with progress
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;

        // Auto-center and scale
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxAxis = Math.max(size.x, size.y, size.z);
        model.scale.setScalar(1 / maxAxis); // normalize size to 1
      
        // Center the model
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center); // shift model to center at origin
      
        scene.add(model);
      
        setLoaded(true);
        setLoading(false);
      },
      (xhr) => {
        const percent = Math.round((xhr.loaded / xhr.total) * 100);
        setLoadingProgress(percent);
      },
      (err) => {
        console.error('Model load failed:', err);
        setError(`Failed to load: ${modelPath}`);
        setLoading(false);
      }
    );

    // Floating 3D text
    const loaderFont = new THREE.FontLoader();
    loaderFont.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new THREE.TextGeometry(title, {
        font: font,
        size: 0.1,
        height: 0.01,
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00bfff });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(-0.5, 0.8, 0);
      scene.add(textMesh);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0.2, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  };

  return (
    <div className="model-card">
      <div ref={mountRef} style={{ width: '100%', height: '300px', backgroundColor: '#fafafa', position: 'relative' }}>
        {!loaded && !loading && (
          <div style={{ padding: '1rem', textAlign: 'center' }}>
            <button className="btn btn-outline-primary" onClick={loadModel}>
              Load Model
            </button>
          </div>
        )}
        {loading && (
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              fontSize: '0.9rem',
              background: '#fff',
              padding: '10px 15px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            <strong>Loading:</strong><br />
            {modelPath}<br />
            {loadingProgress}%
          </div>
        )}
        {error && (
          <div style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</div>
        )}
      </div>
      <div className="p-3">
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ModelViewer;
