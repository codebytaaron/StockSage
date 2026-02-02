
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  disclaimer_accepted BOOLEAN DEFAULT FALSE,
  disclaimer_accepted_at TIMESTAMPTZ,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro')),
  ai_messages_today INTEGER DEFAULT 0,
  ai_messages_reset_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create watchlist_items table
CREATE TABLE public.watchlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  ticker TEXT NOT NULL,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, ticker)
);

-- Create portfolio_positions table
CREATE TABLE public.portfolio_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  ticker TEXT NOT NULL,
  shares DECIMAL NOT NULL,
  cost_basis DECIMAL NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create cached_market_data table
CREATE TABLE public.cached_market_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker TEXT NOT NULL,
  data JSONB NOT NULL,
  data_type TEXT NOT NULL,
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  UNIQUE(ticker, data_type)
);

-- Create cached_news table
CREATE TABLE public.cached_news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker TEXT NOT NULL,
  headlines JSONB NOT NULL,
  sentiment_summary JSONB,
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  UNIQUE(ticker)
);

-- Create ai_chat_history table
CREATE TABLE public.ai_chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  ticker TEXT,
  messages JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cached_market_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cached_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_history ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Watchlist policies
CREATE POLICY "Users can view own watchlist" ON public.watchlist_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own watchlist" ON public.watchlist_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own watchlist" ON public.watchlist_items FOR DELETE USING (auth.uid() = user_id);

-- Portfolio policies
CREATE POLICY "Users can view own portfolio" ON public.portfolio_positions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own portfolio" ON public.portfolio_positions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own portfolio" ON public.portfolio_positions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own portfolio" ON public.portfolio_positions FOR DELETE USING (auth.uid() = user_id);

-- Cached data is public read for efficiency
CREATE POLICY "Anyone can read cached market data" ON public.cached_market_data FOR SELECT USING (true);
CREATE POLICY "Service can insert cached data" ON public.cached_market_data FOR INSERT WITH CHECK (true);
CREATE POLICY "Service can update cached data" ON public.cached_market_data FOR UPDATE USING (true);

CREATE POLICY "Anyone can read cached news" ON public.cached_news FOR SELECT USING (true);
CREATE POLICY "Service can insert cached news" ON public.cached_news FOR INSERT WITH CHECK (true);
CREATE POLICY "Service can update cached news" ON public.cached_news FOR UPDATE USING (true);

-- AI chat history policies
CREATE POLICY "Users can view own chat history" ON public.ai_chat_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own chat history" ON public.ai_chat_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own chat history" ON public.ai_chat_history FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own chat history" ON public.ai_chat_history FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_portfolio_updated_at BEFORE UPDATE ON public.portfolio_positions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_ai_chat_updated_at BEFORE UPDATE ON public.ai_chat_history FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
