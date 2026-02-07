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
      donors: {
        Row: {
          amount: number
          created_at: string
          email: string
          email_sequence_step: number | null
          id: string
          last_email_sent_at: string | null
          name: string
          tier: string
          welcome_email_sent: boolean | null
        }
        Insert: {
          amount: number
          created_at?: string
          email: string
          email_sequence_step?: number | null
          id?: string
          last_email_sent_at?: string | null
          name: string
          tier: string
          welcome_email_sent?: boolean | null
        }
        Update: {
          amount?: number
          created_at?: string
          email?: string
          email_sequence_step?: number | null
          id?: string
          last_email_sent_at?: string | null
          name?: string
          tier?: string
          welcome_email_sent?: boolean | null
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          bounced_at: string | null
          clicked_at: string | null
          created_at: string
          id: string
          opened_at: string | null
          queue_id: string | null
          recipient_email: string
          recipient_id: string | null
          recipient_type: string | null
          resend_email_id: string | null
          sequence_id: string | null
          status: string
          template_id: string | null
        }
        Insert: {
          bounced_at?: string | null
          clicked_at?: string | null
          created_at?: string
          id?: string
          opened_at?: string | null
          queue_id?: string | null
          recipient_email: string
          recipient_id?: string | null
          recipient_type?: string | null
          resend_email_id?: string | null
          sequence_id?: string | null
          status?: string
          template_id?: string | null
        }
        Update: {
          bounced_at?: string | null
          clicked_at?: string | null
          created_at?: string
          id?: string
          opened_at?: string | null
          queue_id?: string | null
          recipient_email?: string
          recipient_id?: string | null
          recipient_type?: string | null
          resend_email_id?: string | null
          sequence_id?: string | null
          status?: string
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_queue_id_fkey"
            columns: ["queue_id"]
            isOneToOne: false
            referencedRelation: "email_queue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_logs_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "email_sequences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_logs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_queue: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          metadata: Json | null
          recipient_email: string
          recipient_id: string | null
          recipient_name: string | null
          recipient_type: string | null
          scheduled_at: string
          sent_at: string | null
          sequence_id: string | null
          status: string
          step_order: number | null
          template_id: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          recipient_email: string
          recipient_id?: string | null
          recipient_name?: string | null
          recipient_type?: string | null
          scheduled_at?: string
          sent_at?: string | null
          sequence_id?: string | null
          status?: string
          step_order?: number | null
          template_id?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          recipient_email?: string
          recipient_id?: string | null
          recipient_name?: string | null
          recipient_type?: string | null
          scheduled_at?: string
          sent_at?: string | null
          sequence_id?: string | null
          status?: string
          step_order?: number | null
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_queue_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "email_sequences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_queue_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_sequences: {
        Row: {
          audience: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          tier_filter: string | null
          trigger_type: string
          updated_at: string
        }
        Insert: {
          audience?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          tier_filter?: string | null
          trigger_type?: string
          updated_at?: string
        }
        Update: {
          audience?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          tier_filter?: string | null
          trigger_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          category: string
          created_at: string
          html_content: string
          id: string
          is_active: boolean
          name: string
          subject: string
          tier_specific: string | null
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          html_content: string
          id?: string
          is_active?: boolean
          name: string
          subject: string
          tier_specific?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          html_content?: string
          id?: string
          is_active?: boolean
          name?: string
          subject?: string
          tier_specific?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sequence_steps: {
        Row: {
          conditions: Json | null
          created_at: string
          delay_hours: number
          id: string
          sequence_id: string
          step_order: number
          template_id: string
        }
        Insert: {
          conditions?: Json | null
          created_at?: string
          delay_hours?: number
          id?: string
          sequence_id: string
          step_order?: number
          template_id: string
        }
        Update: {
          conditions?: Json | null
          created_at?: string
          delay_hours?: number
          id?: string
          sequence_id?: string
          step_order?: number
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sequence_steps_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "email_sequences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sequence_steps_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          amount: number | null
          category: string | null
          created_at: string
          email: string
          email_sequence_step: number | null
          id: string
          interest: string | null
          is_investor: boolean | null
          last_email_sent_at: string | null
          name: string | null
          source: string | null
          tier: string | null
          welcome_email_sent: boolean | null
        }
        Insert: {
          amount?: number | null
          category?: string | null
          created_at?: string
          email: string
          email_sequence_step?: number | null
          id?: string
          interest?: string | null
          is_investor?: boolean | null
          last_email_sent_at?: string | null
          name?: string | null
          source?: string | null
          tier?: string | null
          welcome_email_sent?: boolean | null
        }
        Update: {
          amount?: number | null
          category?: string | null
          created_at?: string
          email?: string
          email_sequence_step?: number | null
          id?: string
          interest?: string | null
          is_investor?: boolean | null
          last_email_sent_at?: string | null
          name?: string | null
          source?: string | null
          tier?: string | null
          welcome_email_sent?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
