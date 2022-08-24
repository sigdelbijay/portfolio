import * as THREE from 'three';
import images from './images'
const container = document.querySelector('.three_bg')
const loader = new THREE.TextureLoader();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
const renderer = new THREE.WebGL1Renderer({
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

//responsive
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

const geometry = new THREE.PlaneGeometry(18, 10, 15, 9)
const material = new THREE.MeshBasicMaterial({
    // color: 000,
    map: loader.load(images.bg4),
    // wireframe: true
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.z = 5;

//defining counts/points
//time is always changing so changeing the geometry with time
const count = geometry.attributes.position.count;
const clock = new THREE.Clock();

function animate() {
    const time = clock.getElapsedTime();
    for(let i=0; i<count; i++) {
        const x = geometry.attributes.position.getX(i)
        const y = geometry.attributes.position.getX(i)

        const anim1 = 0.75 * Math.sin(x*2 + time * 0.7)
        const anim2 = 0.25 * Math.sin(x + time * 0.7)
        const anim3 = 0.1 * Math.sin(y*15 + time * 0.7)
        // geometry.attributes.position.setZ(i, -y*time*2,);
        
        geometry.attributes.position.setZ(i, anim1+anim2+anim3)
        geometry.computeVertexNormals();
        geometry.attributes.position.needsUpdate = true;
    }
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}


animate();