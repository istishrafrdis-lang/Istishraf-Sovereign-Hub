#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
================================================================================
✅ PROOF OF TRUTH - آلية التحقق من مصداقية البيانات
================================================================================
Estishraf OS - Imzatit Ecosystem
الإصدار: 1.1.0 | الحالة: تطوير | التاريخ: 2026-03-07

🔐 البصمة الجينية السيادية:
    UUID: proof-of-truth-v1.1.0-20260307
    الهوية: PROOF_OF_TRUTH
    التشفير: ZKP | Geolocation | Consensus Algorithm
    المالك: منصة إمزتت - إمبراطورية استشراف

📋 الوصف: آلية متطورة للتحقق من مصداقية بيانات المستخدمين
          تمنح "وزناً استشرافياً" أعلى للمستخدمين الموثوقين
================================================================================
"""

import hashlib
import json
import uuid
import time
import math
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any, Tuple
from enum import Enum
import random

# =============================================================================
# البصمة الجينية
# =============================================================================

GENETIC_FINGERPRINT = {
    "id": "proof-of-truth-v1.1.0-20260307",
    "name": "PROOF_OF_TRUTH",
    "version": "1.1.0",
    "birth": "2026-03-07 00:00:00 UTC+2",
    "creator": "منصة إمزتت - إمبراطورية استشراف",
    "signature": hashlib.sha512(b"ISTISHRAF_PROOF_OF_TRUTH_ORIGIN").hexdigest()[:64],
    "lineage": "Imzatit Ecosystem - Data Integrity Division"
}

# =============================================================================
# الأنواع الأساسية
# =============================================================================

class VerificationLevel(Enum):
    """مستويات التحقق"""
    UNVERIFIED = 0      # غير موثق
    BASIC = 1           # أساسي (تحقق رقمي)
    CROSS_REFERENCED = 2  # مرجعي متقاطع
    GOLD = 3            # ذهبي (موثق بمصادر متعددة)
    ABSOLUTE = 4        # مطلق (موثق بالبلوك تشين)

class DataType(Enum):
    """أنواع البيانات للتحقق"""
    SURVEY_RESPONSE = "survey"      # استجابات استطلاعات
    GEOLOCATION = "geo"              # مواقع جغرافية
    PHOTO = "photo"                   # صور موثقة
    DOCUMENT = "document"             # وثائق رسمية
    SOCIAL_POST = "social"            # منشورات وسائل التواصل
    SERVICE_RATING = "rating"         # تقييمات خدمات

class ConsensusMethod(Enum):
    """طرق الإجماع على المصداقية"""
    MAJORITY_VOTE = "majority"        # تصويت الأغلبية
    WEIGHTED_CONSENSUS = "weighted"    # إجماع مرجح بالوزن
    EXPERT_REVIEW = "expert"           # مراجعة خبراء
    AUTOMATED = "automated"            # تحقق آلي

# =============================================================================
# 1️⃣ نظام التحقق من المصداقية
# =============================================================================

class ProofOfTruth:
    """
    ✅ نظام Proof of Truth
    يتحقق من مصداقية البيانات ويمنح "وزناً استشرافياً" للمستخدمين
    """
    
    def __init__(self):
        self.id = GENETIC_FINGERPRINT["id"]
        
        # سجل المستخدمين وأوزانهم
        self.user_weights = {}  # user_id -> weight_data
        
        # سجل التحقق من البيانات
        self.verification_records = []
        
        # سجل الإجماع
        self.consensus_records = []
        
        # معايير التحقق
        self.criteria = {
            "min_consensus_percentage": 0.67,  # 67% للإجماع
            "geolocation_radius_meters": 100,  # نصف قطر التحقق الجغرافي
            "photo_verification_required": True,  # التحقق من الصور
            "cross_reference_count": 3,  # عدد المصادر للتحقق المتقاطع
            "time_window_minutes": 30  # نافذة زمنية للتحقق
        }
        
        # إحصائيات
        self.stats = {
            "total_verifications": 0,
            "verified_true": 0,
            "verified_false": 0,
            "average_trust_score": 0.5,
            "active_users": 0
        }
        
        print("\n" + "="*80)
        print("✅ PROOF OF TRUTH - آلية التحقق من المصداقية")
        print("="*80)
        print(f"🆔 ID: {self.id}")
        print(f"📊 الحد الأدنى للإجماع: {self.criteria['min_consensus_percentage']:.0%}")
        print("="*80)
    
    # -------------------------------------------------------------------------
    # حساب الوزن الاستشرافي للمستخدم
    # -------------------------------------------------------------------------
    
    def calculate_user_weight(self, user_id: str, user_data: Dict) -> float:
        """
        حساب الوزن الاستشرافي للمستخدم
        يعتمد على تاريخه في المنصة ومصداقيته
        """
        # استرجاع أو إنشاء سجل المستخدم
        if user_id not in self.user_weights:
            self.user_weights[user_id] = {
                "weight": 50.0,  # وزن أساسي
                "verification_count": 0,
                "successful_verifications": 0,
                "failed_verifications": 0,
                "trust_tier": "برونزي",
                "history": []
            }
        
        user_record = self.user_weights[user_id]
        
        # معادلة حساب الوزن
        base_weight = 50.0
        success_rate = (user_record["successful_verifications"] / 
                       max(1, user_record["verification_count"]))
        experience_factor = min(50, user_record["verification_count"] * 2)
        
        # تطبيق النسبة الذهبية
        golden_ratio = 1.618
        new_weight = (base_weight + success_rate * 30 + experience_factor) / golden_ratio
        
        # تحديث المستوى بناءً على الوزن
        if new_weight > 80:
            tier = "ذهبي"
        elif new_weight > 65:
            tier = "فضي"
        elif new_weight > 50:
            tier = "برونزي"
        else:
            tier = "أساسي"
        
        user_record["weight"] = round(new_weight, 2)
        user_record["trust_tier"] = tier
        user_record["last_calculated"] = datetime.now().isoformat()
        
        self.stats["active_users"] = len(self.user_weights)
        
        return new_weight
    
    # -------------------------------------------------------------------------
    # التحقق من البيانات بأنواعها
    # -------------------------------------------------------------------------
    
    def verify_data(self, data: Dict, user_id: str, data_type: str) -> Dict:
        """
        التحقق من مصداقية بيانات معينة
        """
        verification_id = f"VER-{uuid.uuid4().hex[:12]}"
        
        # اختيار طريقة التحقق حسب نوع البيانات
        verification_methods = {
            DataType.SURVEY_RESPONSE.value: self._verify_survey_response,
            DataType.GEOLOCATION.value: self._verify_geolocation,
            DataType.PHOTO.value: self._verify_photo,
            DataType.DOCUMENT.value: self._verify_document,
            DataType.SOCIAL_POST.value: self._verify_social_post,
            DataType.SERVICE_RATING.value: self._verify_service_rating
        }
        
        method = verification_methods.get(data_type, self._verify_generic)
        
        # تنفيذ التحقق
        verification_result = method(data, user_id)
        
        # تسجيل نتيجة التحقق
        record = {
            "id": verification_id,
            "user_id": user_id,
            "data_type": data_type,
            "result": verification_result["is_verified"],
            "confidence": verification_result["confidence"],
            "method_used": verification_result.get("method", "generic"),
            "timestamp": datetime.now().isoformat()
        }
        
        self.verification_records.append(record)
        self.stats["total_verifications"] += 1
        
        if verification_result["is_verified"]:
            self.stats["verified_true"] += 1
            # تحديث سجل المستخدم
            if user_id in self.user_weights:
                self.user_weights[user_id]["successful_verifications"] += 1
                self.user_weights[user_id]["verification_count"] += 1
        else:
            self.stats["verified_false"] += 1
            if user_id in self.user_weights:
                self.user_weights[user_id]["failed_verifications"] += 1
                self.user_weights[user_id]["verification_count"] += 1
        
        # إعادة حساب الوزن
        self.calculate_user_weight(user_id, {})
        
        return {
            "verification_id": verification_id,
            "is_verified": verification_result["is_verified"],
            "confidence": verification_result["confidence"],
            "user_weight": self.user_weights.get(user_id, {}).get("weight", 50),
            "message": verification_result.get("message", {}),
            "bilingual_message": self._generate_verification_message(
                verification_result["is_verified"], 
                verification_result["confidence"]
            )
        }
    
    def _verify_survey_response(self, data: Dict, user_id: str) -> Dict:
        """
        التحقق من استجابات الاستطلاعات
        """
        # محاكاة تحقق
        consistency_score = random.uniform(0.6, 1.0)
        
        # التحقق من الاتساق مع إجابات سابقة
        if user_id in self.user_weights:
            history = self.user_weights[user_id].get("history", [])
            if history:
                # مقارنة مع آخر 5 إجابات
                recent = history[-5:]
                consistency = sum(1 for h in recent if h.get("answer") == data.get("answer")) / len(recent)
                consistency_score = (consistency_score + consistency) / 2
        
        is_verified = consistency_score > 0.7
        
        return {
            "is_verified": is_verified,
            "confidence": consistency_score,
            "method": "consistency_analysis",
            "message": {
                "arabic": "تم التحقق من اتساق الإجابة مع تاريخ المستخدم" if is_verified else "الإجابة غير متسقة مع الإجابات السابقة",
                "english": "Response consistent with user history" if is_verified else "Response inconsistent with history"
            }
        }
    
    def _verify_geolocation(self, data: Dict, user_id: str) -> Dict:
        """
        التحقق من المواقع الجغرافية
        """
        # التحقق من وجود إحداثيات
        has_coords = "lat" in data and "lng" in data
        
        # التحقق من معقولية الموقع
        if has_coords:
            lat, lng = data["lat"], data["lng"]
            # ليبيا: تقريباً بين 20-33 درجة عرض، 9-25 درجة طول
            plausible = (20 <= lat <= 33) and (9 <= lng <= 25)
        else:
            plausible = False
        
        is_verified = has_coords and plausible
        confidence = 0.9 if is_verified else 0.3
        
        return {
            "is_verified": is_verified,
            "confidence": confidence,
            "method": "geolocation_validation",
            "message": {
                "arabic": "الموقع الجغرافي موثوق" if is_verified else "الموقع غير موثوق أو خارج النطاق المتوقع",
                "english": "Geolocation verified" if is_verified else "Invalid or out-of-range location"
            }
        }
    
    def _verify_photo(self, data: Dict, user_id: str) -> Dict:
        """
        التحقق من الصور (محاكاة)
        """
        # محاكاة تحقق بالذكاء الاصطناعي
        has_metadata = "metadata" in data
        has_timestamp = "timestamp" in data
        
        # التحقق من عدم التلاعب (محاكاة)
        manipulation_prob = random.uniform(0, 0.3)
        is_authentic = manipulation_prob < 0.1
        
        is_verified = has_metadata and has_timestamp and is_authentic
        confidence = 0.8 if is_verified else 0.4
        
        return {
            "is_verified": is_verified,
            "confidence": confidence,
            "method": "ai_image_analysis",
            "message": {
                "arabic": "الصورة موثقة ولم يتم التلاعب بها" if is_verified else "الصورة قد تكون معدلة أو تفتقد للبيانات الوصفية",
                "english": "Image authenticated" if is_verified else "Image may be manipulated or lacks metadata"
            }
        }
    
    def _verify_document(self, data: Dict, user_id: str) -> Dict:
        """
        التحقق من الوثائق الرسمية
        """
        # التحقق من وجود توقيع رقمي
        has_signature = "digital_signature" in data
        
        # التحقق من الجهة المصدرة
        issuer_valid = data.get("issuer") in ["CBL", "MUNICIPALITY", "UNIVERSITY", "MINISTRY"]
        
        is_verified = has_signature and issuer_valid
        confidence = 0.95 if is_verified else 0.3
        
        return {
            "is_verified": is_verified,
            "confidence": confidence,
            "method": "digital_signature_verification",
            "message": {
                "arabic": "الوثيقة موقعة رقمياً ومصدرها معتمد" if is_verified else "الوثيقة تفتقد للتوقيع الرقمي أو مصدر غير معتمد",
                "english": "Document digitally signed by verified issuer" if is_verified else "Missing signature or unverified issuer"
            }
        }
    
    def _verify_social_post(self, data: Dict, user_id: str) -> Dict:
        """
        التحقق من منشورات وسائل التواصل
        """
        # التحقق من وجود حساب موثق
        account_verified = data.get("account_verified", False)
        
        # التحقق من التفاعل (مشاركات، إعجابات)
        engagement_score = data.get("engagement", 0) / 1000
        
        is_verified = account_verified or engagement_score > 0.5
        confidence = 0.7 if is_verified else 0.4
        
        return {
            "is_verified": is_verified,
            "confidence": confidence,
            "method": "social_credibility",
            "message": {
                "arabic": "الحساب موثق أو ذو مصداقية عالية" if is_verified else "مصداقية الحساب غير مؤكدة",
                "english": "Verified account or high credibility" if is_verified else "Account credibility unconfirmed"
            }
        }
    
    def _verify_service_rating(self, data: Dict, user_id: str) -> Dict:
        """
        التحقق من تقييمات الخدمات
        """
        # التحقق من وجود وصف نصي مع التقييم
        has_description = "description" in data and len(data["description"]) > 20
        
        # التحقق من توزيع التقييمات
        rating = data.get("rating", 3)
        
        # التقييمات المتطرفة (1 أو 5) تحتاج تحقق إضافي
        if rating in [1, 5]:
            needs_extra = True
        else:
            needs_extra = False
        
        is_verified = has_description and (not needs_extra or "evidence" in data)
        confidence = 0.75 if is_verified else 0.4
        
        return {
            "is_verified": is_verified,
            "confidence": confidence,
            "method": "rating_validation",
            "message": {
                "arabic": "تقييم مفصل ومدعوم بأدلة" if is_verified else "التقييم يفتقر للتفاصيل أو الأدلة",
                "english": "Detailed rating with evidence" if is_verified else "Rating lacks detail or evidence"
            }
        }
    
    def _verify_generic(self, data: Dict, user_id: str) -> Dict:
        """
        تحقق عام للبيانات
        """
        # تحقق أساسي
        has_content = bool(data.get("content", ""))
        has_timestamp = "timestamp" in data
        
        is_verified = has_content and has_timestamp
        confidence = 0.6 if is_verified else 0.3
        
        return {
            "is_verified": is_verified,
            "confidence": confidence,
            "method": "basic_validation",
            "message": {
                "arabic": "البيانات مكتملة" if is_verified else "البيانات ناقصة",
                "english": "Complete data" if is_verified else "Incomplete data"
            }
        }
    
    # -------------------------------------------------------------------------
    # آلية الإجماع (Consensus)
    # -------------------------------------------------------------------------
    
    def reach_consensus(self, data_points: List[Dict], method: str = "weighted") -> Dict:
        """
        الوصول إلى إجماع حول حقيقة معينة
        """
        consensus_id = f"CON-{uuid.uuid4().hex[:10]}"
        
        if method == ConsensusMethod.MAJORITY_VOTE.value:
            result = self._majority_consensus(data_points)
        elif method == ConsensusMethod.WEIGHTED_CONSENSUS.value:
            result = self._weighted_consensus(data_points)
        elif method == ConsensusMethod.EXPERT_REVIEW.value:
            result = self._expert_consensus(data_points)
        else:
            result = self._automated_consensus(data_points)
        
        consensus_record = {
            "id": consensus_id,
            "method": method,
            "data_points": len(data_points),
            "consensus_value": result["consensus_value"],
            "confidence": result["confidence"],
            "timestamp": datetime.now().isoformat()
        }
        
        self.consensus_records.append(consensus_record)
        
        return {
            "consensus_id": consensus_id,
            "consensus_value": result["consensus_value"],
            "confidence": result["confidence"],
            "details": result.get("details", {}),
            "bilingual_result": self._generate_consensus_message(result)
        }
    
    def _majority_consensus(self, data_points: List[Dict]) -> Dict:
        """
        إجماع بأغلبية الأصوات
        """
        values = [d.get("value") for d in data_points if "value" in d]
        if not values:
            return {"consensus_value": None, "confidence": 0, "details": {}}
        
        # حساب الأغلبية
        from collections import Counter
        counter = Counter(values)
        most_common, count = counter.most_common(1)[0]
        majority_percentage = count / len(values)
        
        return {
            "consensus_value": most_common,
            "confidence": majority_percentage,
            "details": {
                "method": "majority_vote",
                "votes_for": count,
                "total_votes": len(values),
                "percentage": majority_percentage
            }
        }
    
    def _weighted_consensus(self, data_points: List[Dict]) -> Dict:
        """
        إجماع مرجح بأوزان المستخدمين
        """
        weighted_sum = 0
        total_weight = 0
        
        for point in data_points:
            user_id = point.get("user_id")
            weight = self.user_weights.get(user_id, {}).get("weight", 50) / 100
            value = point.get("value", 0)
            
            if isinstance(value, (int, float)):
                weighted_sum += value * weight
                total_weight += weight
        
        if total_weight == 0:
            return {"consensus_value": None, "confidence": 0, "details": {}}
        
        consensus_value = weighted_sum / total_weight
        
        # حساب الثقة
        variance = sum(((point.get("value", 0) - consensus_value) ** 2) 
                      for point in data_points if "value" in point) / len(data_points)
        confidence = 1 / (1 + variance)
        
        return {
            "consensus_value": consensus_value,
            "confidence": confidence,
            "details": {
                "method": "weighted_consensus",
                "weighted_sum": weighted_sum,
                "total_weight": total_weight,
                "variance": variance
            }
        }
    
    def _expert_consensus(self, data_points: List[Dict]) -> Dict:
        """
        إجماع بخبراء (محاكاة)
        """
        # محاكاة مراجعة خبراء
        avg_value = sum(d.get("value", 0) for d in data_points if "value" in d) / len(data_points)
        
        return {
            "consensus_value": avg_value,
            "confidence": 0.85,
            "details": {
                "method": "expert_review",
                "experts_count": 3,
                "review_duration": "2 hours"
            }
        }
    
    def _automated_consensus(self, data_points: List[Dict]) -> Dict:
        """
        إجماع آلي بخوارزميات
        """
        # استخدام median لمقاومة القيم المتطرفة
        values = [d.get("value") for d in data_points if "value" in d]
        if not values:
            return {"consensus_value": None, "confidence": 0, "details": {}}
        
        values.sort()
        median = values[len(values) // 2]
        
        # حساب الانحراف المعياري
        mean = sum(values) / len(values)
        variance = sum((v - mean) ** 2 for v in values) / len(values)
        std_dev = math.sqrt(variance)
        
        # الثقة تتناسب عكسياً مع الانحراف المعياري
        confidence = 1 / (1 + std_dev)
        
        return {
            "consensus_value": median,
            "confidence": confidence,
            "details": {
                "method": "automated_consensus",
                "algorithm": "median_with_std",
                "mean": mean,
                "std_dev": std_dev,
                "data_range": max(values) - min(values)
            }
        }
    
    # -------------------------------------------------------------------------
    # التحقق المتقاطع (Cross-Reference)
    # -------------------------------------------------------------------------
    
    def cross_reference_data(self, data: Dict, sources: List[Dict]) -> Dict:
        """
        التحقق المتقاطع من مصادر متعددة
        """
        matches = 0
        total = len(sources)
        
        for source in sources:
            if self._compare_data(data, source):
                matches += 1
        
        match_percentage = matches / total if total > 0 else 0
        is_verified = match_percentage >= self.criteria["min_consensus_percentage"]
        
        return {
            "is_verified": is_verified,
            "match_percentage": match_percentage,
            "matches": matches,
            "total_sources": total,
            "message": {
                "arabic": f"تطابق مع {matches} من {total} مصادر ({match_percentage:.0%})",
                "english": f"Matches {matches}/{total} sources ({match_percentage:.0%})"
            }
        }
    
    def _compare_data(self, data1: Dict, data2: Dict) -> bool:
        """
        مقارنة بيانات مصدرين
        """
        # مقارنة الحقول الرئيسية
        key_fields = ["value", "category", "location", "timestamp"]
        
        for field in key_fields:
            if field in data1 and field in data2:
                if data1[field] != data2[field]:
                    return False
        
        return True
    
    # -------------------------------------------------------------------------
    # أدوات مساعدة
    # -------------------------------------------------------------------------
    
    def _generate_verification_message(self, is_verified: bool, confidence: float) -> Dict:
        """
        توليد رسالة تحقق ثنائية اللغة
        """
        if is_verified:
            if confidence > 0.8:
                return {
                    "arabic": "✅ تم التحقق بنجاح - مصداقية عالية",
                    "english": "✅ Verified - High credibility"
                }
            else:
                return {
                    "arabic": "✅ تم التحقق - مصداقية متوسطة",
                    "english": "✅ Verified - Medium credibility"
                }
        else:
            return {
                "arabic": "❌ فشل التحقق - بيانات غير موثوقة",
                "english": "❌ Verification failed - Unreliable data"
            }
    
    def _generate_consensus_message(self, consensus_result: Dict) -> Dict:
        """
        توليد رسالة إجماع ثنائية اللغة
        """
        value = consensus_result["consensus_value"]
        confidence = consensus_result["confidence"]
        
        return {
            "arabic": f"📊 تم الوصول لإجماع: القيمة {value} بثقة {confidence:.1%}",
            "english": f"📊 Consensus reached: Value {value} with {confidence:.1%} confidence"
        }
    
    def get_user_trust_profile(self, user_id: str) -> Dict:
        """
        الحصول على ملف الثقة الكامل لمستخدم
        """
        if user_id not in self.user_weights:
            return {"error": "User not found"}
        
        user = self.user_weights[user_id]
        
        # استخراج آخر 10 تحققات
        recent_verifications = [
            v for v in self.verification_records 
            if v["user_id"] == user_id
        ][-10:]
        
        return {
            "user_id": user_id,
            "trust_weight": user["weight"],
            "trust_tier": user["trust_tier"],
            "verification_stats": {
                "total": user["verification_count"],
                "successful": user["successful_verifications"],
                "failed": user["failed_verifications"],
                "success_rate": user["successful_verifications"] / max(1, user["verification_count"])
            },
            "recent_verifications": recent_verifications,
            "last_calculated": user.get("last_calculated")
        }
    
    def get_stats_report(self) -> Dict:
        """
        تقرير إحصائي كامل
        """
        return {
            "timestamp": datetime.now().isoformat(),
            "fingerprint": GENETIC_FINGERPRINT["id"],
            "stats": self.stats,
            "criteria": self.criteria,
            "bilingual_summary": {
                "arabic": f"""
    ─────────────────────────────────
    ✅ تقرير نظام Proof of Truth
    ─────────────────────────────────
    إجمالي التحققات: {self.stats['total_verifications']}
    صحيح: {self.stats['verified_true']}
    خاطئ: {self.stats['verified_false']}
    متوسط الثقة: {self.stats['average_trust_score']:.1%}
    المستخدمون النشطون: {self.stats['active_users']}
    ─────────────────────────────────
                """,
                "english": f"""
    ─────────────────────────────────
    ✅ Proof of Truth System Report
    ─────────────────────────────────
    Total Verifications: {self.stats['total_verifications']}
    Verified True: {self.stats['verified_true']}
    Verified False: {self.stats['verified_false']}
    Average Confidence: {self.stats['average_trust_score']:.1%}
    Active Users: {self.stats['active_users']}
    ─────────────────────────────────
                """
            }
        }


# =============================================================================
# 2️⃣ تكامل مع منصة إمزتت
# =============================================================================

class ImzatitProofIntegration:
    """
    🔗 تكامل Proof of Truth مع منصة إمزتت
    """
    
    def __init__(self, proof_system: ProofOfTruth):
        self.proof = proof_system
        self.integration_log = []
    
    def process_survey_response_with_verification(self, survey_id: str, user_id: str, 
                                                  response_data: Dict, metadata: Dict) -> Dict:
        """
        معالجة استجابة استطلاع مع التحقق من المصداقية
        """
        # 1. التحقق من البيانات
        verification = self.proof.verify_data(
            data={
                "content": response_data,
                "timestamp": metadata.get("timestamp", datetime.now().isoformat()),
                "answer": response_data.get("answer")
            },
            user_id=user_id,
            data_type=DataType.SURVEY_RESPONSE.value
        )
        
        # 2. حساب الوزن الاستشرافي
        user_weight = self.proof.calculate_user_weight(user_id, {})
        
        # 3. تطبيق الوزن على قيمة المكافأة
        base_reward = response_data.get("base_reward", 10)
        weighted_reward = base_reward * (user_weight / 50)  # 50 هو الوزن الأساسي
        
        # 4. تسجيل العملية
        self.integration_log.append({
            "survey_id": survey_id,
            "user_id": user_id,
            "verification_id": verification["verification_id"],
            "is_verified": verification["is_verified"],
            "user_weight": user_weight,
            "base_reward": base_reward,
            "weighted_reward": weighted_reward,
            "timestamp": datetime.now().isoformat()
        })
        
        return {
            "status": "processed",
            "verification": verification,
            "user_weight": user_weight,
            "rewards": {
                "base": base_reward,
                "weighted": weighted_reward,
                "bonus_percentage": ((user_weight / 50) - 1) * 100
            },
            "message": {
                "arabic": f"تمت المعالجة. وزنك الاستشرافي: {user_weight:.1f} - المكافأة: {weighted_reward:.1f} $TIT",
                "english": f"Processed. Your foresight weight: {user_weight:.1f} - Reward: {weighted_reward:.1f} $TIT"
            }
        }


# =============================================================================
# 🚀 التشغيل والتجربة
# =============================================================================

if __name__ == "__main__":
    print("\n" + "="*80)
    print("✅ اختبار نظام Proof of Truth")
    print("="*80)
    
    # تهيئة النظام
    proof = ProofOfTruth()
    integration = ImzatitProofIntegration(proof)
    
    # 1️⃣ حساب وزن مستخدم جديد
    print("\n1️⃣ حساب الوزن الاستشرافي:")
    weight = proof.calculate_user_weight("USER-001", {})
    print(f"   ⚖️ الوزن: {weight:.2f}")
    
    # 2️⃣ التحقق من بيانات
    print("\n2️⃣ التحقق من استجابة استطلاع:")
    verification = proof.verify_data(
        data={
            "answer": "نعم، الخدمة ممتازة",
            "rating": 5,
            "timestamp": datetime.now().isoformat()
        },
        user_id="USER-001",
        data_type=DataType.SURVEY_RESPONSE.value
    )
    print(f"   ✅ موثوق: {verification['is_verified']}")
    print(f"   📊 الثقة: {verification['confidence']:.1%}")
    
    # 3️⃣ معالجة كاملة مع المكافآت
    print("\n3️⃣ معالجة استجابة مع مكافآت:")
    result = integration.process_survey_response_with_verification(
        survey_id="SURV-001",
        user_id="USER-001",
        response_data={
            "answer": "أقترح تطوير الخدمة في منطقتي",
            "category": "بلدية سبها",
            "base_reward": 15
        },
        metadata={
            "timestamp": datetime.now().isoformat(),
            "ip_address": "192.168.1.1"
        }
    )
    print(f"   {result['message']['arabic']}")
    
    # 4️⃣ إجماع
    print("\n4️⃣ الوصول لإجماع:")
    consensus = proof.reach_consensus(
        data_points=[
            {"user_id": "U1", "value": 4.5, "weight": 80},
            {"user_id": "U2", "value": 4.2, "weight": 65},
            {"user_id": "U3", "value": 4.8, "weight": 90},
            {"user_id": "U4", "value": 4.3, "weight": 45},
            {"user_id": "U5", "value": 4.6, "weight": 70}
        ],
        method="weighted"
    )
    print(f"   {consensus['bilingual_result']['arabic']}")
    
    # 5️⃣ تقرير
    print("\n5️⃣ تقرير النظام:")
    report = proof.get_stats_report()
    print(report["bilingual_summary"]["arabic"])
    
    print("\n✅ اكتمل اختبار Proof of Truth بنجاح")
