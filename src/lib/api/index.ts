import { authRepository } from "@/lib/api/repositories/auth-repository";
import { proteinRepository } from "./repositories/protein-repository";

// Export types
export type {
  ApiResponse,
  Resource,
  User,
  RegisterUserData,
  RegisterResponse,
  LoginUserData,
  LoginResponse,
  UserDetails,
} from "@/lib/api/types";

export const login = authRepository.login.bind(authRepository);
export const logout = authRepository.logout.bind(authRepository);
export const register = authRepository.register.bind(authRepository);
export const getUserDetails =
  authRepository.getUserDetails.bind(authRepository);

export const getProteins = proteinRepository.get.bind(proteinRepository);
