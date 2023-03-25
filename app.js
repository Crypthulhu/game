// Paramètres de base
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Liste de mots
const words = ['Bonjour', 'Animation', 'Hélicoïdale', 'ADN', 'Exemple', 'Créativité', 'Graphique'];

// Créer des objets 3D pour chaque mot
const textMeshes = [];
const loader = new THREE.FontLoader();

loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    for (const word of words) {
        const textGeometry = new THREE.TextGeometry(word, {
            font: font,
            size: 0.5,
            height: 0.1,
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMeshes.push(textMesh);
        scene.add(textMesh);
    }
});

camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;
    const radius = 5;
    const angle = Math.PI * 2 / words.length;
    const helixOffset = Math.PI / words.length; // Ajout de l'offset pour la double hélice

    for (let i = 0; i < textMeshes.length; i++) {
        const textMesh = textMeshes[i];
        const x = radius * Math.sin(angle * i + time);
        const y = i * 0.75; // Position verticale des mots
        const z = radius * Math.cos(angle * i + time);
        textMesh.position.set(x, y, z);
        textMesh.rotation.y = angle * i + helixOffset + time; // Rotation des mots pour les orienter le long de la double hélice
    }

    renderer.render(scene, camera);
}

animate();
