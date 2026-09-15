CREATE TYPE public.app_role AS ENUM ('admin','manager','staff','customer');
CREATE TYPE public.order_status AS ENUM ('new','confirmed','preparing','ready','out_for_delivery','completed','cancelled');
CREATE TYPE public.reservation_status AS ENUM ('pending','confirmed','completed','cancelled');
CREATE TYPE public.order_type AS ENUM ('delivery','pickup','dine_in');
CREATE TYPE public.payment_status AS ENUM ('pending','authorized','paid','failed','refunded','cancelled');

CREATE TABLE public.restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  logo_url text,
  phone text,
  email text,
  address_line text,
  city text,
  state text,
  postal_code text,
  latitude numeric,
  longitude numeric,
  instagram_url text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.restaurants TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.restaurants TO authenticated;
GRANT ALL ON public.restaurants TO service_role;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active restaurants" ON public.restaurants FOR SELECT TO anon, authenticated USING (active = true);

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users create own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  restaurant_id uuid REFERENCES public.restaurants(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role, restaurant_id)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role, _restaurant_id uuid DEFAULT NULL)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
      AND (_restaurant_id IS NULL OR restaurant_id = _restaurant_id)
  )
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role, uuid) TO authenticated;

CREATE TABLE public.admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  restaurant_id uuid NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  display_name text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admins TO authenticated;
GRANT ALL ON public.admins TO service_role;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read admin directory" ON public.admins FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin',restaurant_id));

CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(restaurant_id, slug)
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active categories" ON public.categories FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Admins manage categories" ON public.categories FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id)) WITH CHECK (public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id));

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES public.categories(id),
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  price_cents integer CHECK (price_cents IS NULL OR price_cents >= 0),
  image_url text,
  available boolean NOT NULL DEFAULT false,
  featured boolean NOT NULL DEFAULT false,
  demo_content boolean NOT NULL DEFAULT true,
  stock_quantity integer,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(restaurant_id, slug)
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active products" ON public.products FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Admins manage products" ON public.products FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id)) WITH CHECK (public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id));
CREATE INDEX products_category_idx ON public.products(category_id, active, available);
CREATE INDEX products_featured_idx ON public.products(restaurant_id, featured) WHERE active = true;

CREATE TABLE public.product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url text NOT NULL,
  alt_text text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.product_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_images TO authenticated;
GRANT ALL ON public.product_images TO service_role;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads product images" ON public.product_images FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_id AND p.active));
CREATE POLICY "Admins manage product images" ON public.product_images FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_id AND (public.has_role(auth.uid(),'admin',p.restaurant_id) OR public.has_role(auth.uid(),'manager',p.restaurant_id)))) WITH CHECK (EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_id AND (public.has_role(auth.uid(),'admin',p.restaurant_id) OR public.has_role(auth.uid(),'manager',p.restaurant_id))));

CREATE TABLE public.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  restaurant_id uuid NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.customers TO authenticated;
GRANT ALL ON public.customers TO service_role;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers read own record" ON public.customers FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id));
CREATE POLICY "Customers update own record" ON public.customers FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX customers_user_idx ON public.customers(user_id);

CREATE TABLE public.addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  label text,
  street text NOT NULL,
  number text NOT NULL,
  complement text,
  neighborhood text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.addresses TO authenticated;
GRANT ALL ON public.addresses TO service_role;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers manage own addresses" ON public.addresses FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.customers c WHERE c.id = customer_id AND c.user_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.customers c WHERE c.id = customer_id AND c.user_id = auth.uid()));

CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number bigint GENERATED ALWAYS AS IDENTITY UNIQUE,
  restaurant_id uuid NOT NULL REFERENCES public.restaurants(id),
  customer_id uuid REFERENCES public.customers(id),
  user_id uuid,
  status public.order_status NOT NULL DEFAULT 'new',
  order_type public.order_type NOT NULL,
  subtotal_cents integer NOT NULL CHECK (subtotal_cents >= 0),
  delivery_fee_cents integer NOT NULL DEFAULT 0 CHECK (delivery_fee_cents >= 0),
  discount_cents integer NOT NULL DEFAULT 0 CHECK (discount_cents >= 0),
  total_cents integer NOT NULL CHECK (total_cents >= 0),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  delivery_address jsonb,
  notes text,
  payment_method text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.orders TO authenticated;
GRANT UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id) OR public.has_role(auth.uid(),'staff',restaurant_id));
CREATE POLICY "Staff updates orders" ON public.orders FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id) OR public.has_role(auth.uid(),'staff',restaurant_id)) WITH CHECK (public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id) OR public.has_role(auth.uid(),'staff',restaurant_id));
CREATE INDEX orders_restaurant_status_idx ON public.orders(restaurant_id, status, created_at DESC);
CREATE INDEX orders_user_idx ON public.orders(user_id, created_at DESC);

CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE RESTRICT,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price_cents integer NOT NULL CHECK (unit_price_cents >= 0),
  total_cents integer NOT NULL CHECK (total_cents >= 0),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own order items" ON public.order_items FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR public.has_role(auth.uid(),'admin',o.restaurant_id) OR public.has_role(auth.uid(),'manager',o.restaurant_id) OR public.has_role(auth.uid(),'staff',o.restaurant_id))));
CREATE INDEX order_items_order_idx ON public.order_items(order_id);

CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE RESTRICT,
  provider text NOT NULL,
  provider_payment_id text,
  status public.payment_status NOT NULL DEFAULT 'pending',
  amount_cents integer NOT NULL CHECK (amount_cents >= 0),
  method text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own payments" ON public.payments FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR public.has_role(auth.uid(),'admin',o.restaurant_id) OR public.has_role(auth.uid(),'manager',o.restaurant_id))));
CREATE INDEX payments_provider_idx ON public.payments(provider, provider_payment_id);

CREATE TABLE public.payment_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id uuid REFERENCES public.payments(id) ON DELETE SET NULL,
  provider text NOT NULL,
  event_id text NOT NULL,
  event_type text NOT NULL,
  payload jsonb NOT NULL,
  verified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(provider, event_id)
);
GRANT SELECT ON public.payment_events TO authenticated;
GRANT ALL ON public.payment_events TO service_role;
ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read payment events" ON public.payment_events FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.payments p JOIN public.orders o ON o.id = p.order_id WHERE p.id = payment_id AND public.has_role(auth.uid(),'admin',o.restaurant_id)));

CREATE TABLE public.restaurant_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL UNIQUE REFERENCES public.restaurants(id) ON DELETE CASCADE,
  hero_title text NOT NULL DEFAULT 'CARNE DE SOL DO CHEF',
  hero_subtitle text NOT NULL DEFAULT 'Uma experiência de sabores, tradição e encontros.',
  hero_kicker text NOT NULL DEFAULT 'Da nossa cozinha para a sua mesa.',
  about_title text,
  about_body text,
  reservation_enabled boolean NOT NULL DEFAULT true,
  delivery_enabled boolean NOT NULL DEFAULT false,
  pickup_enabled boolean NOT NULL DEFAULT true,
  dine_in_enabled boolean NOT NULL DEFAULT false,
  delivery_fee_cents integer NOT NULL DEFAULT 0,
  min_order_cents integer NOT NULL DEFAULT 0,
  payment_provider text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.restaurant_settings TO anon, authenticated;
GRANT INSERT, UPDATE ON public.restaurant_settings TO authenticated;
GRANT ALL ON public.restaurant_settings TO service_role;
ALTER TABLE public.restaurant_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads settings" ON public.restaurant_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage settings" ON public.restaurant_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id)) WITH CHECK (public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id));

CREATE TABLE public.opening_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  day_of_week smallint NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  opens_at time,
  closes_at time,
  closed boolean NOT NULL DEFAULT false,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(restaurant_id, day_of_week)
);
GRANT SELECT ON public.opening_hours TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.opening_hours TO authenticated;
GRANT ALL ON public.opening_hours TO service_role;
ALTER TABLE public.opening_hours ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads hours" ON public.opening_hours FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage hours" ON public.opening_hours FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id)) WITH CHECK (public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id));

CREATE TABLE public.reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL REFERENCES public.restaurants(id),
  user_id uuid,
  name text NOT NULL,
  phone text NOT NULL,
  reservation_date date NOT NULL,
  reservation_time time NOT NULL,
  party_size integer NOT NULL CHECK (party_size BETWEEN 1 AND 30),
  notes text,
  status public.reservation_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.reservations TO authenticated;
GRANT ALL ON public.reservations TO service_role;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own reservations" ON public.reservations FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id) OR public.has_role(auth.uid(),'staff',restaurant_id));
CREATE POLICY "Users create own reservations" ON public.reservations FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Staff updates reservations" ON public.reservations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id) OR public.has_role(auth.uid(),'staff',restaurant_id)) WITH CHECK (public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id) OR public.has_role(auth.uid(),'staff',restaurant_id));
CREATE INDEX reservations_date_idx ON public.reservations(restaurant_id, reservation_date, reservation_time);

CREATE TABLE public.coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  code text NOT NULL,
  discount_type text NOT NULL CHECK (discount_type IN ('fixed','percentage')),
  discount_value integer NOT NULL CHECK (discount_value > 0),
  min_order_cents integer NOT NULL DEFAULT 0,
  starts_at timestamptz,
  ends_at timestamptz,
  usage_limit integer,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(restaurant_id, code)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.coupons TO authenticated;
GRANT ALL ON public.coupons TO service_role;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage coupons" ON public.coupons FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id)) WITH CHECK (public.has_role(auth.uid(),'admin',restaurant_id) OR public.has_role(auth.uid(),'manager',restaurant_id));

ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reservations;