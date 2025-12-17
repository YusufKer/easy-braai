import { useEffect, useRef } from "react";
import { UserDetails } from "@/lib/api";
import { useAuthStore } from "@/hooks/useAuthStore";

export default function ProfileDetails() {
  const authStore = useAuthStore();
  const userDetails: UserDetails | null = authStore?.userDetails as UserDetails;
  const profileFormRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(profileFormRef.current!);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  }

  useEffect(() => {
    if (!profileFormRef.current || !userDetails) return;

    profileFormRef.current["name"].value =
      userDetails?.details?.first_name || "";
    profileFormRef.current["surname"].value =
      userDetails?.details?.last_name || "";
    profileFormRef.current["cell"].value =
      userDetails?.details?.phone_number || "";
    profileFormRef.current["email"].value = userDetails?.email || "";
  });

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <form ref={profileFormRef} onSubmit={handleSubmit} className="space-y-2">
        <label htmlFor="name" className="block">
          <span>Name</span>
          <input
            name="name"
            required
            id="name"
            className="w-full px-4 py-2 rounded bg-white"
            type="text"
          />
        </label>
        <label htmlFor="surname" className="block">
          <span>Surname</span>
          <input
            name="surname"
            required
            id="surname"
            className="w-full px-4 py-2 rounded bg-white"
            type="text"
          />
        </label>
        <label htmlFor="email" className="block">
          <span>Email</span>
          <input
            name="email"
            required
            id="email"
            className="w-full px-4 py-2 rounded bg-white"
            type="email"
          />
        </label>
        <label htmlFor="cell" className="block">
          <span>Cell</span>
          {/* TODO: Look into getting the cel input to work as input type "tel" */}
          <input
            name="cell"
            required
            id="cell"
            className="w-full px-4 py-2 rounded bg-white"
            type="text"
          />
        </label>
      </form>
    </div>
  );
}
