// Thiết lập thời gian bảo trì kết thúc
const maintenanceEndDate = new Date('2025-06-26T14:00:00');   // 26/06/2025 - 14:00

// Hiển thị thời gian kết thúc
document.getElementById('end-time').textContent = formatDate(maintenanceEndDate);

// Hàm định dạng ngày tháng
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

// Entry Screen & Music Control
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const container = document.querySelector('.container');
    const backgroundMusic = document.getElementById('background-music');
    const enterButton = document.getElementById('enter-button');
    const loaderBar = document.querySelector('.loader-bar');
    const subtext = document.querySelector('.loader-subtext');

    // Sau khi thanh tải chạy xong (2.5s)
    setTimeout(() => {
        // Ẩn thanh tải và thay đổi văn bản
        loaderBar.style.display = 'none';
        subtext.textContent = 'Hệ thống đã sẵn sàng';
        
        // Hiển thị nút "Truy Cập"
        enterButton.classList.remove('hidden');
    }, 2500); // Khớp với thời gian animation của thanh tải

    // Thêm sự kiện click cho nút "Truy Cập"
    enterButton.addEventListener('click', function() {
        // 1. Ẩn toàn bộ màn hình chào mừng
        preloader.classList.add('hidden');
        
        // 2. Hiển thị nội dung chính
        container.classList.add('loaded');
        
        // 3. Bật tiếng và phát nhạc
        backgroundMusic.muted = false;
        const playPromise = backgroundMusic.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error("Lỗi khi cố gắng phát nhạc:", error);
            });
        }
    }, { once: true });
});

// Three.js 3D background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('bg-container').appendChild(renderer.domElement);

// Create stars
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.7,
    transparent: true
});

const starsVertices = [];
for (let i = 0; i < 1500; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -Math.random() * 2000;
    starsVertices.push(x, y, z);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Create glowing spheres
function createGlowingSphere(radius, color, position) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.8
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(position.x, position.y, position.z);
    
    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(radius * 1.2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.2
    });
    
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    sphere.add(glow);
    
    return sphere;
}

// Add floating spheres
const sphere1 = createGlowingSphere(20, 0xff6b6b, { x: -100, y: 50, z: -300 });
const sphere2 = createGlowingSphere(15, 0xff9e80, { x: 150, y: -70, z: -250 });
const sphere3 = createGlowingSphere(10, 0xffcc80, { x: 70, y: 120, z: -200 });

scene.add(sphere1, sphere2, sphere3);

// Position camera
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate stars slightly
    stars.rotation.y += 0.0003;
    
    // Make spheres float
    const time = Date.now() * 0.001;
    
    sphere1.position.y = Math.sin(time * 0.3) * 20 + 50;
    sphere2.position.y = Math.sin(time * 0.5) * 15 - 70;
    sphere3.position.y = Math.sin(time * 0.7) * 10 + 120;
    
    sphere1.rotation.y += 0.01;
    sphere2.rotation.y += 0.015;
    sphere3.rotation.y += 0.02;
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate(); 