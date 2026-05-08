// Hand-written to mirror supabase/migrations/*.sql.
// Replace by running: npx supabase gen types typescript --linked > app/lib/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type IntegrationProvider =
  | "gmail"
  | "github"
  | "slack"
  | "discord"
  | "google_calendar"
  | "voice";

export type IntegrationStatus =
  | "connected"
  | "disconnected"
  | "error"
  | "syncing"
  | "paused";

export type GoalStatus = "on-track" | "slipping" | "paused";
export type ReportType = "weekly" | "monthly";
export type AskRole = "user" | "assistant";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      integrations: {
        Row: {
          id: string;
          user_id: string;
          provider: IntegrationProvider;
          status: IntegrationStatus;
          external_account_id: string | null;
          scopes: string[];
          connected_at: string;
          last_synced_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          provider: IntegrationProvider;
          status?: IntegrationStatus;
          external_account_id?: string | null;
          scopes?: string[];
          connected_at?: string;
          last_synced_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          provider?: IntegrationProvider;
          status?: IntegrationStatus;
          external_account_id?: string | null;
          scopes?: string[];
          connected_at?: string;
          last_synced_at?: string | null;
        };
        Relationships: [];
      };
      entries: {
        Row: {
          id: string;
          user_id: string;
          entry_date: string;        // ISO date "YYYY-MM-DD"
          title: string;
          excerpt: string | null;
          body: string[];
          mood: string | null;
          voice: string | null;
          minutes: number;
          threads: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          entry_date: string;
          title: string;
          excerpt?: string | null;
          body?: string[];
          mood?: string | null;
          voice?: string | null;
          minutes?: number;
          threads?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          entry_date?: string;
          title?: string;
          excerpt?: string | null;
          body?: string[];
          mood?: string | null;
          voice?: string | null;
          minutes?: number;
          threads?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      goals: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          reason: string | null;
          status: GoalStatus;
          progress: number;
          sparkline: Json;
          last_evaluated: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          reason?: string | null;
          status?: GoalStatus;
          progress?: number;
          sparkline?: Json;
          last_evaluated?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          reason?: string | null;
          status?: GoalStatus;
          progress?: number;
          sparkline?: Json;
          last_evaluated?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      reports: {
        Row: {
          id: string;
          user_id: string;
          type: ReportType;
          period_id: string;
          label: string;
          date_range: string;
          summary: string | null;
          payload: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: ReportType;
          period_id: string;
          label: string;
          date_range: string;
          summary?: string | null;
          payload?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: ReportType;
          period_id?: string;
          label?: string;
          date_range?: string;
          summary?: string | null;
          payload?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      ask_conversations: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      ask_messages: {
        Row: {
          id: string;
          conversation_id: string;
          user_id: string;
          role: AskRole;
          content: string;
          cited_text: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          user_id: string;
          role: AskRole;
          content: string;
          cited_text?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          user_id?: string;
          role?: AskRole;
          content?: string;
          cited_text?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: {
      integration_provider: IntegrationProvider;
      integration_status: IntegrationStatus;
      goal_status: GoalStatus;
      report_type: ReportType;
      ask_role: AskRole;
    };
    CompositeTypes: { [_ in never]: never };
  };
};
