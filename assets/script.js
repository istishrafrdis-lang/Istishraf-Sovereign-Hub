/* ============================================================================
   استشراف | الوظائف التفاعلية - الإصدار 1.2
   ============================================================================
   البصمة الجينية: 🧬 AI-00 | φ = 1.618 | UUID: IST-2026-SOV-001
   ============================================================================ */

// ============================================================================
// تهيئة المتغيرات العامة
// ============================================================================
const CONFIG = {
    TIT_PRICE: 1.00,           // ثابت حالياً
    BASE_CITIZENS: 10342,       // العدد الأساسي للمواطنين
    BASE_HERITAGE: 47,          // العدد الأساسي للأصول التراثية
    UPDATE_INTERVAL: 5000,       // تحديث كل 5 ثواني
    VALID_CODES: ['Architect_2026', 'Civic_Pulse', 'Young_Innovator', 'Foresight_Ambassador']
};

// ============================================================================
// البصمة الجينية - إضافة تلقائية
// ============================================================================
function addGeneticFingerprint() {
    const fingerprintHTML = `
        <div class="genetic-fingerprint">
            <i class="fas fa-dna"></i>
            AI-00 | φ = 1.618 | UUID: IST-2026-SOV-001
            <i class="fas fa-shield-alt"></i>
        </div>
    `;
    
    // إضافة في بداية الـ body
    document.body.insertAdjacentHTML('afterbegin', fingerprintHTML);
}

// ============================================================================
// مؤشرات السيادة الحية
// ============================================================================
function updateSovereignIndices() {
    // محاكاة نمو طفيف في الأرقام
    const citizens = CONFIG.BASE_CITIZENS + Math.floor(Math.random() * 100);
    const heritage = CONFIG.BASE_HERITAGE + Math.floor(Math.random() * 5);
    const score = Math.floor(600 + Math.random() * 50);
    
    // تحديث القيم في شريط التيكر
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
    
    // تحديث مؤشرات النمو
    document.querySelectorAll('.index-trend').forEach(el => {
        const trend = (Math.random() * 3 - 1).toFixed(1);
        el.innerHTML = `<i class="fas fa-arrow-${trend > 0 ? 'up' : 'down'}"></i> ${trend > 0 ? '+' : ''}${trend}%`;
        el.style.color = trend > 0 ? '#2ecc71' : '#ff6b6b';
    });
}

// ============================================================================
// نظام الدخول (Modal)
// ============================================================================
let currentModal = null;

function openModal(type) {
    // إنشاء عنصر المودال
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'auth-modal';
    
    let title = type === 'login' ? 'دخول السياديين' : 'تسجيل مواطن جديد';
    let placeholder = type === 'login' ? 'أدخل كود السيادة' : 'أدخل الرقم الوطني';
    let buttonText = type === 'login' ? 'دخول' : 'تسجيل';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">
                <i class="fas fa-times"></i>
            </button>
            <h3>${title}</h3>
            <i class="fas fa-crown" style="color: var(--gold); font-size: 3rem; display: block; text-align: center; margin-bottom: 20px;"></i>
            <input type="text" class="modal-input" id="modal-input" placeholder="${placeholder}">
            <button class="btn-gold" style="width: 100%;" onclick="handleAuth('${type}')">
                <i class="fas fa-${type === 'login' ? 'sign-in-alt' : 'user-plus'}"></i>
                ${buttonText}
            </button>
            <div class="message" id="auth-message"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    currentModal = modal;
    
    // تركيز تلقائي على حقل الإدخال
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
    const messageDiv = document.getElementById('auth-message');
    
    if (!input.value.trim()) {
        showMessage(messageDiv, 'الرجاء إدخال البيانات المطلوبة', 'error');
        return;
    }
    
    if (type === 'login') {
        // التحقق من كود السيادة
        if (CONFIG.VALID_CODES.includes(input.value.trim())) {
            showMessage(messageDiv, '✅ مرحباً بك في الإمبراطورية السيادية', 'success');
            setTimeout(() => {
                closeModal();
                // تحديث واجهة المستخدم بعد الدخول
                document.body.classList.add('authenticated');
            }, 1500);
        } else {
            showMessage(messageDiv, '❌ كود السيادة غير صحيح', 'error');
        }
    } else {
        // تسجيل مواطن جديد (محاكاة)
        showMessage(messageDiv, '✅ تم إرسال طلب التسجيل. سيتم تفعيل الحساب خلال 24 ساعة', 'success');
        setTimeout(closeModal, 2000);
    }
}

function showMessage(element, text, type) {
    element.className = `message ${type}`;
    element.style.display = 'block';
    element.innerHTML = text;
}

// ============================================================================
// نسخ أكواد التفعيل
// ============================================================================
async function copyCode(code, element) {
    try {
        await navigator.clipboard.writeText(code);
        
        // تغيير مظهر العنصر مؤقتاً
        const originalText = element.innerHTML;
        element.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
        element.classList.add('copied');
        
        setTimeout(() => {
            element.innerHTML = originalText;
            element.classList.remove('copied');
        }, 2000);
        
        // إظهار رسالة نجاح
        showToast(`✅ تم نسخ الكود: ${code}`);
        
    } catch (err) {
        showToast('❌ فشل النسخ. حاول مرة أخرى', 'error');
    }
}

function showToast(message, type = 'success') {
    // إنشاء عنصر توست بسيط
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#ff6b6b'};
        color: black;
        padding: 12px 25px;
        border-radius: 50px;
        font-weight: bold;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================================================
// وظائف الدفع
// ============================================================================
function payWithTIT() {
    showMessage(
        document.getElementById('payment-message'),
        'جاري ربط محفظة Imzatit والعقد الذكي TIT...',
        'info'
    );
}

function payWithBinance() {
    showMessage(
        document.getElementById('payment-message'),
        'جاري التوجيه إلى بوابة Binance Pay الآمنة...',
        'info'
    );
}

function payWithBank() {
    showMessage(
        document.getElementById('payment-message'),
        'جاري إنشاء طلب تحويل مصرفي... يرجى الانتظار',
        'info'
    );
}

// ============================================================================
// دخول نادي أندلسية
// ============================================================================
function enterClub() {
    const memberId = document.getElementById('memberID').value.trim();
    const messageDiv = document.getElementById('club-message');
    
    if (!memberId) {
        showMessage(messageDiv, '❌ الرجاء إدخال رقم العضوية', 'error');
        return;
    }
    
    if (CONFIG.VALID_CODES.includes(memberId)) {
        showMessage(messageDiv, '✅ مرحباً بك في نادي أندلسية أيها القائد.', 'success');
        
        // فتح محتوى إضافي (محاكاة)
        document.querySelector('#dwaya-engine').classList.remove('locked');
    } else {
        showMessage(messageDiv, '❌ رقم العضوية غير صحيح أو غير مفعل.', 'error');
    }
}

// ============================================================================
// إضافة شريط التيكر الحي
// ============================================================================
function addSovereignTicker() {
    const tickerHTML = `
        <div class="sovereign-ticker">
            <div class="ticker-content">
                <div class="ticker-item">
                    <i class="fas fa-coins"></i>
                    <span>$TIT: <strong data-index="tit">1.00</strong> USD</span>
                </div>
                <div class="ticker-item">
                    <i class="fas fa-users"></i>
                    <span>المواطنون: <strong data-index="citizens">10,342</strong></span>
                </div>
                <div class="ticker-item">
                    <i class="fas fa-landmark"></i>
                    <span>الأصول التراثية: <strong data-index="heritage">47</strong></span>
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
// إضافة مؤشرات السيادة (بطاقات)
// ============================================================================
function addSovereignIndexCards() {
    const indexHTML = `
        <div class="sovereign-index">
            <div class="index-card">
                <div class="index-value" data-index="tit">1.00</div>
                <div class="index-label">$TIT / USD</div>
                <div class="index-trend"><i class="fas fa-arrow-up"></i> ثابت</div>
            </div>
            <div class="index-card">
                <div class="index-value" data-index="citizens">10,342</div>
                <div class="index-label">مواطن رقمي</div>
                <div class="index-trend"><i class="fas fa-arrow-up"></i> +12%</div>
            </div>
            <div class="index-card">
                <div class="index-value" data-index="heritage">47</div>
                <div class="index-label">أصل تراثي</div>
                <div class="index-trend"><i class="fas fa-arrow-up"></i> +3%</div>
            </div>
            <div class="index-card">
                <div class="index-value" data-index="score">618</div>
                <div class="index-label">مؤشر السيادة</div>
                <div class="index-trend"><i class="fas fa-arrow-up"></i> +1.6%</div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', indexHTML);
}

// ============================================================================
// إضافة أكواد التفعيل
// ============================================================================
function addActivationCodes() {
    const codesHTML = `
        <div class="codes-grid">
            <div class="code-chip" onclick="copyCode('Architect_2026', this)">
                <i class="fas fa-crown"></i> Architect_2026
            </div>
            <div class="code-chip" onclick="copyCode('Civic_Pulse', this)">
                <i class="fas fa-vote-yea"></i> Civic_Pulse
            </div>
            <div class="code-chip" onclick="copyCode('Young_Innovator', this)">
                <i class="fas fa-lightbulb"></i> Young_Innovator
            </div>
            <div class="code-chip" onclick="copyCode('Foresight_Ambassador', this)">
                <i class="fas fa-star"></i> Foresight_Ambassador
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', codesHTML);
}

// ============================================================================
// تهيئة بيئة Three.js لضواية
// ============================================================================
function initDwayaEngine() {
    const container = document.getElementById('dwaya-container');
    if (!container) return;
    
    // محاكاة تحميل Three.js
    container.innerHTML = `
        <div class="dwaya-loading">
            <i class="fas fa-cube"></i>
            <p>جاري تحميل محرك ضواية ثلاثي الأبعاد...</p>
            <p style="font-size: 0.8rem; color: #444;">سيتم ربط النماذج قريباً (ملفات .obj/.glb)</p>
        </div>
    `;
    
    // في النسخة القادمة: سيتم إضافة كود Three.js الفعلي هنا
    console.log('✅ Dwaya 3D Engine initialized');
}

// ============================================================================
// التشغيل عند تحميل الصفحة
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
    
    // تهيئة محرك ضواية
    initDwayaEngine();
    
    // بدء تحديث المؤشرات
    updateSovereignIndices();
    setInterval(updateSovereignIndices, CONFIG.UPDATE_INTERVAL);
    
    // إغلاق المودال عند النقر خارج المحتوى
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });
    
    console.log('✅ Istishraf Sovereign Hub v1.2 initialized');
});
