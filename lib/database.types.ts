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
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admin_audit_log: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: number
          psid: string
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: never
          psid: string
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: never
          psid?: string
        }
        Relationships: []
      }
      ai_solutions: {
        Row: {
          asset_code: string | null
          category: string | null
          company_id: string
          created_at: string
          description: string
          examples: Json | null
          id: string
          installs_count: number | null
          long_description: string | null
          pricing_amount: number | null
          pricing_model: string
          slug: string
          status: string
          stellar_contract_address: string | null
          tech_stack: string[] | null
          title: string
          updated_at: string
          use_cases: string[] | null
        }
        Insert: {
          asset_code?: string | null
          category?: string | null
          company_id: string
          created_at?: string
          description: string
          examples?: Json | null
          id?: string
          installs_count?: number | null
          long_description?: string | null
          pricing_amount?: number | null
          pricing_model?: string
          slug: string
          status?: string
          stellar_contract_address?: string | null
          tech_stack?: string[] | null
          title: string
          updated_at?: string
          use_cases?: string[] | null
        }
        Update: {
          asset_code?: string | null
          category?: string | null
          company_id?: string
          created_at?: string
          description?: string
          examples?: Json | null
          id?: string
          installs_count?: number | null
          long_description?: string | null
          pricing_amount?: number | null
          pricing_model?: string
          slug?: string
          status?: string
          stellar_contract_address?: string | null
          tech_stack?: string[] | null
          title?: string
          updated_at?: string
          use_cases?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_solutions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks: {
        Row: {
          created_at: string
          id: string
          solution_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          solution_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          solution_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "ai_solutions"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      chat_history: {
        Row: {
          content: string
          created_at: string | null
          id: number
          psid: string
          role: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: never
          psid: string
          role: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: never
          psid?: string
          role?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          created_at: string
          description: string
          id: string
          logo_url: string | null
          long_description: string | null
          name: string
          rating: number | null
          slug: string
          stellar_address: string | null
          tags: string[] | null
          updated_at: string
          verified: boolean | null
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          logo_url?: string | null
          long_description?: string | null
          name: string
          rating?: number | null
          slug: string
          stellar_address?: string | null
          tags?: string[] | null
          updated_at?: string
          verified?: boolean | null
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          logo_url?: string | null
          long_description?: string | null
          name?: string
          rating?: number | null
          slug?: string
          stellar_address?: string | null
          tags?: string[] | null
          updated_at?: string
          verified?: boolean | null
          website_url?: string | null
        }
        Relationships: []
      }
      gmail_credentials: {
        Row: {
          app_password: string
          email: string
          psid: string
          updated_at: string | null
        }
        Insert: {
          app_password: string
          email: string
          psid: string
          updated_at?: string | null
        }
        Update: {
          app_password?: string
          email?: string
          psid?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      long_term_memory: {
        Row: {
          content: string
          created_at: string | null
          id: number
          importance: number | null
          psid: string
          source: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: never
          importance?: number | null
          psid: string
          source?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: never
          importance?: number | null
          psid?: string
          source?: string | null
        }
        Relationships: []
      }
      memory_embeddings: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          id: number
          message_id: number | null
          psid: string
          type: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: never
          message_id?: number | null
          psid: string
          type?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: never
          message_id?: number | null
          psid?: string
          type?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          is_read: boolean | null
          notification_type: string
          reference_id: string | null
          reference_type: string | null
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          notification_type?: string
          reference_id?: string | null
          reference_type?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          notification_type?: string
          reference_id?: string | null
          reference_type?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          completed_projects: number | null
          created_at: string
          discord_handle: string | null
          display_name: string
          github_handle: string | null
          id: string
          reputation: number | null
          role: string
          skills: string[] | null
          stellar_address: string | null
          twitter_handle: string | null
          updated_at: string
          username: string
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          completed_projects?: number | null
          created_at?: string
          discord_handle?: string | null
          display_name: string
          github_handle?: string | null
          id: string
          reputation?: number | null
          role?: string
          skills?: string[] | null
          stellar_address?: string | null
          twitter_handle?: string | null
          updated_at?: string
          username: string
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          completed_projects?: number | null
          created_at?: string
          discord_handle?: string | null
          display_name?: string
          github_handle?: string | null
          id?: string
          reputation?: number | null
          role?: string
          skills?: string[] | null
          stellar_address?: string | null
          twitter_handle?: string | null
          updated_at?: string
          username?: string
          website_url?: string | null
        }
        Relationships: []
      }
      project_milestones: {
        Row: {
          amount: number | null
          asset_code: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          project_id: string
          sort_order: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          amount?: number | null
          asset_code?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          project_id: string
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          amount?: number | null
          asset_code?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          project_id?: string
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          asset_code: string | null
          budget_max: number | null
          budget_min: number | null
          created_at: string
          desired_outcome: string | null
          id: string
          problem_description: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          asset_code?: string | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string
          desired_outcome?: string | null
          id?: string
          problem_description: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          asset_code?: string | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string
          desired_outcome?: string | null
          id?: string
          problem_description?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          psid: string
          request_count: number | null
          window_start: string | null
        }
        Insert: {
          psid: string
          request_count?: number | null
          window_start?: string | null
        }
        Update: {
          psid?: string
          request_count?: number | null
          window_start?: string | null
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          created_at: string
          id: string
          project_id: string
          reasoning: string | null
          relevance_score: number | null
          solution_id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          reasoning?: string | null
          relevance_score?: number | null
          solution_id: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          reasoning?: string | null
          relevance_score?: number | null
          solution_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendations_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "ai_solutions"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          body: string | null
          created_at: string
          id: string
          rating: number
          solution_id: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          rating: number
          solution_id: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          rating?: number
          solution_id?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "ai_solutions"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          asset_code: string
          created_at: string
          from_address: string
          id: string
          memo: string | null
          project_id: string | null
          solution_id: string | null
          status: string
          stellar_tx_hash: string
          to_address: string
          tx_type: string
        }
        Insert: {
          amount: number
          asset_code?: string
          created_at?: string
          from_address: string
          id?: string
          memo?: string | null
          project_id?: string | null
          solution_id?: string | null
          status?: string
          stellar_tx_hash: string
          to_address: string
          tx_type?: string
        }
        Update: {
          amount?: number
          asset_code?: string
          created_at?: string
          from_address?: string
          id?: string
          memo?: string | null
          project_id?: string | null
          solution_id?: string | null
          status?: string
          stellar_tx_hash?: string
          to_address?: string
          tx_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "ai_solutions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: number
          is_admin: boolean | null
          last_name: string | null
          profile_pic: string | null
          psid: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id?: never
          is_admin?: boolean | null
          last_name?: string | null
          profile_pic?: string | null
          psid: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: never
          is_admin?: boolean | null
          last_name?: string | null
          profile_pic?: string | null
          psid?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      wallets: {
        Row: {
          connected_at: string
          id: string
          last_seen_at: string
          profile_id: string | null
          stellar_address: string
        }
        Insert: {
          connected_at?: string
          id?: string
          last_seen_at?: string
          profile_id?: string | null
          stellar_address: string
        }
        Update: {
          connected_at?: string
          id?: string
          last_seen_at?: string
          profile_id?: string | null
          stellar_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      match_memories: {
        Args: { match_count?: number; p_psid?: string; query_embedding: string }
        Returns: {
          content: string
          id: number
          similarity: number
          type: string
        }[]
      }
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
