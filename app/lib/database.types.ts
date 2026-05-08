// Hand-written to mirror supabase/migrations/0001_init_profiles_integrations.sql.
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
  | "google_calendar";

export type IntegrationStatus = "connected" | "disconnected" | "error";

export interface Database {
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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      integration_provider: IntegrationProvider;
      integration_status: IntegrationStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
