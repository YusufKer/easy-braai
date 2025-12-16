import { authRepository } from "@/lib/api/repositories/auth-repository";

// Export types
export type {
  ApiResponse,
  Resource,
  User,
  RegisterUserData,
  RegisterResponse,
  LoginUserData,
  LoginResponse,
} from "@/lib/api/types";

export const login = authRepository.login.bind(authRepository);
export const logout = authRepository.logout.bind(authRepository);
export const register = authRepository.register.bind(authRepository);
