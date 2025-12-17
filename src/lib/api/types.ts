export interface ApiResponse<T> {
  success: boolean;
  message: string;
  timestamp: string;
  data: T;
}

export interface Resource {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export type UserDetails = {
  id: number;
  email: string;
  role: "user" | "admin";
  is_active: 1 | 0;
  created_at: string;
  updated_at: string;
  details: {
    first_name: string;
    last_name: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
  };
  addresses: [
    {
      address_type: string;
      line_1: string;
      line_2: string;
      city: string;
      state: string;
      postal_code: string;
      country_code: string;
      is_default: 1 | 0;
      created_at: string;
      updated_at: string;
    }
  ];
};

export interface RegisterUserData {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

export type MeatOptions = {
  [key: string]: {
    id: string;
    cuts: {
      name: string;
      price: number;
      id: string;
    }[];
    flavours: {
      name: string;
      price: number;
      id: string;
    }[];
  };
};
