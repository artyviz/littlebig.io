import './style.css'


import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);


const loader = new THREE.GLTFLoader();
let model;

loader.load('/little_planet_earth/scene.gltf', (gltf) => {
    model = gltf.scene;
    scene.add(model);


    camera.position.z = 5;


    const pivot = new THREE.Object3D();
    pivot.add(model);
    scene.add(pivot);

    const mouse = new THREE.Vector2();
    const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX - windowHalf.x) / windowHalf.x;
        mouse.y = (event.clientY - windowHalf.y) / windowHalf.y;
    });
    const update = () => {
        if (model) {
            pivot.rotation.y = mouse.x * 0.5;
            pivot.rotation.x = -mouse.y * 0.2;
        }
        renderer.render(scene, camera);
        requestAnimationFrame(update);
    };

    update();
});


const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.02 });

const starsVertices = [];
for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starsVertices.push(x, y, z);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

