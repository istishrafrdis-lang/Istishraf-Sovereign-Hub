/* ============================================================================
   📋  مدقق الامتثال - Compliance Checker
   ============================================================================
   الإصدار: 2.0 | التاريخ: 2026-03-10
   ============================================================================ */

const ComplianceChecker = {
    // معايير الامتثال
    standards: {
        gdpr: {
            required: ['right_to_erasure', 'data_portability', 'breach_notification'],
            implemented: []
        },
        nda: {
            required: ['smart_contract', 'digital_signature', '10_year_retention'],
            implemented: []
        },
        security: {
            required: ['mfa', 'encryption', 'audit_trail', 'four_eyes'],
            implemented: []
        }
    },
    
    // تقرير الامتثال
    generateReport: function() {
        // التحقق من تنفيذ GDPR
        this.standards.gdpr.implemented = [];
        if (window.IstishrafSecurity?.RightToErasure) {
            this.standards.gdpr.implemented.push('right_to_erasure');
            this.standards.gdpr.implemented.push('data_portability');
        }
        if (window.IstishrafSecurity?.BreachNotificationSystem) {
            this.standards.gdpr.implemented.push('breach_notification');
        }
        
        // التحقق من تنفيذ NDA
        if (window.IstishrafSecurity?.NDASmartContract) {
            this.standards.nda.implemented.push('smart_contract');
            this.standards.nda.implemented.push('digital_signature');
            this.standards.nda.implemented.push('10_year_retention');
        }
        
        // التحقق من تنفيذ الأمن
        if (window.IstishrafSecurity?.MFAHandler) {
            this.standards.security.implemented.push('mfa');
        }
        if (window.IstishrafSecurity?.CryptoQuad) {
            this.standards.security.implemented.push('encryption');
        }
        if (window.IstishrafSecurity?.AuditTrail) {
            this.standards.security.implemented.push('audit_trail');
        }
        if (window.IstishrafSecurity?.FourEyesPrinciple) {
            this.standards.security.implemented.push('four_eyes');
        }
        
        // حساب نسب الامتثال
        const report = {
            generatedAt: new Date().toISOString(),
            overall: 0,
            standards: {}
        };
        
        for (const [standard, data] of Object.entries(this.standards)) {
            const percentage = (data.implemented.length / data.required.length) * 100;
            report.standards[standard] = {
                required: data.required,
                implemented: data.implemented,
                missing: data.required.filter(r => !data.implemented.includes(r)),
                percentage: percentage.toFixed(1) + '%',
                compliant: percentage === 100
            };
        }
        
        // المتوسط العام
        const totalPercentage = Object.values(report.standards)
            .reduce((acc, s) => acc + parseFloat(s.percentage), 0) / Object.keys(report.standards).length;
        report.overall = totalPercentage.toFixed(1) + '%';
        
        return report;
    },
    
    // عرض تقرير الامتثال
    showReport: function() {
        const report = this.generateReport();
        
        console.log('📋 Compliance Report', report);
        
        // إنشاء مودال عرض التقرير
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px; max-height: 80vh; overflow-y: auto;">
                <button class="modal-close" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
                <h3 style="color: var(--teal-light);">📋 تقرير الامتثال السيادي</h3>
                <p style="color: #aaa; margin-bottom: 20px;">آخر تحديث: ${new Date(report.generatedAt).toLocaleString('ar')}</p>
                
                <div style="margin-bottom: 20px; padding: 15px; background: var(--teal-glass); border-radius: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 1.2rem; font-weight: bold;">الامتثال العام</span>
                        <span style="font-size: 2rem; color: var(--teal-light);">${report.overall}</span>
                    </div>
                    <div style="height: 10px; background: #333; border-radius: 5px; margin-top: 10px;">
                        <div style="width: ${report.overall}; height: 100%; background: linear-gradient(90deg, var(--teal-dark), #2ecc71); border-radius: 5px;"></div>
                    </div>
                </div>
                
                ${Object.entries(report.standards).map(([key, value]) => `
                    <div style="margin-bottom: 15px; padding: 15px; border: 1px solid var(--teal-dark); border-radius: 10px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <h4 style="color: white; margin: 0;">${key.toUpperCase()}</h4>
                            <span style="color: ${value.compliant ? '#2ecc71' : '#ff6b6b'};">
                                ${value.percentage} ${value.compliant ? '✅' : '⚠️'}
                            </span>
                        </div>
                        
                        <div style="margin: 10px 0;">
                            <p style="color: #888; margin-bottom: 5px;">✓ المنفذ:</p>
                            ${value.implemented.map(i => `<span style="display: inline-block; background: #2ecc71; color: black; padding: 2px 10px; border-radius: 20px; font-size: 0.8rem; margin-left: 5px; margin-bottom: 5px;">${i}</span>`).join('')}
                        </div>
                        
                        ${value.missing.length > 0 ? `
                            <div>
                                <p style="color: #888; margin-bottom: 5px;">✗ المفقود:</p>
                                ${value.missing.map(i => `<span style="display: inline-block; background: #ff6b6b; color: black; padding: 2px 10px; border-radius: 20px; font-size: 0.8rem; margin-left: 5px;">${i}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="btn-teal" onclick="this.closest('.modal').remove()">إغلاق</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
};

window.ComplianceChecker = ComplianceChecker;
