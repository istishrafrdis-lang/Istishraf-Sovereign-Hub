/* ============================================================================
   🏛️  ضواية 3D - محرك الآثار الرقمية (الإصدار 1.4 - الفيروزي)
   ============================================================================
   الإصدار: 1.4 | التاريخ: 2026-03-10
   البصمة الجينية: 🧬 AI-00 | φ = 1.618 | UUID: DWA-3D-2026-SOV
   الألوان: فيروزي داكن #00CED1 | فيروزي فاتح #40E0D0
   ============================================================================
   الميزات:
   - إضاءة فيروزية كاملة
   - تفاعل Hover (تباطؤ الدوران + زيادة الجسيمات)
   - متوافق مع Mobile-First
   ============================================================================ */

class Dwaya3DEngine {
    constructor(containerId, config = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        
        if (!this.container) {
            console.error(`❌ Container #${containerId} not found`);
            return;
        }
        
        // التكوين بالفيروزي
        this.config = {
            modelPath: config.modelPath || null,
            autoRotateSpeed: config.autoRotateSpeed || 0.02,
            bloomIntensity: config.bloomIntensity || 0.8,
            particleCount: config.particleCount || 200,
            fogColor: config.fogColor || 0x00CED1,  // فيروزي داكن
            fogNear: config.fogNear || 3,
            fogFar: config.fogFar || 15,
            tealDark: 0x00CED1,
            tealLight: 0x40E0D0,
            ...config
        };
        
        // متغيرات
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.particles = null;
        this.clock = new THREE.Clock();
        this.composer = null;
        this.bloomPass = null;
        this.isLoading = true;
        
        // سرعة الدوران الأصلية (للرجوع عند Hover)
        this.originalRotateSpeed = this.config.autoRotateSpeed;
        
        this.init();
    }
    
    async init() {
        console.log('🚀 Initializing Dwaya 3D Engine (Teal Edition)...');
        
        this.showLoadingIndicator();
        
        // استيراد المكتبات
        const THREE = await import('https://unpkg.com/three@0.128.0/build/three.module.js');
        const { OrbitControls } = await import('https://unpkg.com/three@0.128.0/examples/jsm/controls/OrbitControls.js');
        const { EffectComposer } = await import('https://unpkg.com/three@0.128.0/examples/jsm/postprocessing/EffectComposer.js');
        const { RenderPass } = await import('https://unpkg.com/three@0.128.0/examples/jsm/postprocessing/RenderPass.js');
        const { UnrealBloomPass } = await import('https://unpkg.com/three@0.128.0/examples/jsm/postprocessing/UnrealBloomPass.js');
        const { OutputPass } = await import('https://unpkg.com/three@0.128.0/examples/jsm/postprocessing/OutputPass.js');
        
        // حفظ المراجع
        this.THREE = THREE;
        
        // إنشاء المشهد
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0f0d);
        
        // ضباب فيروزي
        this.scene.fog = new THREE.Fog(
            this.config.tealDark,
            this.config.fogNear,
            this.config.fogFar
        );
        
        // الكاميرا
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        this.camera.position.set(5, 3, 8);
        this.camera.lookAt(0, 0, 0);
        
        // المُصيِّر
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // تحسين للأجهزة
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        this.renderer.toneMappingExposure = 1.5;
        this.container.appendChild(this.renderer.domElement);
        
        // إعداد Bloom
        this.composer = new EffectComposer(this.renderer);
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
        
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(this.container.clientWidth, this.container.clientHeight),
            this.config.bloomIntensity,
            0.4,
            0.1
        );
        this.composer.addPass(this.bloomPass);
        this.composer.addPass(new OutputPass());
        
        // إضاءة فيروزية كاملة
        this.setupLights();
        
        // الجسيمات الذهبية
        this.createParticles();
        
        // النموذج المؤقت
        this.createTemporaryModel();
        
        // التحكم
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = this.config.autoRotateSpeed;
        this.controls.enableZoom = true;
        this.controls.enablePan = false;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.minDistance = 3;
        this.controls.maxDistance = 12;
        
        // إضافة حدث Hover
        this.setupHoverEffect();
        
        // بدء الرسم
        this.animate();
        
        // معالجة تغيير الحجم
        window.addEventListener('resize', () => this.onWindowResize());
        
        this.hideLoadingIndicator();
        console.log('✅ Dwaya 3D Engine ready');
    }
    
    setupLights() {
        // إضاءة محيطة فيروزية
        const ambientLight = new this.THREE.AmbientLight(this.config.tealDark, 0.6);
        this.scene.add(ambientLight);
        
        // إضاءة نقطية فيروزية رئيسية
        const pointLight1 = new this.THREE.PointLight(this.config.tealLight, 1, 20);
        pointLight1.position.set(3, 5, 5);
        this.scene.add(pointLight1);
        
        // إضاءة نقطية ثانية
        const pointLight2 = new this.THREE.PointLight(this.config.tealDark, 0.8, 15);
        pointLight2.position.set(-3, 2, 4);
        this.scene.add(pointLight2);
        
        // إضاءة خلفية
        const backLight = new this.THREE.PointLight(0x446688, 0.5, 20);
        backLight.position.set(0, 2, -8);
        this.scene.add(backLight);
    }
    
    createParticles() {
        const geometry = new this.THREE.BufferGeometry();
        const positions = new Float32Array(this.config.particleCount * 3);
        
        for (let i = 0; i < this.config.particleCount; i++) {
            const radius = 2.5 + Math.random() * 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            positions[i*3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i*3+1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i*3+2] = radius * Math.cos(phi);
        }
        
        geometry.setAttribute('position', new this.THREE.BufferAttribute(positions, 3));
        
        const material = new this.THREE.PointsMaterial({
            color: this.config.tealLight,
            size: 0.08,
            transparent: true,
            blending: this.THREE.AdditiveBlending,
            depthWrite: false
        });
        
        this.particles = new this.THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }
    
    createTemporaryModel() {
        const group = new this.THREE.Group();
        
        // كرة فيروزية
        const sphereGeo = new this.THREE.SphereGeometry(1.2, 64, 32);
        const sphereMat = new this.THREE.MeshStandardMaterial({
            color: this.config.tealDark,
            emissive: this.config.tealLight,
            emissiveIntensity: 0.3,
            roughness: 0.2,
            metalness: 0.8
        });
        const sphere = new this.THREE.Mesh(sphereGeo, sphereMat);
        group.add(sphere);
        
        // حلقات ذهبية حول الكرة
        const ringGeo = new this.THREE.TorusGeometry(1.4, 0.05, 16, 64);
        const ringMat = new this.THREE.MeshStandardMaterial({
            color: 0xffaa00,
            emissive: 0x442200,
            roughness: 0.3,
            metalness: 0.7
        });
        
        const ring1 = new this.THREE.Mesh(ringGeo, ringMat);
        ring1.rotation.x = Math.PI / 2;
        group.add(ring1);
        
        const ring2 = new this.THREE.Mesh(ringGeo, ringMat);
        ring2.rotation.y = Math.PI / 2;
        ring2.rotation.x = Math.PI / 2;
        group.add(ring2);
        
        this.model = group;
        this.scene.add(this.model);
    }
    
    setupHoverEffect() {
        if (!this.renderer) return;
        
        // تتبع حركة الماوس
        this.renderer.domElement.addEventListener('mousemove', (e) => {
            // حساب المسافة من المركز
            const rect = this.renderer.domElement.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const distance = Math.sqrt(x*x + y*y);
            
            if (distance < 0.2 && this.controls) {
                // Hover - تباطؤ الدوران
                this.controls.autoRotateSpeed = this.originalRotateSpeed * 0.25;
                
                // زيادة الجسيمات
                if (this.particles) {
                    this.particles.material.size = 0.12;
                    this.particles.material.opacity = 0.8;
                }
            } else {
                // العودة للوضع الطبيعي
                if (this.controls) {
                    this.controls.autoRotateSpeed = this.originalRotateSpeed;
                }
                if (this.particles) {
                    this.particles.material.size = 0.08;
                    this.particles.material.opacity = 0.5;
                }
            }
        });
        
        // عند خروج الماوس من الحاوية
        this.renderer.domElement.addEventListener('mouseleave', () => {
            if (this.controls) {
                this.controls.autoRotateSpeed = this.originalRotateSpeed;
            }
            if (this.particles) {
                this.particles.material.size = 0.08;
                this.particles.material.opacity = 0.5;
            }
        });
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.controls) {
            this.controls.update();
        }
        
        if (this.composer) {
            this.composer.render();
        } else {
            this.renderer.render(this.scene, this.camera);
        }
    }
    
    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
        
        if (this.composer) {
            this.composer.setSize(width, height);
        }
    }
    
    showLoadingIndicator() {
        const loading = document.createElement('div');
        loading.className = 'dwaya-loading';
        loading.innerHTML = '<i class="fas fa-spinner fa-spin"></i><p>جاري تحميل المحرك...</p>';
        this.container.appendChild(loading);
        this.loadingDiv = loading;
    }
    
    hideLoadingIndicator() {
        if (this.loadingDiv) {
            this.loadingDiv.remove();
            this.loadingDiv = null;
        }
        this.isLoading = false;
    }
    
    // دالة لتبديل النموذج (مرونة)
    switchModel(modelPath) {
        console.log(`🔄 Switching model to: ${modelPath}`);
        this.config.modelPath = modelPath;
        // سيتم تنفيذ التبديل في النسخة القادمة
    }
}

window.Dwaya3DEngine = Dwaya3DEngine;
