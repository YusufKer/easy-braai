import { useEffect } from "react";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useNavigate } from "react-router";
import ProfileDetails from "../components/Profile/ProfileDetails.tsx";

export default function Profile() {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStore?.user) {
      navigate("/signup");
    }
  }, [authStore?.user, navigate]);

  return authStore?.user && <ProfileDetails />;
}
