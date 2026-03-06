#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
================================================================================
🎨 NFT RESEARCH PROJECTS - منصة العقول
================================================================================
Estishraf OS - Imzatit Ecosystem
الإصدار: 1.1.0 | الحالة: تطوير | التاريخ: 2026-03-07

🔐 البصمة الجينية السيادية:
    UUID: nft-research-v1.1.0-20260307
    الهوية: NFT_RESEARCH_PROJECTS
    التشفير: ERC-721 Compatible | IPFS | AES-256
    المالك: منصة العقول - إمبراطورية استشراف

📋 الوصف: تحويل المشاريع البحثية وبراءات الاختراع إلى NFTs
          تمثل حصص ملكية قابلة للتداول والاستثمار
================================================================================
"""

import hashlib
import json
import uuid
import time
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from enum import Enum
import os

# =============================================================================
# البصمة الجينية
# =============================================================================

GENETIC_FINGERPRINT = {
    "id": "nft-research-v1.1.0-20260307",
    "name": "NFT_RESEARCH_PROJECTS",
    "version": "1.1.0",
    "birth": "2026-03-07 00:00:00 UTC+2",
    "creator": "منصة العقول - إمبراطورية استشراف",
    "signature": hashlib.sha512(b"ISTISHRAF_NFT_RESEARCH_ORIGIN").hexdigest()[:64],
    "lineage": "Imzatit Ecosystem - Research Division"
}

# =============================================================================
# الأنواع الأساسية
# =============================================================================

class ProjectStatus(Enum):
    """حالة المشروع البحثي"""
    PENDING = "pending"      # قيد المراجعة
    FUNDED = "funded"        # ممول
    ACTIVE = "active"        # قيد التنفيذ
    COMPLETED = "completed"  # مكتمل
    COMMERCIALIZED = "commercialized"  # تم تسويقه

class NFTTier(Enum):
    """مستويات NFTs"""
    BRONZE = "برونزي"    # حصة صغيرة (1-5%)
    SILVER = "فضي"       # حصة متوسطة (5-10%)
    GOLD = "ذهبي"        # حصة كبيرة (10-20%)
    PLATINUM = "ماسي"    # حصة مؤسسة (20-50%)

class ResearchField(Enum):
    """مجالات البحث العلمي"""
    MEDICAL = "طبي"
    ENGINEERING = "هندسي"
    SOFTWARE = "برمجيات"
    GREEN_TECH = "تكنولوجيا خضراء"
    SOCIAL_SCIENCES = "علوم اجتماعية"
    HERITAGE = "تراثي"

# =============================================================================
# 1️⃣ نظام NFT للمشاريع البحثية
# =============================================================================

class ResearchNFTManager:
    """
    🎨 مدير NFTs المشاريع البحثية
    يحول الأبحاث إلى أصول رقمية قابلة للتداول
    """
    
    def __init__(self):
        self.id = GENETIC_FINGERPRINT["id"]
        
        # سجل المشاريع
        self.projects = {}  # project_id -> project_data
        self.nfts = {}      # nft_id -> nft_data
        self.investors = {} # investor_id -> holdings
        
        # الأسواق النشطة
        self.marketplace = {
            "active_listings": [],
            "total_volume": 0,
            "transactions": []
        }
        
        # إحصائيات
        self.stats = {
            "total_projects": 0,
            "total_nfts_minted": 0,
            "total_value_locked": 0,
            "active_investors": 0
        }
        
        print("\n" + "="*80)
        print("🎨 NFT RESEARCH PROJECTS - منصة العقول")
        print("="*80)
        print(f"🆔 ID: {self.id}")
        print(f"📊 الحالة: نشط")
        print("="*80)
    
    # -------------------------------------------------------------------------
    # تسجيل مشروع بحثي جديد
    # -------------------------------------------------------------------------
    
    def register_research_project(self, project_data: Dict, researcher_data: Dict) -> Dict:
        """
        تسجيل مشروع بحثي جديد في المنصة
        """
        project_id = f"RES-{uuid.uuid4().hex[:12]}"
        
        # التحقق من البيانات
        required_fields = ["title_ar", "title_en", "field", "abstract", "proposed_budget"]
        for field in required_fields:
            if field not in project_data:
                return {"error": f"Missing required field: {field}"}
        
        # إنشاء سجل المشروع
        project = {
            "id": project_id,
            "title_ar": project_data["title_ar"],
            "title_en": project_data["title_en"],
            "field": project_data["field"],
            "abstract_ar": project_data.get("abstract_ar", project_data["abstract"]),
            "abstract_en": project_data.get("abstract_en", project_data["abstract"]),
            "proposed_budget": project_data["proposed_budget"],
            "requested_funding": project_data.get("requested_funding", project_data["proposed_budget"] * 0.7),
            "researcher": {
                "id": researcher_data.get("id", f"RESR-{uuid.uuid4().hex[:8]}"),
                "name_ar": researcher_data.get("name_ar", ""),
                "name_en": researcher_data.get("name_en", ""),
                "institution": researcher_data.get("institution", ""),
                "credentials": researcher_data.get("credentials", [])
            },
            "team_members": project_data.get("team_members", []),
            "milestones": project_data.get("milestones", [
                {"name": "مرحلة البحث", "percentage": 30},
                {"name": "مرحلة التطوير", "percentage": 40},
                {"name": "مرحلة التسويق", "percentage": 30}
            ]),
            "expected_roi": project_data.get("expected_roi", 0.25),  # 25% عائد متوقع
            "status": ProjectStatus.PENDING.value,
            "nfts": [],
            "investors": [],
            "funds_raised": 0,
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat(),
            "documents": project_data.get("documents", []),
            "ipfs_hash": self._upload_to_ipfs(project_data)
        }
        
        # تحليل الجدوى بواسطة AI-00 (محاكاة)
        feasibility = self._analyze_feasibility(project)
        project["feasibility_score"] = feasibility["score"]
        project["feasibility_report"] = feasibility
        
        self.projects[project_id] = project
        self.stats["total_projects"] += 1
        
        return {
            "status": "registered",
            "project_id": project_id,
            "title": project["title_ar"],
            "feasibility_score": feasibility["score"],
            "message": {
                "arabic": f"✅ تم تسجيل المشروع {project['title_ar']} بنجاح",
                "english": f"✅ Project {project['title_en']} registered successfully"
            }
        }
    
    def _analyze_feasibility(self, project: Dict) -> Dict:
        """
        تحليل الجدوى باستخدام النسبة الذهبية
        """
        # محاكاة تحليل AI-00
        import random
        
        scores = {
            "innovation": random.uniform(0.6, 1.0),
            "market_demand": random.uniform(0.5, 0.95),
            "team_capability": random.uniform(0.5, 0.9),
            "budget_efficiency": random.uniform(0.6, 1.0),
            "timeline": random.uniform(0.5, 0.9)
        }
        
        # تطبيق النسبة الذهبية
        golden_ratio = 1.618
        weighted_score = (
            scores["innovation"] * 0.3 +
            scores["market_demand"] * 0.25 +
            scores["team_capability"] * 0.2 +
            scores["budget_efficiency"] * 0.15 +
            scores["timeline"] * 0.1
        ) * golden_ratio / 1.618  # تطبيع للدرجة
        
        return {
            "score": round(weighted_score, 2),
            "details": scores,
            "recommendation": "highly_recommended" if weighted_score > 0.8 else "recommended" if weighted_score > 0.6 else "needs_review",
            "analyzed_by": "AI-00",
            "timestamp": datetime.now().isoformat()
        }
    
    # -------------------------------------------------------------------------
    # صك NFTs للمشروع
    # -------------------------------------------------------------------------
    
    def mint_project_nfts(self, project_id: str, total_shares: int = 100, share_price: float = 100) -> Dict:
        """
        صك NFTs تمثل حصصاً في المشروع
        """
        if project_id not in self.projects:
            return {"error": "Project not found"}
        
        project = self.projects[project_id]
        
        if project["status"] != ProjectStatus.PENDING.value:
            return {"error": "Project already has NFTs minted"}
        
        # إنشاء مجموعة NFTs
        nft_collection = []
        
        # توزيع الحصص (النسبة الذهبية في التوزيع)
        golden_ratio = 1.618
        
        # 20% للمؤسسين (محجوزة)
        founder_shares = int(total_shares * 0.2)
        # 30% للباحثين
        researcher_shares = int(total_shares * 0.3)
        # 50% للمستثمرين
        investor_shares = total_shares - founder_shares - researcher_shares
        
        # إنشاء NFT للمؤسسين (غير قابل للتداول)
        founder_nft = self._create_nft(
            project_id=project_id,
            nft_type="founder",
            share_percentage=20,
            total_supply=founder_shares,
            price=0,  # غير معروض للبيع
            tier=NFTTier.PLATINUM.value,
            metadata={
                "description": "حصص مؤسسين - غير قابلة للتداول",
                "vesting_period": "3 سنوات",
                "voting_rights": True
            }
        )
        nft_collection.append(founder_nft)
        
        # إنشاء NFT للباحثين
        researcher_nft = self._create_nft(
            project_id=project_id,
            nft_type="researcher",
            share_percentage=30,
            total_supply=researcher_shares,
            price=share_price * 0.5,  # نصف السعر للباحثين
            tier=NFTTier.GOLD.value,
            metadata={
                "description": "حصص الباحثين - قابلة للتداول بعد 6 أشهر",
                "vesting_period": "6 أشهر",
                "voting_rights": True
            }
        )
        nft_collection.append(researcher_nft)
        
        # إنشاء NFT للمستثمرين
        investor_nft = self._create_nft(
            project_id=project_id,
            nft_type="investor",
            share_percentage=50,
            total_supply=investor_shares,
            price=share_price,
            tier=NFTTier.SILVER.value,
            metadata={
                "description": "حصص استثمارية - قابلة للتداول فوراً",
                "vesting_period": "فوري",
                "voting_rights": True,
                "dividend_entitlement": True
            }
        )
        nft_collection.append(investor_nft)
        
        # تحديث المشروع
        project["nfts"] = nft_collection
        project["total_shares"] = total_shares
        project["share_price"] = share_price
        project["status"] = ProjectStatus.FUNDED.value
        project["updated_at"] = datetime.now().isoformat()
        
        self.stats["total_nfts_minted"] += len(nft_collection)
        self.stats["total_value_locked"] += investor_shares * share_price
        
        return {
            "status": "minted",
            "project_id": project_id,
            "project_title": project["title_ar"],
            "nfts_created": len(nft_collection),
            "investor_shares": investor_shares,
            "share_price": share_price,
            "total_valuation": total_shares * share_price,
            "message": {
                "arabic": f"🎨 تم صك {len(nft_collection)} NFTs للمشروع بقيمة {total_shares * share_price} $TIT",
                "english": f"🎨 Minted {len(nft_collection)} NFTs for project worth {total_shares * share_price} $TIT"
            }
        }
    
    def _create_nft(self, project_id: str, nft_type: str, share_percentage: float,
                    total_supply: int, price: float, tier: str, metadata: Dict) -> Dict:
        """
        إنشاء NFT فردي
        """
        nft_id = f"NFT-{uuid.uuid4().hex[:12]}"
        
        # توليد معرف فريد على السلسلة
        token_id = hashlib.sha256(f"{nft_id}{project_id}{time.time()}".encode()).hexdigest()[:16]
        
        nft = {
            "id": nft_id,
            "token_id": token_id,
            "project_id": project_id,
            "type": nft_type,
            "tier": tier,
            "share_percentage": share_percentage,
            "total_supply": total_supply,
            "available_supply": total_supply,
            "price": price,
            "metadata": metadata,
            "royalty_percentage": 5,  # 5% عائد للمشروع عند إعادة البيع
            "contract_address": f"0x{hashlib.sha256(project_id.encode()).hexdigest()[:40]}",
            "created_at": datetime.now().isoformat(),
            "ipfs_uri": f"ipfs://Qm{hashlib.sha256(nft_id.encode()).hexdigest()[:44]}",
            "holders": []
        }
        
        self.nfts[nft_id] = nft
        
        return nft
    
    # -------------------------------------------------------------------------
    # شراء وبيع NFTs
    # -------------------------------------------------------------------------
    
    def purchase_nft(self, nft_id: str, buyer_id: str, quantity: int = 1) -> Dict:
        """
        شراء NFT من المشروع
        """
        if nft_id not in self.nfts:
            return {"error": "NFT not found"}
        
        nft = self.nfts[nft_id]
        
        if nft["available_supply"] < quantity:
            return {"error": f"Insufficient supply. Available: {nft['available_supply']}"}
        
        # التحقق من رصيد المشتري (محاكاة)
        total_price = nft["price"] * quantity
        
        # تحديث المخزون
        nft["available_supply"] -= quantity
        
        # تسجيل المشتري
        purchase_record = {
            "buyer_id": buyer_id,
            "quantity": quantity,
            "price_paid": total_price,
            "purchased_at": datetime.now().isoformat(),
            "nft_id": nft_id
        }
        
        nft["holders"].append(purchase_record)
        
        # تحديث محفظة المستثمر
        if buyer_id not in self.investors:
            self.investors[buyer_id] = {
                "holdings": [],
                "total_invested": 0,
                "nfts_owned": []
            }
        
        self.investors[buyer_id]["holdings"].append(purchase_record)
        self.investors[buyer_id]["total_invested"] += total_price
        self.investors[buyer_id]["nfts_owned"].append({
            "nft_id": nft_id,
            "project_id": nft["project_id"],
            "quantity": quantity,
            "share_percentage": nft["share_percentage"] * quantity / nft["total_supply"]
        })
        
        self.stats["active_investors"] = len(self.investors)
        
        # تسجيل في السوق
        transaction = {
            "id": f"TX-{uuid.uuid4().hex[:12]}",
            "nft_id": nft_id,
            "buyer_id": buyer_id,
            "quantity": quantity,
            "price": total_price,
            "timestamp": datetime.now().isoformat()
        }
        self.marketplace["transactions"].append(transaction)
        self.marketplace["total_volume"] += total_price
        
        return {
            "status": "purchased",
            "transaction_id": transaction["id"],
            "nft_id": nft_id,
            "quantity": quantity,
            "total_price": total_price,
            "message": {
                "arabic": f"✅ تم شراء {quantity} NFT بنجاح بمبلغ {total_price} $TIT",
                "english": f"✅ Successfully purchased {quantity} NFTs for {total_price} $TIT"
            }
        }
    
    def list_nft_for_sale(self, nft_id: str, seller_id: str, quantity: int, price: float) -> Dict:
        """
        عرض NFT للبيع في السوق الثانوي
        """
        listing_id = f"LST-{uuid.uuid4().hex[:10]}"
        
        listing = {
            "id": listing_id,
            "nft_id": nft_id,
            "seller_id": seller_id,
            "quantity": quantity,
            "price_per_unit": price,
            "total_price": quantity * price,
            "listed_at": datetime.now().isoformat(),
            "status": "active"
        }
        
        self.marketplace["active_listings"].append(listing)
        
        return {
            "status": "listed",
            "listing_id": listing_id,
            "nft_id": nft_id,
            "quantity": quantity,
            "total_price": quantity * price,
            "message": {
                "arabic": f"📢 تم عرض NFT للبيع بسعر {price} $TIT للوحدة",
                "english": f"📢 NFT listed for sale at {price} $TIT per unit"
            }
        }
    
    # -------------------------------------------------------------------------
    # توزيع الأرباح على حاملي NFTs
    # -------------------------------------------------------------------------
    
    def distribute_project_profits(self, project_id: str, total_profit: float) -> Dict:
        """
        توزيع أرباح المشروع على حاملي NFTs
        """
        if project_id not in self.projects:
            return {"error": "Project not found"}
        
        project = self.projects[project_id]
        
        # تطبيق النسبة الذهبية في التوزيع
        golden_ratio = 1.618
        distributable_profit = total_profit * 0.8  # 80% للمستثمرين، 20% يعاد استثمارها
        
        # تجميع كل NFTs المشروع
        project_nfts = [nft for nft_id, nft in self.nfts.items() if nft["project_id"] == project_id]
        
        distributions = []
        total_shares = sum([nft["total_supply"] for nft in project_nfts])
        
        for nft in project_nfts:
            # حساب حصة كل NFT
            nft_weight = nft["total_supply"] / total_shares
            nft_profit = distributable_profit * nft_weight
            
            # توزيع على حاملي هذا NFT
            for holder in nft["holders"]:
                holder_quantity = holder["quantity"]
                holder_share = holder_quantity / nft["total_supply"]
                holder_profit = nft_profit * holder_share
                
                distributions.append({
                    "nft_id": nft["id"],
                    "holder_id": holder["buyer_id"],
                    "quantity": holder_quantity,
                    "profit_share": holder_profit,
                    "distributed_at": datetime.now().isoformat()
                })
        
        # تحديث حالة المشروع
        project["status"] = ProjectStatus.COMMERCIALIZED.value
        project["total_profit_distributed"] = distributable_profit
        project["profit_distributions"] = distributions
        project["updated_at"] = datetime.now().isoformat()
        
        return {
            "status": "distributed",
            "project_id": project_id,
            "total_profit": total_profit,
            "distributed_amount": distributable_profit,
            "reinvested_amount": total_profit * 0.2,
            "number_of_holders": len(set([d["holder_id"] for d in distributions])),
            "distributions": distributions[:5],  # أول 5 توزيعات فقط
            "message": {
                "arabic": f"💰 تم توزيع {distributable_profit} $TIT أرباحاً على حاملي NFTs",
                "english": f"💰 Distributed {distributable_profit} $TIT profits to NFT holders"
            }
        }
    
    # -------------------------------------------------------------------------
    # أدوات مساعدة
    # -------------------------------------------------------------------------
    
    def _upload_to_ipfs(self, data: Dict) -> str:
        """
        رفع البيانات إلى IPFS (محاكاة)
        """
        data_str = json.dumps(data, sort_keys=True)
        hash_value = hashlib.sha256(data_str.encode()).hexdigest()
        return f"Qm{hash_value[:44]}"
    
    def get_project_details(self, project_id: str, language: str = "arabic") -> Dict:
        """
        الحصول على تفاصيل المشروع
        """
        if project_id not in self.projects:
            return {"error": "Project not found"}
        
        project = self.projects[project_id]
        
        if language == "arabic":
            return {
                "معرف_المشروع": project["id"],
                "العنوان": project["title_ar"],
                "المجال": project["field"],
                "الملخص": project["abstract_ar"],
                "الميزانية": project["proposed_budget"],
                "الممول_حتى_الآن": project["funds_raised"],
                "الحالة": project["status"],
                "عدد_NFTs": len(project["nfts"]),
                "الباحث_الرئيسي": project["researcher"]["name_ar"]
            }
        else:
            return {
                "project_id": project["id"],
                "title": project["title_en"],
                "field": project["field"],
                "abstract": project["abstract_en"],
                "budget": project["proposed_budget"],
                "funds_raised": project["funds_raised"],
                "status": project["status"],
                "nfts_count": len(project["nfts"]),
                "lead_researcher": project["researcher"]["name_en"]
            }
    
    def get_marketplace_stats(self) -> Dict:
        """
        إحصائيات السوق
        """
        return {
            "total_projects": self.stats["total_projects"],
            "total_nfts_minted": self.stats["total_nfts_minted"],
            "total_value_locked": self.stats["total_value_locked"],
            "active_investors": self.stats["active_investors"],
            "marketplace_volume": self.marketplace["total_volume"],
            "active_listings": len(self.marketplace["active_listings"]),
            "total_transactions": len(self.marketplace["transactions"])
        }
    
    def get_stats_report(self) -> Dict:
        """
        تقرير إحصائي كامل
        """
        return {
            "timestamp": datetime.now().isoformat(),
            "fingerprint": GENETIC_FINGERPRINT["id"],
            "stats": self.stats,
            "marketplace": {
                "volume": self.marketplace["total_volume"],
                "listings": len(self.marketplace["active_listings"]),
                "transactions": len(self.marketplace["transactions"])
            },
            "bilingual_summary": {
                "arabic": f"""
    ─────────────────────────────────
    🎨 تقرير منصة NFTs - منصة العقول
    ─────────────────────────────────
    إجمالي المشاريع: {self.stats['total_projects']}
    NFTs المصكوكة: {self.stats['total_nfts_minted']}
    القيمة الإجمالية: {self.stats['total_value_locked']} $TIT
    المستثمرون النشطون: {self.stats['active_investors']}
    حجم السوق: {self.marketplace['total_volume']} $TIT
    ─────────────────────────────────
                """,
                "english": f"""
    ─────────────────────────────────
    🎨 NFT Platform Report - Minds Platform
    ─────────────────────────────────
    Total Projects: {self.stats['total_projects']}
    NFTs Minted: {self.stats['total_nfts_minted']}
    Total Value Locked: {self.stats['total_value_locked']} $TIT
    Active Investors: {self.stats['active_investors']}
    Market Volume: {self.marketplace['total_volume']} $TIT
    ─────────────────────────────────
                """
            }
        }


# =============================================================================
# 2️⃣ ربط مع منصة العقول (Knowledge Factory)
# =============================================================================

class KnowledgeFactoryNFTIntegration:
    """
    🔗 ربط منصة العقول مع نظام NFTs
    """
    
    def __init__(self, nft_manager: ResearchNFTManager):
        self.nft_manager = nft_manager
        self.integration_log = []
        
    def process_research_for_nft(self, research_data: Dict, researcher_data: Dict) -> Dict:
        """
        معالجة بحث وتحويله إلى NFT
        """
        # 1. تسجيل المشروع
        project_result = self.nft_manager.register_research_project(
            research_data, researcher_data
        )
        
        if project_result.get("status") != "registered":
            return project_result
        
        project_id = project_result["project_id"]
        
        # 2. تحليل الجدوى (إذا كان score > 0.6، صك NFTs)
        project = self.nft_manager.projects[project_id]
        
        if project["feasibility_score"] >= 0.6:
            # 3. صك NFTs
            nft_result = self.nft_manager.mint_project_nfts(
                project_id=project_id,
                total_shares=100,
                share_price=research_data.get("share_price", 100)
            )
            
            self.integration_log.append({
                "project_id": project_id,
                "action": "nft_minted",
                "timestamp": datetime.now().isoformat(),
                "feasibility_score": project["feasibility_score"]
            })
            
            return {
                "status": "nft_created",
                "project_id": project_id,
                "feasibility_score": project["feasibility_score"],
                "nft_details": nft_result,
                "message": {
                    "arabic": f"🎉 تم تحويل البحث إلى NFTs بنجاح! سجل {nft_result['investor_shares']} سهم استثماري",
                    "english": f"🎉 Research successfully converted to NFTs! {nft_result['investor_shares']} investment shares available"
                }
            }
        else:
            return {
                "status": "needs_revision",
                "project_id": project_id,
                "feasibility_score": project["feasibility_score"],
                "message": {
                    "arabic": "درجة الجدوى منخفضة. يرجى تحسين خطة البحث",
                    "english": "Feasibility score too low. Please improve research plan"
                }
            }


# =============================================================================
# 🚀 التشغيل والتجربة
# =============================================================================

if __name__ == "__main__":
    print("\n" + "="*80)
    print("🎨 اختبار نظام NFT للمشاريع البحثية")
    print("="*80)
    
    # تهيئة النظام
    nft_manager = ResearchNFTManager()
    integration = KnowledgeFactoryNFTIntegration(nft_manager)
    
    # 1️⃣ تسجيل مشروع بحثي
    print("\n1️⃣ تسجيل مشروع بحثي:")
    project = integration.process_research_for_nft(
        research_data={
            "title_ar": "تطوير نظام ري ذكي باستخدام الذكاء الاصطناعي",
            "title_en": "AI-Powered Smart Irrigation System",
            "field": ResearchField.GREEN_TECH.value,
            "abstract": "نظام ري يخفض استهلاك المياه بنسبة 40% باستخدام تعلم الآلة",
            "proposed_budget": 50000,
            "requested_funding": 35000,
            "expected_roi": 0.35,
            "milestones": [
                {"name": "تطوير النموذج الأولي", "percentage": 30},
                {"name": "اختبارات ميدانية", "percentage": 40},
                {"name": "تسويق", "percentage": 30}
            ]
        },
        researcher_data={
            "name_ar": "د. أحمد المبروك",
            "name_en": "Dr. Ahmed Al Mabrouk",
            "institution": "جامعة سبها",
            "credentials": ["دكتوراه في الذكاء الاصطناعي", "10 أبحاث منشورة"]
        }
    )
    
    if project["status"] == "nft_created":
        print(f"   ✓ {project['message']['arabic']}")
        print(f"   📊 درجة الجدوى: {project['feasibility_score']}")
    
    # 2️⃣ شراء NFT
    print("\n2️⃣ شراء NFT من المشروع:")
    if project["status"] == "nft_created":
        project_id = project["project_id"]
        project_data = nft_manager.projects[project_id]
        
        if project_data["nfts"]:
            # شراء من NFT المستثمرين
            investor_nft = next((nft for nft in project_data["nfts"] if nft["type"] == "investor"), None)
            
            if investor_nft:
                purchase = nft_manager.purchase_nft(
                    nft_id=investor_nft["id"],
                    buyer_id="INV-001",
                    quantity=5
                )
                print(f"   ✓ {purchase['message']['arabic']}")
    
    # 3️⃣ إحصائيات
    print("\n3️⃣ إحصائيات المنصة:")
    stats = nft_manager.get_stats_report()
    print(stats["bilingual_summary"]["arabic"])
    
    print("\n✅ اكتمل اختبار نظام NFTs بنجاح")
