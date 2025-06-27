export interface SupabaseUserMetadata {
  [key: string]: any;
}

export interface SupabaseAppMetadata {
  provider?: string;
  providers?: string[];
  [key: string]: any;
}

export interface SupabaseUserIdentity {
  id: string;
  user_id: string;
  identity_data: {
    [key: string]: any;
  };
  provider: string;
  last_sign_in_at?: string;
  created_at: string;
  updated_at: string;
}

export interface SupabaseFactor {
  id: string;
  created_at: string;
  updated_at: string;
  friendly_name?: string;
  factor_type: string;
  status: string;
}

export interface SupabaseUser {
  id: string;
  aud: string;
  role?: string;
  email?: string;
  email_confirmed_at?: string;
  phone?: string;
  phone_confirmed_at?: string;
  confirmation_sent_at?: string;
  confirmed_at?: string;
  recovery_sent_at?: string;
  email_change_sent_at?: string;
  new_email?: string;
  new_phone?: string;
  invited_at?: string;
  action_link?: string;
  created_at: string;
  updated_at?: string;
  last_sign_in_at?: string;
  app_metadata: SupabaseAppMetadata;
  user_metadata: SupabaseUserMetadata;
  factors?: SupabaseFactor[];
  identities?: SupabaseUserIdentity[];
  is_anonymous?: boolean;
  is_sso_user?: boolean;
}

export interface SupabaseUsersResponse {
  users: SupabaseUser[];
  total: number;
  page?: number;
  per_page?: number;
}

export interface CreateSupabaseUserData {
  email: string;
  password?: string;
  user_metadata?: SupabaseUserMetadata;
  app_metadata?: SupabaseAppMetadata;
  email_confirm?: boolean;
}

export interface UpdateSupabaseUserData {
  email?: string;
  password?: string;
  user_metadata?: SupabaseUserMetadata;
  app_metadata?: SupabaseAppMetadata;
  email_confirm?: boolean;
  phone_confirm?: boolean;
  ban_duration?: string;
}

export interface SupabaseApiError {
  error: string;
  message?: string;
  errors?: Record<string, string[]>;
}
