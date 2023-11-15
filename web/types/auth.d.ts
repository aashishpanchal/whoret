declare namespace Auth {
  export type UserState = {
    _id: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    is_block: boolean;
    role: string;
    is_verified: boolean;
    profile_img: string;
    login_at: string;
    created_at: string;
    updated_at: string;
    [key: string]: any;
  };

  export type AuthState = { user: UserState };
}
