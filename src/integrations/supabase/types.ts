export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_chat_history: {
        Row: {
          created_at: string | null
          id: string
          messages: Json
          ticker: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          messages?: Json
          ticker?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          messages?: Json
          ticker?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      cached_market_data: {
        Row: {
          data: Json
          data_type: string
          expires_at: string
          fetched_at: string | null
          id: string
          ticker: string
        }
        Insert: {
          data: Json
          data_type: string
          expires_at: string
          fetched_at?: string | null
          id?: string
          ticker: string
        }
        Update: {
          data?: Json
          data_type?: string
          expires_at?: string
          fetched_at?: string | null
          id?: string
          ticker?: string
        }
        Relationships: []
      }
      cached_news: {
        Row: {
          expires_at: string
          fetched_at: string | null
          headlines: Json
          id: string
          sentiment_summary: Json | null
          ticker: string
        }
        Insert: {
          expires_at: string
          fetched_at?: string | null
          headlines: Json
          id?: string
          sentiment_summary?: Json | null
          ticker: string
        }
        Update: {
          expires_at?: string
          fetched_at?: string | null
          headlines?: Json
          id?: string
          sentiment_summary?: Json | null
          ticker?: string
        }
        Relationships: []
      }
      portfolio_positions: {
        Row: {
          cost_basis: number
          created_at: string | null
          id: string
          notes: string | null
          shares: number
          ticker: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cost_basis: number
          created_at?: string | null
          id?: string
          notes?: string | null
          shares: number
          ticker: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cost_basis?: number
          created_at?: string | null
          id?: string
          notes?: string | null
          shares?: number
          ticker?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          ai_messages_reset_date: string | null
          ai_messages_today: number | null
          created_at: string | null
          disclaimer_accepted: boolean | null
          disclaimer_accepted_at: string | null
          email: string | null
          full_name: string | null
          id: string
          tier: string | null
          updated_at: string | null
        }
        Insert: {
          ai_messages_reset_date?: string | null
          ai_messages_today?: number | null
          created_at?: string | null
          disclaimer_accepted?: boolean | null
          disclaimer_accepted_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          tier?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_messages_reset_date?: string | null
          ai_messages_today?: number | null
          created_at?: string | null
          disclaimer_accepted?: boolean | null
          disclaimer_accepted_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          tier?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      watchlist_items: {
        Row: {
          added_at: string | null
          id: string
          ticker: string
          user_id: string
        }
        Insert: {
          added_at?: string | null
          id?: string
          ticker: string
          user_id: string
        }
        Update: {
          added_at?: string | null
          id?: string
          ticker?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
