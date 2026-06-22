-- Create extension for UUID generation if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS
CREATE TYPE product_status AS ENUM ('draft', 'review', 'published', 'archived', 'deleted');
CREATE TYPE queue_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled');
CREATE TYPE marketplace_type AS ENUM ('shopee', 'tokopedia', 'tiktok_shop', 'lazada', 'other');
CREATE TYPE report_status AS ENUM ('pending', 'reviewed', 'resolved', 'rejected');

-- 2. TABLES
-- TABLE: admins
CREATE TABLE public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: categories
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: subcategories
CREATE TABLE public.subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT subcategories_category_slug_unique UNIQUE (category_id, slug)
);

-- TABLE: tags
CREATE TABLE public.tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: problems
CREATE TABLE public.problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: products
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT,
    long_description TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    subcategory_id UUID REFERENCES public.subcategories(id) ON DELETE SET NULL,
    thumbnail_url TEXT,
    status product_status DEFAULT 'draft',
    affiliate_score NUMERIC(3,1) DEFAULT 0.0,
    freshness_score INTEGER DEFAULT 100,
    last_checked_at TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- TABLE: product_links
CREATE TABLE public.product_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    marketplace marketplace_type NOT NULL,
    seller_name TEXT,
    seller_location TEXT,
    url TEXT NOT NULL,
    price NUMERIC,
    discount_percent NUMERIC,
    rating NUMERIC,
    sold_count INTEGER,
    is_primary BOOLEAN DEFAULT FALSE,
    last_synced_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: product_tags
CREATE TABLE public.product_tags (
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY(product_id, tag_id)
);

-- TABLE: product_problems
CREATE TABLE public.product_problems (
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    problem_id UUID NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
    PRIMARY KEY(product_id, problem_id)
);

-- TABLE: product_ai_metadata
CREATE TABLE public.product_ai_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL UNIQUE REFERENCES public.products(id) ON DELETE CASCADE,
    target_audience TEXT,
    problem_summary TEXT,
    hooks JSONB DEFAULT '[]'::jsonb,
    angles JSONB DEFAULT '[]'::jsonb,
    content_ideas JSONB DEFAULT '[]'::jsonb,
    visual_recommendation TEXT,
    affiliate_reason TEXT,
    visual_appeal_score NUMERIC DEFAULT 0.0,
    problem_solver_score NUMERIC DEFAULT 0.0,
    impulse_buy_score NUMERIC DEFAULT 0.0,
    affiliate_potential_score NUMERIC DEFAULT 0.0,
    ai_provider TEXT,
    ai_model TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: product_ai_versions
CREATE TABLE public.product_ai_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    raw_prompt TEXT,
    raw_response TEXT,
    parsed_json JSONB,
    ai_provider TEXT,
    ai_model TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: collections
CREATE TABLE public.collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    cover_image TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: collection_products
CREATE TABLE public.collection_products (
    collection_id UUID NOT NULL REFERENCES public.collections(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    PRIMARY KEY(collection_id, product_id)
);

-- TABLE: insights
CREATE TABLE public.insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    cover_image TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: insight_products
CREATE TABLE public.insight_products (
    insight_id UUID NOT NULL REFERENCES public.insights(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    PRIMARY KEY(insight_id, product_id)
);

-- TABLE: import_sessions
CREATE TABLE public.import_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_name TEXT,
    total_links INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    failed_count INTEGER DEFAULT 0,
    duplicate_count INTEGER DEFAULT 0,
    status queue_status DEFAULT 'pending',
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: import_queue
CREATE TABLE public.import_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.import_sessions(id) ON DELETE SET NULL,
    marketplace marketplace_type NOT NULL,
    product_url TEXT NOT NULL,
    status queue_status DEFAULT 'pending',
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: duplicate_candidates
CREATE TABLE public.duplicate_candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    similar_product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    similarity_score NUMERIC NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: product_reports
CREATE TABLE public.product_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    report_type TEXT NOT NULL,
    message TEXT,
    status report_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: product_suggestions
CREATE TABLE public.product_suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    marketplace marketplace_type NOT NULL,
    product_url TEXT NOT NULL,
    note TEXT,
    status queue_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: audit_logs
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES public.admins(id) ON DELETE SET NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    action TEXT NOT NULL,
    old_value JSONB,
    new_value JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: system_settings
CREATE TABLE public.system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: ai_cache
CREATE TABLE public.ai_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_hash TEXT UNIQUE NOT NULL,
    response JSONB NOT NULL,
    provider TEXT NOT NULL,
    model TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: seo_redirects
CREATE TABLE public.seo_redirects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    old_slug TEXT NOT NULL,
    new_slug TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TRIGGERS FOR TIMESTAMPS
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_admins_updated_at BEFORE UPDATE ON public.admins FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER tr_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER tr_subcategories_updated_at BEFORE UPDATE ON public.subcategories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER tr_tags_updated_at BEFORE UPDATE ON public.tags FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER tr_problems_updated_at BEFORE UPDATE ON public.problems FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER tr_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER tr_product_links_updated_at BEFORE UPDATE ON public.product_links FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER tr_product_ai_metadata_updated_at BEFORE UPDATE ON public.product_ai_metadata FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER tr_collections_updated_at BEFORE UPDATE ON public.collections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER tr_insights_updated_at BEFORE UPDATE ON public.insights FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER tr_import_queue_updated_at BEFORE UPDATE ON public.import_queue FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER tr_product_reports_updated_at BEFORE UPDATE ON public.product_reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER tr_product_suggestions_updated_at BEFORE UPDATE ON public.product_suggestions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER tr_system_settings_updated_at BEFORE UPDATE ON public.system_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. INDEXES
CREATE INDEX idx_subcategories_category_id ON public.subcategories(category_id);
CREATE INDEX idx_subcategories_slug ON public.subcategories(slug);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_subcategory_id ON public.products(subcategory_id);
CREATE INDEX idx_products_affiliate_score ON public.products(affiliate_score);
CREATE INDEX idx_products_published_at ON public.products(published_at);
CREATE INDEX idx_product_links_product_id ON public.product_links(product_id);
CREATE INDEX idx_product_links_marketplace ON public.product_links(marketplace);
CREATE INDEX idx_product_links_is_primary ON public.product_links(is_primary);
CREATE INDEX idx_product_tags_product_id ON public.product_tags(product_id);
CREATE INDEX idx_product_tags_tag_id ON public.product_tags(tag_id);
CREATE INDEX idx_product_problems_product_id ON public.product_problems(product_id);
CREATE INDEX idx_product_problems_problem_id ON public.product_problems(problem_id);
CREATE INDEX idx_product_ai_metadata_product_id ON public.product_ai_metadata(product_id);
CREATE INDEX idx_product_ai_versions_product_id ON public.product_ai_versions(product_id);
CREATE INDEX idx_product_ai_versions_version_number ON public.product_ai_versions(product_id, version_number);
CREATE INDEX idx_collections_is_featured ON public.collections(is_featured);
CREATE INDEX idx_collection_products_collection_id ON public.collection_products(collection_id);
CREATE INDEX idx_collection_products_product_id ON public.collection_products(product_id);
CREATE INDEX idx_insights_published_at ON public.insights(published_at);
CREATE INDEX idx_insight_products_insight_id ON public.insight_products(insight_id);
CREATE INDEX idx_insight_products_product_id ON public.insight_products(product_id);
CREATE INDEX idx_import_sessions_status ON public.import_sessions(status);
CREATE INDEX idx_import_queue_session_id ON public.import_queue(session_id);
CREATE INDEX idx_import_queue_status ON public.import_queue(status);
CREATE INDEX idx_import_queue_marketplace ON public.import_queue(marketplace);
CREATE INDEX idx_duplicate_candidates_product_id ON public.duplicate_candidates(product_id);
CREATE INDEX idx_duplicate_candidates_similar_product_id ON public.duplicate_candidates(similar_product_id);
CREATE INDEX idx_product_reports_product_id ON public.product_reports(product_id);
CREATE INDEX idx_product_reports_status ON public.product_reports(status);
CREATE INDEX idx_product_suggestions_status ON public.product_suggestions(status);
CREATE INDEX idx_product_suggestions_marketplace ON public.product_suggestions(marketplace);
CREATE INDEX idx_audit_logs_admin_id ON public.audit_logs(admin_id);
CREATE INDEX idx_audit_logs_entity_type ON public.audit_logs(entity_type);
CREATE INDEX idx_audit_logs_entity_id ON public.audit_logs(entity_id);
CREATE INDEX idx_seo_redirects_old_slug ON public.seo_redirects(old_slug);
CREATE INDEX idx_seo_redirects_new_slug ON public.seo_redirects(new_slug);

-- 5. SECURITY & ROW LEVEL SECURITY (RLS)

-- Helper function to check if request is from an active admin
CREATE OR REPLACE FUNCTION public.is_active_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM public.admins
            WHERE email = auth.jwt()->>'email'
            AND is_active = TRUE
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_ai_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_ai_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insight_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.import_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.import_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duplicate_candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_redirects ENABLE ROW LEVEL SECURITY;

-- POLICIES ON admins (Avoid infinite recursion on SELECT)
CREATE POLICY "Allow SELECT own admin entry" ON public.admins
    FOR SELECT TO authenticated USING (auth.jwt()->>'email' = email);

CREATE POLICY "Allow active admins to manage admins" ON public.admins
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admins
            WHERE email = auth.jwt()->>'email'
            AND is_active = TRUE
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admins
            WHERE email = auth.jwt()->>'email'
            AND is_active = TRUE
        )
    );

-- categories
CREATE POLICY "Allow public read on active categories" ON public.categories 
    FOR SELECT USING (is_active = TRUE OR public.is_active_admin());
CREATE POLICY "Allow write on categories for active admins only" ON public.categories 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- subcategories
CREATE POLICY "Allow public read on subcategories" ON public.subcategories 
    FOR SELECT USING (TRUE);
CREATE POLICY "Allow write on subcategories for active admins only" ON public.subcategories 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- tags
CREATE POLICY "Allow public read on tags" ON public.tags 
    FOR SELECT USING (TRUE);
CREATE POLICY "Allow write on tags for active admins only" ON public.tags 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- problems
CREATE POLICY "Allow public read on problems" ON public.problems 
    FOR SELECT USING (TRUE);
CREATE POLICY "Allow write on problems for active admins only" ON public.problems 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- products
CREATE POLICY "Allow public read on published products" ON public.products 
    FOR SELECT USING (status = 'published' OR public.is_active_admin());
CREATE POLICY "Allow write on products for active admins only" ON public.products 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- product_links
CREATE POLICY "Allow public read on product_links" ON public.product_links 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.products 
            WHERE products.id = product_links.product_id 
            AND (products.status = 'published' OR public.is_active_admin())
        )
    );
CREATE POLICY "Allow write on product_links for active admins only" ON public.product_links 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- product_tags
CREATE POLICY "Allow public read on product_tags" ON public.product_tags 
    FOR SELECT USING (TRUE);
CREATE POLICY "Allow write on product_tags for active admins only" ON public.product_tags 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- product_problems
CREATE POLICY "Allow public read on product_problems" ON public.product_problems 
    FOR SELECT USING (TRUE);
CREATE POLICY "Allow write on product_problems for active admins only" ON public.product_problems 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- product_ai_metadata
CREATE POLICY "Allow public read on published product ai metadata" ON public.product_ai_metadata 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.products 
            WHERE products.id = product_ai_metadata.product_id 
            AND (products.status = 'published' OR public.is_active_admin())
        )
    );
CREATE POLICY "Allow write on product_ai_metadata for active admins only" ON public.product_ai_metadata 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- collections
CREATE POLICY "Allow public read on published collections" ON public.collections 
    FOR SELECT USING (is_published = TRUE OR public.is_active_admin());
CREATE POLICY "Allow write on collections for active admins only" ON public.collections 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- collection_products
CREATE POLICY "Allow public read on collection_products" ON public.collection_products 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.collections 
            WHERE collections.id = collection_products.collection_id 
            AND (collections.is_published = TRUE OR public.is_active_admin())
        )
    );
CREATE POLICY "Allow write on collection_products for active admins only" ON public.collection_products 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- insights
CREATE POLICY "Allow public read on published insights" ON public.insights 
    FOR SELECT USING (is_published = TRUE OR public.is_active_admin());
CREATE POLICY "Allow write on insights for active admins only" ON public.insights 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- insight_products
CREATE POLICY "Allow public read on insight_products" ON public.insight_products 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.insights 
            WHERE insights.id = insight_products.insight_id 
            AND (insights.is_published = TRUE OR public.is_active_admin())
        )
    );
CREATE POLICY "Allow write on insight_products for active admins only" ON public.insight_products 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- system_settings
CREATE POLICY "Allow public read on system settings" ON public.system_settings 
    FOR SELECT USING (TRUE);
CREATE POLICY "Allow write on system settings for active admins only" ON public.system_settings 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- seo_redirects
CREATE POLICY "Allow public read on seo redirects" ON public.seo_redirects 
    FOR SELECT USING (TRUE);
CREATE POLICY "Allow write on seo redirects for active admins only" ON public.seo_redirects 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- product_ai_versions
CREATE POLICY "Active admins only read write ai versions" ON public.product_ai_versions 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- import_sessions
CREATE POLICY "Active admins only read write import sessions" ON public.import_sessions 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- import_queue
CREATE POLICY "Active admins only read write import queue" ON public.import_queue 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- duplicate_candidates
CREATE POLICY "Active admins only read write duplicate candidates" ON public.duplicate_candidates 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- audit_logs
CREATE POLICY "Active admins only read write audit logs" ON public.audit_logs 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- ai_cache
CREATE POLICY "Active admins only read write ai cache" ON public.ai_cache 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- product_reports
CREATE POLICY "Allow anyone to insert product reports" ON public.product_reports 
    FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Active admins only manage product reports" ON public.product_reports 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

-- product_suggestions
CREATE POLICY "Allow anyone to insert product suggestions" ON public.product_suggestions 
    FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Active admins only manage product suggestions" ON public.product_suggestions 
    FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());
