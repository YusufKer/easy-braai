import { use, useEffect, useRef, useState } from "react";
import AddressInput from "../AddressInput";
import Button from "../Button";
import { checkIfDeliveryIsAvailable } from "../../utils/calculations";
import { useAuthStore } from "../../context/authStore";

export default function ProfileDetails() {
  const authStore = useAuthStore();
  // TODO: User details should be part of global state and fetched from the server to prepopulate some of the fields
  const profileFormRef = useRef<HTMLFormElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const addressLatRef = useRef<HTMLInputElement>(null);
  const addressLngRef = useRef<HTMLInputElement>(null);
  const [addressWithinRadius, setAddressWithingRadius] = useState<
    boolean | null
  >(null);

  function updateAddress(addressObject: {
    address: string;
    lat: number;
    lng: number;
  }) {
    addressInputRef.current!.value = addressObject.address;
    addressLatRef.current!.value = addressObject.lat.toString();
    addressLngRef.current!.value = addressObject.lng.toString();
    setAddressWithingRadius(
      checkIfDeliveryIsAvailable(addressObject.lat, addressObject.lng)
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(profileFormRef.current!);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted", data);
  }

  useEffect(() => {
    // TODO: Other details should also be fetched from the user if they have been set
    // TODO: Add email verification before allowing users to order
    if (!authStore?.user) return;
    if (!profileFormRef.current) return;
    console.log(authStore?.user);
    profileFormRef.current.email.value = authStore?.user?.email;
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
          <input
            name="cell"
            required
            id="cell"
            className="w-full px-4 py-2 rounded bg-white"
            type="tel"
          />
        </label>
        <label htmlFor="address" className="block">
          <span>Address</span>
          <AddressInput update={updateAddress} />
          <input ref={addressInputRef} type="text" name="address" hidden />
          <input ref={addressLatRef} type="text" name="lat" hidden />
          <input ref={addressLngRef} type="text" name="lng" hidden />
        </label>
        {addressWithinRadius === false && <p>We do not deliver to your area</p>}
        <Button type="success" buttonType="submit">
          Save
        </Button>
      </form>
    </div>
  );
}
