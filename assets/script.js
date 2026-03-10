/* ============================================================================
   استشراف | الوظائف التفاعلية - الإصدار 1.4 (الفيروزي السيادي)
   ============================================================================
   البصمة الجينية: 🧬 AI-00 | φ = 1.618 | UUID: IST-2026-SOV-001
   ============================================================================ */

// ============================================================================
// التكوين العام (CONFIG) - سهل التحديث مستقبلاً
// ============================================================================
const CONFIG = {
    // مؤشرات السيادة
    TIT_PRICE: 1.00,
    BASE_CITIZENS: 10342,
    BASE_HERITAGE: 47,
    UPDATE_INTERVAL: 5000,
    
    // أكواد التفعيل وربطها بالأقسام
    CODES: {
        'Architect_2026': {
            section: 'andalusia-club',    // يفتح نادي أندلسية
            message: 'مرحباً بك أيها المؤسس',
            unlocks: ['andalusia-club', 'dwaya-engine']
        },
        'Civic_Pulse': {
            section: 'book-section',       // يفتح قسم الكتاب
            message: 'تم تفعيل محفظة السنابل',
            unlocks: ['book-section']
        },
        'Young_Innovator': {
            section: 'blog-section',       // يفتح المدونة
            message: 'مرحباً أيها المبتكر',
            unlocks: ['blog-section']
        },
        'Foresight_Ambassador': {
            section: 'all',                 // يفتح كل شيء
            message: 'مرحباً أيها السفير',
            unlocks: ['andalusia-club', 'dwaya-engine', 'book-section', 'blog-section']
        }
    },
    
    // عناوين الأقسام للمفاتيح
    SECTION_IDS: {
        'andalusia-club': 'andalusia-club',
        'dwaya-engine': 'dwaya-engine',
        'book-section': 'book-section',
        'blog-section': 'blog-section'
    }
};

// ============================================================================
// نظام الحالة (State Management) مع localStorage
// ============================================================================
const SovereignState = {
    // الحالة الحالية
    state: {
        unlockedSections: [],
        enteredCodes: [],
        citizenCount: CONFIG.BASE_CITIZENS,
        heritageCount: CONFIG.BASE_HERITAGE
    },
    
    // تهيئة الحالة من localStorage
    init: function() {
        const saved = localStorage.getItem('istishraf_state');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.state = { ...this.state, ...parsed };
                console.log('✅ State loaded from localStorage', this.state);
            } catch (e) {
                console.error('❌ Error loading state', e);
            }
        }
        
        // تطبيق الحالة على الواجهة
        this.applyState();
    },
    
    // حفظ الحالة في localStorage
    save: function() {
        localStorage.setItem('istishraf_state', JSON.stringify(this.state));
        console.log('💾 State saved to localStorage');
    },
    
    // فتح قسم
    unlockSection: function(sectionId) {
        if (!this.state.unlockedSections.includes(sectionId)) {
            this.state.unlockedSections.push(sectionId);
            this.applyState();
            this.save();
        }
    },
    
    // فتح عدة أقسام
    unlockSections: function(sectionIds) {
        sectionIds.forEach(id => {
            if (!this.state.unlockedSections.includes(id)) {
                this.state.unlockedSections.push(id);
            }
        });
        this.applyState();
        this.save();
    },
    
    // تطبيق الحالة على DOM
    applyState: function() {
        // كل الأقسام التي يمكن قفلها
        const sections = document.querySelectorAll('[data-section]');
        
        sections.forEach(section => {
            const sectionId = section.dataset.section;
            
            if (this.state.unlockedSections.includes(sectionId)) {
                section.classList.remove('locked');
                section.classList.add('unlocked');
            } else {
                section.classList.add('locked');
                section.classList.remove('unlocked');
            }
        });
    },
    
    // التحقق من كود
    validateCode: function(code) {
        return CONFIG.CODES[code] || null;
    },
    
    // مسح الحالة (للتجربة)
    reset: function() {
        this.state = {
            unlockedSections: [],
            enteredCodes: [],
            citizenCount: CONFIG.BASE_CITIZENS,
            heritageCount: CONFIG.BASE_HERITAGE
        };
        localStorage.removeItem('istishraf_state');
        this.applyState();
        console.log('🔄 State reset');
    }
};

// ============================================================================
// البصمة الجينية
// ============================================================================
function addGeneticFingerprint() {
    const fingerprintHTML = `
        <div class="genetic-fingerprint">
            <i class="fas fa-dna"></i>
            AI-00 | φ = 1.618 | UUID: IST-2026-SOV-001
            <i class="fas fa-shield-alt"></i>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', fingerprintHTML);
}

// ============================================================================
// شريط التيكر - يقرأ من CONFIG
// ============================================================================
function addSovereignTicker() {
    const tickerHTML = `
        <div class="sovereign-ticker">
            <div class="ticker-content">
                <div class="ticker-item">
                    <i class="fas fa-coins"></i>
                    <span>$TIT: <strong data-index="tit">${CONFIG.TIT_PRICE.toFixed(2)}</strong> USD</span>
                </div>
                <div class="ticker-item">
                    <i class="fas fa-users"></i>
                    <span>المواطنون: <strong data-index="citizens">${CONFIG.BASE_CITIZENS.toLocaleString()}</strong></span>
                </div>
                <div class="ticker-item">
                    <i class="fas fa-landmark"></i>
                    <span>الأصول التراثية: <strong data-index="heritage">${CONFIG.BASE_HERITAGE}</strong></span>
                </div>
                <div class="ticker-item">
                    <i class="fas fa-chart-line"></i>
                    <span>مؤشر السيادة: <strong data-index="score">618</strong></span>
                </div>
                <div class="ticker-item">
                    <i class="fas fa-crown"></i>
                    <span>φ = 1.618</span>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', tickerHTML);
}

// ============================================================================
// مؤشرات السيادة
// ============================================================================
function addSovereignIndexCards() {
    const indexHTML = `
        <div class="sovereign-index">
            <div class="index-card">
                <div class="index-value" data-index="tit">${CONFIG.TIT_PRICE.toFixed(2)}</div>
                <div class="index-label">$TIT / USD</div>
            </div>
            <div class="index-card">
                <div class="index-value" data-index="citizens">${CONFIG.BASE_CITIZENS.toLocaleString()}</div>
                <div class="index-label">مواطن رقمي</div>
            </div>
            <div class="index-card">
                <div class="index-value" data-index="heritage">${CONFIG.BASE_HERITAGE}</div>
                <div class="index-label">أصل تراثي</div>
            </div>
            <div class="index-card">
                <div class="index-value" data-index="score">618</div>
                <div class="index-label">مؤشر السيادة</div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', indexHTML);
}

// ============================================================================
// أكواد التفعيل
// ============================================================================
function addActivationCodes() {
    const codesHTML = `
        <div class="codes-grid">
            <div class="code-chip" onclick="handleCodeClick('Architect_2026', this)">
                <i class="fas fa-crown"></i> Architect_2026
            </div>
            <div class="code-chip" onclick="handleCodeClick('Civic_Pulse', this)">
                <i class="fas fa-vote-yea"></i> Civic_Pulse
            </div>
            <div class="code-chip" onclick="handleCodeClick('Young_Innovator', this)">
                <i class="fas fa-lightbulb"></i> Young_Innovator
            </div>
            <div class="code-chip" onclick="handleCodeClick('Foresight_Ambassador', this)">
                <i class="fas fa-star"></i> Foresight_Ambassador
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', codesHTML);
}

// ============================================================================
// معالجة النقر على كود
// ============================================================================
function handleCodeClick(code, element) {
    const codeInfo = CONFIG.CODES[code];
    
    if (codeInfo) {
        // فتح الأقسام المرتبطة
        if (codeInfo.unlocks) {
            SovereignState.unlockSections(codeInfo.unlocks);
        }
        
        // إضافة تأثير بصري
        element.classList.add('copied');
        setTimeout(() => element.classList.remove('copied'), 2000);
        
        // إظهار رسالة نجاح
        showToast(`✅ ${codeInfo.message}`, 'success');
        
        // تسجيل الكود
        SovereignState.state.enteredCodes.push(code);
        SovereignState.save();
    }
}

// ============================================================================
// تحديث مؤشرات السيادة
// ============================================================================
function updateSovereignIndices() {
    // محاكاة نمو طفيف
    const citizens = CONFIG.BASE_CITIZENS + Math.floor(Math.random() * 100);
    const heritage = CONFIG.BASE_HERITAGE + Math.floor(Math.random() * 3);
    const score = Math.floor(600 + Math.random() * 50);
    
    // تحديث القيم في DOM
    document.querySelectorAll('[data-index="tit"]').forEach(el => {
        el.textContent = CONFIG.TIT_PRICE.toFixed(2);
    });
    
    document.querySelectorAll('[data-index="citizens"]').forEach(el => {
        el.textContent = citizens.toLocaleString();
    });
    
    document.querySelectorAll('[data-index="heritage"]').forEach(el => {
        el.textContent = heritage;
    });
    
    document.querySelectorAll('[data-index="score"]').forEach(el => {
        el.textContent = score;
    });
    
    // تحديث الحالة
    SovereignState.state.citizenCount = citizens;
    SovereignState.state.heritageCount = heritage;
}

// ============================================================================
// Toast Notifications
// ============================================================================
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? 'var(--teal-dark)' : '#ff6b6b'};
        color: black;
        padding: 12px 25px;
        border-radius: 50px;
        font-weight: bold;
        z-index: 3000;
        animation: slideUp 0.3s ease;
        box-shadow: 0 5px 20px rgba(0,206,209,0.3);
        direction: rtl;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================================================
// نظام الدخول (Modal)
// ============================================================================
let currentModal = null;

function openModal(type) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'auth-modal';
    
    let title = type === 'login' ? 'دخول السياديين' : 'تسجيل مواطن جديد';
    let placeholder = type === 'login' ? 'أدخل كود السيادة' : 'أدخل الرقم الوطني';
    let buttonText = type === 'login' ? 'دخول' : 'تسجيل';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()" style="position: absolute; top: 15px; left: 15px; background: none; border: none; color: var(--teal-light); font-size: 1.5rem; cursor: pointer;">
                <i class="fas fa-times"></i>
            </button>
            <h3 style="color: var(--teal-light); text-align: center;">${title}</h3>
            <i class="fas fa-crown" style="color: var(--teal-light); font-size: 3rem; display: block; text-align: center; margin-bottom: 20px;"></i>
            <input type="text" class="modal-input" id="modal-input" placeholder="${placeholder}">
            <button class="btn-teal" style="width: 100%;" onclick="handleAuth('${type}')">
                <i class="fas fa-${type === 'login' ? 'sign-in-alt' : 'user-plus'}"></i>
                ${buttonText}
            </button>
            <div class="message" id="auth-message" style="margin-top: 15px; display: none;"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    currentModal = modal;
    setTimeout(() => document.getElementById('modal-input')?.focus(), 100);
}

function closeModal() {
    if (currentModal) {
        currentModal.remove();
        currentModal = null;
    }
}

function handleAuth(type) {
    const input = document.getElementById('modal-input');
    
    if (!input.value.trim()) {
        showToast('الرجاء إدخال البيانات', 'error');
        return;
    }
    
    if (type === 'login') {
        const codeInfo = CONFIG.CODES[input.value.trim()];
        if (codeInfo) {
            showToast(`✅ ${codeInfo.message}`, 'success');
            
            // فتح الأقسام المرتبطة
            if (codeInfo.unlocks) {
                SovereignState.unlockSections(codeInfo.unlocks);
            }
            
            setTimeout(closeModal, 1000);
        } else {
            showToast('❌ كود غير صحيح', 'error');
        }
    } else {
        showToast('✅ تم إرسال طلب التسجيل', 'success');
        setTimeout(closeModal, 1500);
    }
}

// ============================================================================
// التهيئة
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    // إضافة البصمة الجينية
    addGeneticFingerprint();
    
    // إضافة شريط التيكر
    addSovereignTicker();
    
    // إضافة مؤشرات السيادة
    addSovereignIndexCards();
    
    // إضافة أكواد التفعيل
    addActivationCodes();
    
    // تهيئة نظام الحالة
    SovereignState.init();
    
    // بدء تحديث المؤشرات
    updateSovereignIndices();
    setInterval(updateSovereignIndices, CONFIG.UPDATE_INTERVAL);
    
    // إغلاق المودال عند النقر خارج المحتوى
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });
    
    console.log('✅ Istishraf Sovereign Hub v1.4 initialized');
});
