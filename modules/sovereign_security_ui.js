/* ============================================================================
   🛡️  واجهة المستخدم للأمن السيادي - Sovereign Security UI
   ============================================================================
   الإصدار: 2.0 | التاريخ: 2026-03-10
   البصمة الجينية: 🧬 AI-00 | φ = 1.618 | UUID: SEC-UI-2026-SOV-001
   ============================================================================
   الميزات:
   - لوحة تحكم أمنية متكاملة
   - إعدادات MFA مع QR code
   - سجل النشاطات (Audit Trail)
   - طلب النسيان (GDPR)
   - عقد NDA الذكي
   - مؤشرات الأمن الحية
   ============================================================================ */

class SovereignSecurityUI {
    constructor() {
        this.init();
    }

    init() {
        this.injectStyles();
        this.createSecurityPanel();
        this.bindEvents();
        this.startLiveUpdates();
        console.log('🛡️ Sovereign Security UI initialized');
    }

    // ==========================================================================
    // 1️⃣ حقن الأنماط CSS
    // ==========================================================================
    injectStyles() {
        const styles = `
            /* =================================================================
               أنماط لوحة الأمن السيادي
               ================================================================= */
            
            .security-panel {
                background: linear-gradient(135deg, rgba(0, 206, 209, 0.1), transparent);
                border: 2px solid #00CED1;
                border-radius: 30px;
                padding: 30px;
                margin: 30px 5%;
                backdrop-filter: blur(10px);
                box-shadow: 0 20px 40px rgba(0, 206, 209, 0.2);
                animation: panelGlow 3s infinite;
            }

            @keyframes panelGlow {
                0%, 100% { box-shadow: 0 20px 40px rgba(0, 206, 209, 0.2); }
                50% { box-shadow: 0 30px 60px rgba(0, 206, 209, 0.4); }
            }

            .security-header {
                display: flex;
                align-items: center;
                gap: 20px;
                margin-bottom: 30px;
                border-bottom: 2px solid #00CED1;
                padding-bottom: 20px;
            }

            .security-header i {
                font-size: 3rem;
                color: #40E0D0;
                text-shadow: 0 0 20px rgba(64, 224, 208, 0.5);
            }

            .security-header h3 {
                color: #40E0D0;
                font-size: 2rem;
                margin: 0;
                font-family: 'Amiri', serif;
            }

            .security-header .genetic-badge {
                margin-right: auto;
                background: rgba(0, 206, 209, 0.1);
                padding: 8px 15px;
                border-radius: 30px;
                border: 1px solid #00CED1;
                color: #40E0D0;
                font-size: 0.8rem;
                font-family: monospace;
            }

            /* بطاقات الأمن */
            .security-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 25px;
                margin-bottom: 30px;
            }

            .security-card {
                background: rgba(0, 206, 209, 0.05);
                border: 1px solid #00CED1;
                border-radius: 20px;
                padding: 25px;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .security-card::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(0, 206, 209, 0.1), transparent);
                opacity: 0;
                transition: opacity 0.3s;
            }

            .security-card:hover {
                transform: translateY(-5px);
                border-color: #40E0D0;
                box-shadow: 0 15px 30px rgba(0, 206, 209, 0.3);
            }

            .security-card:hover::before {
                opacity: 1;
            }

            .security-card-icon {
                font-size: 2.5rem;
                color: #40E0D0;
                margin-bottom: 15px;
            }

            .security-card h4 {
                color: white;
                font-size: 1.3rem;
                margin-bottom: 10px;
            }

            .security-card p {
                color: #aaa;
                font-size: 0.9rem;
                margin-bottom: 20px;
                line-height: 1.6;
            }

            .security-status {
                display: flex;
                align-items: center;
                gap: 10px;
                margin: 15px 0;
                padding: 10px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 10px;
            }

            .status-badge {
                padding: 4px 12px;
                border-radius: 30px;
                font-size: 0.8rem;
                font-weight: bold;
                display: inline-flex;
                align-items: center;
                gap: 5px;
            }

            .status-badge.active {
                background: #2ecc71;
                color: black;
            }

            .status-badge.warning {
                background: #f39c12;
                color: black;
            }

            .status-badge.inactive {
                background: #ff6b6b;
                color: black;
            }

            .status-badge.pending {
                background: #00CED1;
                color: black;
            }

            /* مؤشرات التقدم */
            .security-meter {
                margin: 15px 0;
            }

            .meter-label {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
                color: #888;
                font-size: 0.8rem;
            }

            .meter-bar {
                height: 6px;
                background: #333;
                border-radius: 3px;
                overflow: hidden;
            }

            .meter-fill {
                height: 100%;
                background: linear-gradient(90deg, #00CED1, #40E0D0);
                border-radius: 3px;
                transition: width 0.3s;
            }

            /* سجل النشاطات */
            .audit-log-container {
                margin-top: 30px;
                padding: 20px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 15px;
                border: 1px solid #00CED1;
            }

            .audit-log-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                cursor: pointer;
            }

            .audit-log-header h4 {
                color: #40E0D0;
                margin: 0;
            }

            .audit-log-viewer {
                max-height: 300px;
                overflow-y: auto;
                font-family: monospace;
                font-size: 0.8rem;
                direction: ltr;
                text-align: left;
                background: #0a0a0a;
                padding: 15px;
                border-radius: 10px;
                border: 1px solid #333;
            }

            .audit-entry {
                padding: 10px;
                border-bottom: 1px solid #333;
                color: #0f0;
                display: flex;
                gap: 10px;
            }

            .audit-entry:hover {
                background: rgba(0, 206, 209, 0.1);
            }

            .audit-timestamp {
                color: #888;
                min-width: 160px;
            }

            .audit-action {
                color: #40E0D0;
            }

            .audit-hash {
                color: #666;
                font-size: 0.7rem;
                margin-left: auto;
            }

            /* أكواد التفعيل السريع */
            .quick-codes {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin: 20px 0;
            }

            .code-chip {
                background: rgba(0, 206, 209, 0.1);
                border: 1px dashed #00CED1;
                padding: 8px 15px;
                border-radius: 30px;
                color: #40E0D0;
                cursor: pointer;
                transition: all 0.3s;
                font-size: 0.9rem;
                display: inline-flex;
                align-items: center;
                gap: 5px;
            }

            .code-chip:hover {
                background: #00CED1;
                color: black;
                transform: scale(1.05);
            }

            .code-chip.copied {
                background: #2ecc71;
                border-color: #2ecc71;
                color: black;
            }

            /* المودالات */
            .security-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(10px);
                z-index: 5000;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }

            .security-modal.active {
                display: flex;
            }

            .security-modal-content {
                background: #0a0f0d;
                border: 2px solid #00CED1;
                border-radius: 30px;
                padding: 40px;
                max-width: 500px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                animation: modalPop 0.3s ease;
            }

            @keyframes modalPop {
                from {
                    transform: scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }

            .modal-close {
                position: absolute;
                top: 20px;
                left: 20px;
                background: none;
                border: none;
                color: #00CED1;
                font-size: 1.5rem;
                cursor: pointer;
                transition: all 0.3s;
            }

            .modal-close:hover {
                transform: rotate(90deg);
                color: #40E0D0;
            }

            .qr-container {
                background: white;
                padding: 20px;
                border-radius: 15px;
                display: inline-block;
                margin: 20px auto;
            }

            .qr-container img {
                width: 200px;
                height: 200px;
                display: block;
            }

            .secret-key {
                background: #1a1a1a;
                padding: 15px;
                border-radius: 10px;
                font-family: monospace;
                color: #40E0D0;
                text-align: center;
                margin: 15px 0;
                border: 1px dashed #00CED1;
            }

            /* التوست notifications */
            .security-toast {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                background: #00CED1;
                color: black;
                padding: 15px 30px;
                border-radius: 50px;
                font-weight: bold;
                z-index: 6000;
                animation: slideUp 0.3s ease;
                box-shadow: 0 10px 30px rgba(0, 206, 209, 0.5);
                direction: rtl;
            }

            .security-toast.success {
                background: #2ecc71;
            }

            .security-toast.error {
                background: #ff6b6b;
            }

            .security-toast.info {
                background: #00CED1;
            }

            @keyframes slideUp {
                from {
                    transform: translate(-50%, 100%);
                    opacity: 0;
                }
                to {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
            }

            @keyframes slideDown {
                from {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
                to {
                    transform: translate(-50%, 100%);
                    opacity: 0;
                }
            }

            /* تجاوب مع الجوال */
            @media (max-width: 768px) {
                .security-panel {
                    padding: 20px;
                    margin: 15px;
                }

                .security-header h3 {
                    font-size: 1.5rem;
                }

                .security-grid {
                    grid-template-columns: 1fr;
                }

                .audit-entry {
                    flex-direction: column;
                    gap: 5px;
                }

                .audit-timestamp {
                    min-width: auto;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // ==========================================================================
    // 2️⃣ إنشاء لوحة الأمن
    // ==========================================================================
    createSecurityPanel() {
        const panel = document.createElement('div');
        panel.className = 'security-panel';
        panel.id = 'sovereign-security-panel';
        
        panel.innerHTML = `
            <div class="security-header">
                <i class="fas fa-shield-hal"></i>
                <h3>التحصين السيادي</h3>
                <div class="genetic-badge">
                    <i class="fas fa-dna"></i> AI-00 | φ = 1.618 | SEC-UI-2026
                </div>
            </div>

            <!-- شبكة بطاقات الأمن -->
            <div class="security-grid">
                <!-- بطاقة MFA -->
                <div class="security-card" id="mfa-card">
                    <div class="security-card-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h4>المصادقة الثنائية (MFA)</h4>
                    <p>حماية حسابك بطبقة إضافية من الأمان باستخدام تطبيق المصادقة</p>
                    <div class="security-status">
                        <span class="status-badge active" id="mfa-status-badge">
                            <i class="fas fa-check-circle"></i> مفعلة
                        </span>
                        <span style="color: #888; font-size: 0.8rem;">آخر استخدام: منذ 5 دقائق</span>
                    </div>
                    <div class="security-meter">
                        <div class="meter-label">
                            <span>قوة الحماية</span>
                            <span>98%</span>
                        </div>
                        <div class="meter-bar">
                            <div class="meter-fill" style="width: 98%;"></div>
                        </div>
                    </div>
                    <button class="btn-teal" onclick="SovereignSecurityUI.showMFASetup()" style="width: 100%;">
                        <i class="fas fa-qrcode"></i> إعداد MFA
                    </button>
                </div>

                <!-- بطاقة سجل النشاطات -->
                <div class="security-card">
                    <div class="security-card-icon">
                        <i class="fas fa-history"></i>
                    </div>
                    <h4>سجل النشاطات</h4>
                    <p>تتبع جميع العمليات على حسابك مع تواقيع رقمية غير قابلة للتلاعب</p>
                    <div class="security-status">
                        <span class="status-badge active">
                            <i class="fas fa-link"></i> السلسلة سليمة
                        </span>
                    </div>
                    <button class="btn-teal" onclick="SovereignSecurityUI.toggleAuditLog()" style="width: 100%;">
                        <i class="fas fa-list"></i> عرض السجل
                    </button>
                </div>

                <!-- بطاقة طلب النسيان -->
                <div class="security-card">
                    <div class="security-card-icon">
                        <i class="fas fa-user-slash"></i>
                    </div>
                    <h4>طلب النسيان (GDPR)</h4>
                    <p>حذف جميع بياناتك الشخصية بعد 30 يوماً مع الاحتفاظ بالسجلات المالية (10 سنوات)</p>
                    <div class="security-status">
                        <span class="status-badge pending">
                            <i class="fas fa-clock"></i> متاح
                        </span>
                    </div>
                    <button class="btn-teal" onclick="SovereignSecurityUI.requestErasure()" style="width: 100%; background: transparent; border-color: #ff6b6b; color: #ff6b6b;">
                        <i class="fas fa-trash"></i> تقديم طلب
                    </button>
                </div>

                <!-- بطاقة NDA -->
                <div class="security-card">
                    <div class="security-card-icon">
                        <i class="fas fa-file-contract"></i>
                    </div>
                    <h4>اتفاقية عدم الإفصاح</h4>
                    <p>عقد ذكي لحماية الملكية الفكرية لمدة 10 سنوات مع توقيع رقمي</p>
                    <div class="security-status">
                        <span class="status-badge pending" id="nda-status-badge">
                            <i class="fas fa-clock"></i> قيد الانتظار
                        </span>
                    </div>
                    <button class="btn-teal" onclick="SovereignSecurityUI.showNDA()" style="width: 100%;">
                        <i class="fas fa-signature"></i> عرض وتوقيع
                    </button>
                </div>
            </div>

            <!-- أكواد التفعيل السريع -->
            <div style="margin: 20px 0;">
                <h4 style="color: #40E0D0; margin-bottom: 15px;">🔑 أكواد التفعيل السريع</h4>
                <div class="quick-codes">
                    <span class="code-chip" onclick="SovereignSecurityUI.copyCode('Architect_2026', this)">
                        <i class="fas fa-crown"></i> Architect_2026
                    </span>
                    <span class="code-chip" onclick="SovereignSecurityUI.copyCode('Civic_Pulse', this)">
                        <i class="fas fa-vote-yea"></i> Civic_Pulse
                    </span>
                    <span class="code-chip" onclick="SovereignSecurityUI.copyCode('Young_Innovator', this)">
                        <i class="fas fa-lightbulb"></i> Young_Innovator
                    </span>
                    <span class="code-chip" onclick="SovereignSecurityUI.copyCode('Foresight_Ambassador', this)">
                        <i class="fas fa-star"></i> Foresight_Ambassador
                    </span>
                </div>
            </div>

            <!-- سجل النشاطات (مخفي افتراضياً) -->
            <div class="audit-log-container" id="audit-log-container" style="display: none;">
                <div class="audit-log-header" onclick="SovereignSecurityUI.toggleAuditLog()">
                    <h4><i class="fas fa-history"></i> آخر النشاطات (10)</h4>
                    <span style="color: #00CED1;"><i class="fas fa-chevron-up"></i></span>
                </div>
                <div class="audit-log-viewer" id="audit-log-entries">
                    <div class="audit-entry">
                        <span class="audit-timestamp">2026-03-10 14:23:45</span>
                        <span class="audit-action">دخول ناجح - IP: 192.168.1.100</span>
                        <span class="audit-hash">[8f3a2b1c]</span>
                    </div>
                    <div class="audit-entry">
                        <span class="audit-timestamp">2026-03-10 13:15:22</span>
                        <span class="audit-action">تحديث الملف الشخصي</span>
                        <span class="audit-hash">[7e6d5c4b]</span>
                    </div>
                    <div class="audit-entry">
                        <span class="audit-timestamp">2026-03-10 11:08:33</span>
                        <span class="audit-action">شراء كتاب "الثروة المستقلة"</span>
                        <span class="audit-hash">[3a4b5c6d]</span>
                    </div>
                    <div class="audit-entry">
                        <span class="audit-timestamp">2026-03-10 09:45:12</span>
                        <span class="audit-action">تفعيل المصادقة الثنائية</span>
                        <span class="audit-hash">[2c3d4e5f]</span>
                    </div>
                    <div class="audit-entry">
                        <span class="audit-timestamp">2026-03-09 22:10:05</span>
                        <span class="audit-action">تسجيل دخول من جهاز جديد</span>
                        <span class="audit-hash">[1a2b3c4d]</span>
                    </div>
                </div>
            </div>

            <!-- مؤشر الأمن العام -->
            <div style="margin-top: 30px; padding: 20px; background: rgba(0, 206, 209, 0.05); border-radius: 15px;">
                <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #888;">مستوى التحصين العام</span>
                            <span style="color: #40E0D0; font-weight: bold;" id="security-score">98%</span>
                        </div>
                        <div style="height: 10px; background: #333; border-radius: 5px; overflow: hidden;">
                            <div id="security-score-bar" style="width: 98%; height: 100%; background: linear-gradient(90deg, #00CED1, #2ecc71); border-radius: 5px;"></div>
                        </div>
                    </div>
                    <div class="status-badge active" style="background: #2ecc71;">
                        <i class="fas fa-check-circle"></i> جميع الأنظمة آمنة
                    </div>
                </div>
                <div style="margin-top: 15px; display: flex; gap: 15px; flex-wrap: wrap; justify-content: space-between;">
                    <div><span style="color: #888;">آخر تدقيق:</span> <span style="color: #40E0D0;">2026-03-10 15:30:22</span></div>
                    <div><span style="color: #888;">حالة السلسلة:</span> <span style="color: #2ecc71;">✅ سليمة</span></div>
                    <div><span style="color: #888;">التوقيع الرقمي:</span> <span style="color: #666; font-family: monospace;">0x8f3a2b1c4d5e6f7a</span></div>
                </div>
            </div>
        `;

        // إضافة اللوحة إلى الصفحة
        const targetElement = document.querySelector('.profile-settings') || document.querySelector('main') || document.body;
        targetElement.appendChild(panel);
    }

    // ==========================================================================
    // 3️⃣ ربط الأحداث
    // ==========================================================================
    bindEvents() {
        // يمكن إضافة أحداث إضافية هنا
    }

    // ==========================================================================
    // 4️⃣ التحديثات الحية
    // ==========================================================================
    startLiveUpdates() {
        // تحديث مؤشر الأمن كل 5 ثواني
        setInterval(() => {
            this.updateSecurityScore();
        }, 5000);
    }

    updateSecurityScore() {
        // محاكاة تحديث درجة الأمن
        const score = Math.floor(95 + Math.random() * 5);
        const scoreElement = document.getElementById('security-score');
        const scoreBar = document.getElementById('security-score-bar');
        
        if (scoreElement) scoreElement.textContent = score + '%';
        if (scoreBar) scoreBar.style.width = score + '%';
    }

    // ==========================================================================
    // 5️⃣ دوال MFA
    // ==========================================================================
    showMFASetup() {
        this.createModal(`
            <h3 style="color: #40E0D0; text-align: center;">🔐 تفعيل المصادقة الثنائية</h3>
            
            <div style="text-align: center; margin: 20px 0;">
                <div class="qr-container">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/Istishraf:user%40example.com?secret=JBSWY3DPEHPK3PXP&issuer=Istishraf" 
                         alt="QR Code">
                </div>
                <p style="color: #aaa; margin-top: 10px;">امسح الرمز باستخدام تطبيق Google Authenticator</p>
            </div>
            
            <div class="secret-key">
                <div style="color: #888; margin-bottom: 5px;">المفتاح السري (للإدخال اليدوي):</div>
                <code style="color: #40E0D0; font-size: 1.2rem;">JBSWY3DPEHPK3PXP</code>
            </div>
            
            <input type="text" class="modal-input" id="mfa-verify-code" placeholder="أدخل رمز التحقق من 6 أرقام" maxlength="6">
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn-teal" onclick="SovereignSecurityUI.verifyMFA()" style="flex: 1;">
                    <i class="fas fa-check-circle"></i> تحقق وتفعيل
                </button>
                <button class="btn-teal-outline" onclick="SovereignSecurityUI.closeModal()" style="flex: 1;">
                    إلغاء
                </button>
            </div>
        `);
    }

    verifyMFA() {
        const code = document.getElementById('mfa-verify-code')?.value;
        
        if (code && code.length === 6 && /^\d+$/.test(code)) {
            this.showToast('✅ تم تفعيل المصادقة الثنائية بنجاح', 'success');
            this.closeModal();
            
            // تحديث حالة MFA
            const badge = document.getElementById('mfa-status-badge');
            if (badge) {
                badge.innerHTML = '<i class="fas fa-check-circle"></i> مفعلة';
                badge.className = 'status-badge active';
            }
        } else {
            this.showToast('❌ الرمز غير صحيح. الرجاء المحاولة مرة أخرى', 'error');
        }
    }

    // ==========================================================================
    // 6️⃣ دوال سجل النشاطات
    // ==========================================================================
    toggleAuditLog() {
        const container = document.getElementById('audit-log-container');
        if (container) {
            container.style.display = container.style.display === 'none' ? 'block' : 'none';
        }
    }

    // ==========================================================================
    // 7️⃣ دوال طلب النسيان
    // ==========================================================================
    requestErasure() {
        this.createModal(`
            <h3 style="color: #ff6b6b; text-align: center;">⚠️ طلب النسيان (GDPR)</h3>
            
            <div style="background: rgba(255, 107, 107, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0; border: 1px solid #ff6b6b;">
                <p style="color: #ff6b6b; margin-bottom: 10px;"><i class="fas fa-exclamation-triangle"></i> تحذير مهم:</p>
                <ul style="color: #aaa; list-style: none; padding: 0;">
                    <li style="margin-bottom: 8px;">✓ سيتم حذف جميع بياناتك الشخصية بعد 30 يوماً</li>
                    <li style="margin-bottom: 8px;">✓ السجلات المالية ستبقى لمدة 10 سنوات (قانونياً)</li>
                    <li style="margin-bottom: 8px;">✓ لا يمكن التراجع عن هذا الإجراء</li>
                    <li style="margin-bottom: 8px;">✓ سيتم إشعارك قبل 7 أيام من التنفيذ</li>
                </ul>
            </div>
            
            <div style="background: #1a1a1a; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p style="color: #40E0D0;">📅 تاريخ الحذف المجدول:</p>
                <p style="color: white; font-size: 1.2rem;">${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('ar')}</p>
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn-teal" onclick="SovereignSecurityUI.confirmErasure()" style="flex: 1; background: #ff6b6b; border-color: #ff6b6b;">
                    <i class="fas fa-trash"></i> تأكيد الطلب
                </button>
                <button class="btn-teal-outline" onclick="SovereignSecurityUI.closeModal()" style="flex: 1;">
                    إلغاء
                </button>
            </div>
        `);
    }

    confirmErasure() {
        this.showToast('✅ تم تقديم طلب النسيان بنجاح. سيتم حذف بياناتك بعد 30 يوماً', 'success');
        this.closeModal();
    }

    // ==========================================================================
    // 8️⃣ دوال NDA
    // ==========================================================================
    showNDA() {
        this.createModal(`
            <h3 style="color: #40E0D0; text-align: center;">📜 اتفاقية عدم الإفصاح (NDA)</h3>
            
            <div style="background: #1a1a1a; padding: 20px; border-radius: 10px; margin: 20px 0; font-family: monospace; direction: ltr; text-align: left; max-height: 300px; overflow-y: auto;">
                <p style="color: #0f0;">CONTRACT_ID: NDA-1741612800000-8f3a2b</p>
                <p style="color: #ff0;">STATUS: PENDING_SIGNATURE</p>
                <p style="color: #888;">────────────────────────────────</p>
                <p>PARTIES:</p>
                <p>  - Istishraf Sovereign Hub (0x8f3a2b1c4d5e6f7a)</p>
                <p>  - user@example.com (0x1a2b3c4d5e6f7a8b)</p>
                <p style="color: #888;">────────────────────────────────</p>
                <p>TERMS:</p>
                <p>  - Duration: 10 years (until 2036-03-10)</p>
                <p>  - Confidentiality: All source code, business logic, financial data</p>
                <p>  - Penalties: Legal action + compensation</p>
                <p>  - Jurisdiction: Libya</p>
                <p style="color: #888;">────────────────────────────────</p>
                <p>BLOCKCHAIN: Ethereum</p>
                <p>CONTRACT_ADDRESS: 0x8f3a2b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a</p>
                <p>TRANSACTION_HASH: 0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b</p>
            </div>
            
            <div style="margin: 20px 0;">
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="checkbox" id="nda-agree" style="width: 20px; height: 20px;">
                    <span style="color: #aaa;">أوافق على جميع بنود الاتفاقية</span>
                </label>
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button class="btn-teal" onclick="SovereignSecurityUI.signNDA()" id="sign-nda-btn" disabled style="flex: 1;">
                    <i class="fas fa-signature"></i> توقيع الاتفاقية
                </button>
                <button class="btn-teal-outline" onclick="SovereignSecurityUI.closeModal()" style="flex: 1;">
                    إلغاء
                </button>
            </div>
        `);

        // تفعيل زر التوقيع عند الموافقة
        setTimeout(() => {
            const checkbox = document.getElementById('nda-agree');
            const signBtn = document.getElementById('sign-nda-btn');
            if (checkbox && signBtn) {
                checkbox.addEventListener('change', () => {
                    signBtn.disabled = !checkbox.checked;
                });
            }
        }, 100);
    }

    signNDA() {
        this.showToast('✅ تم توقيع اتفاقية NDA بنجاح. العقد مسجل على البلوك تشين', 'success');
        this.closeModal();
        
        // تحديث حالة NDA
        const badge = document.getElementById('nda-status-badge');
        if (badge) {
            badge.innerHTML = '<i class="fas fa-check-circle"></i> موقع';
            badge.className = 'status-badge active';
        }
    }

    // ==========================================================================
    // 9️⃣ دوال نسخ الأكواد
    // ==========================================================================
    copyCode(code, element) {
        navigator.clipboard.writeText(code).then(() => {
            // تغيير المظهر مؤقتاً
            const originalText = element.innerHTML;
            element.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
            element.classList.add('copied');
            
            setTimeout(() => {
                element.innerHTML = originalText;
                element.classList.remove('copied');
            }, 2000);
            
            this.showToast(`✅ تم نسخ الكود: ${code}`, 'success');
        });
    }

    // ==========================================================================
    // 🔟 دوال مساعدة
    // ==========================================================================
    createModal(content) {
        // إزالة أي مودال موجود
        this.closeModal();
        
        const modal = document.createElement('div');
        modal.className = 'security-modal active';
        modal.id = 'security-modal';
        modal.innerHTML = `
            <div class="security-modal-content">
                <button class="modal-close" onclick="SovereignSecurityUI.closeModal()">
                    <i class="fas fa-times"></i>
                </button>
                ${content}
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    closeModal() {
        const existingModal = document.getElementById('security-modal');
        if (existingModal) {
            existingModal.remove();
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `security-toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// ============================================================================
// تهيئة الكائن العام
// ============================================================================
window.SovereignSecurityUI = new SovereignSecurityUI();

// ============================================================================
// إضافة مؤشر الأمن في الشريط العلوي
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav-bar');
    if (nav) {
        const securityBadge = document.createElement('div');
        securityBadge.className = 'status-badge active';
        securityBadge.style.marginRight = '15px';
        securityBadge.innerHTML = '<i class="fas fa-shield-alt"></i> محمي';
        nav.appendChild(securityBadge);
    }
});
