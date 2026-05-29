
-- Roles enum & table
CREATE TYPE public.app_role AS ENUM ('admin', 'trainer', 'member');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT,
  phone TEXT,
  date_of_birth DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Memberships
CREATE TABLE public.memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'basic',
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.memberships TO authenticated;
GRANT ALL ON public.memberships TO service_role;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- Workouts
CREATE TABLE public.workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  notes TEXT,
  duration_minutes INTEGER DEFAULT 0,
  calories_burned INTEGER DEFAULT 0,
  workout_date DATE NOT NULL DEFAULT CURRENT_DATE,
  exercises JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.workouts TO authenticated;
GRANT ALL ON public.workouts TO service_role;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;

-- Nutrition plans (trainer -> member)
CREATE TABLE public.meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  daily_calorie_target INTEGER DEFAULT 2000,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.meal_plans TO authenticated;
GRANT ALL ON public.meal_plans TO service_role;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;

-- Daily meal logs
CREATE TABLE public.meal_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  meal_name TEXT NOT NULL,
  calories INTEGER NOT NULL DEFAULT 0,
  meal_type TEXT NOT NULL DEFAULT 'snack',
  logged_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.meal_logs TO authenticated;
GRANT ALL ON public.meal_logs TO service_role;
ALTER TABLE public.meal_logs ENABLE ROW LEVEL SECURITY;

-- Trainer assignments
CREATE TABLE public.trainer_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(trainer_id, member_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.trainer_assignments TO authenticated;
GRANT ALL ON public.trainer_assignments TO service_role;
ALTER TABLE public.trainer_assignments ENABLE ROW LEVEL SECURITY;

-- Payments
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  membership_id UUID REFERENCES public.memberships(id) ON DELETE SET NULL,
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'KES',
  method TEXT NOT NULL DEFAULT 'cash',
  status TEXT NOT NULL DEFAULT 'completed',
  reference TEXT,
  paid_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Helper: is trainer of member?
CREATE OR REPLACE FUNCTION public.is_trainer_of(_trainer UUID, _member UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.trainer_assignments WHERE trainer_id = _trainer AND member_id = _member)
$$;

-- RLS policies
-- profiles: anyone authenticated can view all profiles (needed for trainer/admin lists); user updates own
CREATE POLICY "view profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(),'admin'));

-- user_roles: user sees own roles; admin sees all
CREATE POLICY "view own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- memberships
CREATE POLICY "view memberships" ON public.memberships FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'trainer'));
CREATE POLICY "admin manage memberships" ON public.memberships FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- workouts: member CRUD own; trainer can view/insert for assigned members; admin all
CREATE POLICY "view workouts" ON public.workouts FOR SELECT TO authenticated USING (
  user_id = auth.uid() OR public.has_role(auth.uid(),'admin') OR public.is_trainer_of(auth.uid(), user_id)
);
CREATE POLICY "insert workouts" ON public.workouts FOR INSERT TO authenticated WITH CHECK (
  user_id = auth.uid() OR public.has_role(auth.uid(),'admin') OR public.is_trainer_of(auth.uid(), user_id)
);
CREATE POLICY "update workouts" ON public.workouts FOR UPDATE TO authenticated USING (
  user_id = auth.uid() OR public.has_role(auth.uid(),'admin') OR public.is_trainer_of(auth.uid(), user_id)
);
CREATE POLICY "delete workouts" ON public.workouts FOR DELETE TO authenticated USING (
  user_id = auth.uid() OR public.has_role(auth.uid(),'admin')
);

-- meal_plans
CREATE POLICY "view meal_plans" ON public.meal_plans FOR SELECT TO authenticated USING (
  user_id = auth.uid() OR public.has_role(auth.uid(),'admin') OR public.is_trainer_of(auth.uid(), user_id)
);
CREATE POLICY "manage meal_plans" ON public.meal_plans FOR ALL TO authenticated USING (
  public.has_role(auth.uid(),'admin') OR public.is_trainer_of(auth.uid(), user_id)
) WITH CHECK (
  public.has_role(auth.uid(),'admin') OR public.is_trainer_of(auth.uid(), user_id)
);

-- meal_logs (members own)
CREATE POLICY "view meal_logs" ON public.meal_logs FOR SELECT TO authenticated USING (
  user_id = auth.uid() OR public.has_role(auth.uid(),'admin') OR public.is_trainer_of(auth.uid(), user_id)
);
CREATE POLICY "insert own meal_logs" ON public.meal_logs FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "delete own meal_logs" ON public.meal_logs FOR DELETE TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- trainer_assignments
CREATE POLICY "view assignments" ON public.trainer_assignments FOR SELECT TO authenticated USING (
  trainer_id = auth.uid() OR member_id = auth.uid() OR public.has_role(auth.uid(),'admin')
);
CREATE POLICY "admin manage assignments" ON public.trainer_assignments FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- payments
CREATE POLICY "view payments" ON public.payments FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin manage payments" ON public.payments FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Auto-create profile + default 'member' role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name',''), NEW.email);
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'member');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
