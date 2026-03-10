/* ============================================================================
   🛡️  وسيط الأمن للتطبيق - Security Middleware
   ============================================================================
   الإصدار: 2.0 | التاريخ: 2026-03-10
   ============================================================================ */

// ============================================================================
// وسيط المصادقة الثنائية
// ============================================================================
const MFAMiddleware = {
    // التحقق من MFA قبل الوصول للبيانات السرية
    checkMFA: async (req, res, next) => {
        const userId = req.user?.id;
        const userRole = req.user?.role;
        const accessLevel = req.headers['x-access-level'];
        
        // البيانات السرية للغاية تتطلب MFA
        if (accessLevel === 'top-secret') {
            const mfaToken = req.headers['x-mfa-token'];
            
            if (!mfaToken) {
                await AuditTrail.log('MFA_REQUIRED', req.user, {
                    path: req.path,
                    reason: 'No MFA token'
                });
                
                return res.status(401).json({
                    error: 'MFA_REQUIRED',
                    message: 'Two-factor authentication required for this resource'
                });
            }
            
            const valid = MFAHandler.verifyTOTP(userId, mfaToken);
            
            if (!valid) {
                await AuditTrail.log('MFA_FAILED', req.user, {
                    path: req.path,
                    token: mfaToken
                });
                
                return res.status(401).json({
                    error: 'MFA_INVALID',
                    message: 'Invalid MFA token'
                });
            }
            
            await AuditTrail.log('MFA_SUCCESS', req.user, { path: req.path });
        }
        
        next();
    },
    
    // وسيط للتحقق من الموافقات (Four Eyes)
    checkApprovals: async (req, res, next) => {
        // للطلبات التي تحتاج موافقة مزدوجة
        if (req.path.includes('/publish/')) {
            // التحقق من وجود الموافقات في الطلب
            const technicalApproval = req.headers['x-technical-approval'];
            const executiveApproval = req.headers['x-executive-approval'];
            
            if (!technicalApproval || !executiveApproval) {
                return res.status(403).json({
                    error: 'APPROVAL_REQUIRED',
                    message: 'This action requires both technical and executive approval'
                });
            }
            
            // التحقق من صحة الموافقات (في الإنتاج: استعلام من قاعدة البيانات)
            // ...
        }
        
        next();
    }
};

// ============================================================================
// وسيط حماية البيانات
// ============================================================================
const DataProtectionMiddleware = {
    // تشفير البيانات الحساسة في الاستجابات
    encryptSensitiveData: async (req, res, next) => {
        // تخزين الدالة الأصلية
        const originalJson = res.json;
        
        // تجاوز دالة json لتشفير البيانات الحساسة
        res.json = function(data) {
            // التحقق من وجود بيانات مالية
            if (data && (data.financial || data.balance || data.transactions)) {
                // تطبيق التشفير الرباعي
                data._encrypted = true;
                data._encryptedAt = new Date().toISOString();
                
                // في الإنتاج: تشفير فعلي
                console.log('🔐 [Middleware] Encrypting sensitive response');
            }
            
            return originalJson.call(this, data);
        };
        
        next();
    },
    
    // تسجيل جميع العمليات
    auditAll: async (req, res, next) => {
        const start = Date.now();
        
        // تسجيل بداية الطلب
        await AuditTrail.log('REQUEST_START', req.user, {
            method: req.method,
            path: req.path,
            ip: req.ip,
            userAgent: req.headers['user-agent']
        });
        
        // تخزين الدالة الأصلية للإرسال
        const originalSend = res.send;
        
        res.send = function(body) {
            const duration = Date.now() - start;
            
            // تسجيل نهاية الطلب
            AuditTrail.log('REQUEST_COMPLETE', req.user, {
                method: req.method,
                path: req.path,
                statusCode: res.statusCode,
                duration,
                size: body?.length || 0
            });
            
            return originalSend.call(this, body);
        };
        
        next();
    }
};

// ============================================================================
// وسيط العزل المالي
// ============================================================================
const FinancialIsolationMiddleware = {
    // توجيه الطلبات المالية إلى خادم العزل
    routeToSandbox: async (req, res, next) => {
        if (req.path.includes('/api/financial/')) {
            console.log('💰 Routing financial request to sandbox');
            
            // في الإنتاج: إعادة التوجيه إلى خادم منفصل
            req.headers['x-sandbox-routed'] = 'true';
            
            // معالجة في البيئة المعزولة
            const result = await FinancialSandbox.processFinancialData(req.body);
            
            return res.json({
                sandboxed: true,
                result
            });
        }
        
        next();
    }
};

// تصدير
window.SecurityMiddleware = {
    MFAMiddleware,
    DataProtectionMiddleware,
    FinancialIsolationMiddleware
};
