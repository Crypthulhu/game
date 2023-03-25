// Paramètres de base
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Liste de mots
const words = ['Bloc 1', 'Bloc 2', 'Bloc 3', 'Bloc 4', 'Bloc 5', 'Bloc 6', 'Bloc 7'];

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

camera.position.z = 8;

function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;
    const spacing = 2; // Espace entre les blocs

    for (let i = 0; i < textMeshes.length; i++) {
        const textMesh = textMeshes[i];
        const x = i * spacing - time * 2;
        textMesh.position.set(x, 0, 0);
    }

    // Réinitialiser la position du premier bloc lorsqu'il sort de l'écran
    const firstTextMesh = textMeshes[0];
    if (firstTextMesh.position.x < -spacing * (words.length - 1)) {
        firstTextMesh.position.x = (words.length - 1) * spacing;
        textMeshes.push(textMeshes.shift());
    }

    renderer.render(scene, camera);
}

animate();
