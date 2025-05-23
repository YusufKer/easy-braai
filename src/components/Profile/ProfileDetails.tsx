import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import { checkIfDeliveryIsAvailable } from "../../utils/calculations";
import { useAuthStore, UserDetails } from "../../context/authStore";
import EditAddressForm from "./EditAddressForm";

export default function ProfileDetails() {
  const authStore = useAuthStore();
  const profileFormRef = useRef<HTMLFormElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const addressLatRef = useRef<HTMLInputElement>(null);
  const addressLngRef = useRef<HTMLInputElement>(null);
  const [addressWithinRadius, setAddressWithingRadius] = useState<
    boolean | null
  >(null);
  const [openEditAddressModal, setOpenEditAddressModal] = useState(false);
  async function updateAddress(addressObject: {
    address: string;
    lat: number;
    lng: number;
  }) {
    addressInputRef.current!.value = addressObject.address;
    addressLatRef.current!.value = addressObject.lat.toString();
    addressLngRef.current!.value = addressObject.lng.toString();
    const weDeliver = checkIfDeliveryIsAvailable(
      addressObject.lat,
      addressObject.lng
    );
    setAddressWithingRadius(weDeliver);
    if (!weDeliver) return;
    authStore?.updateUserDetailsInFirestore(addressObject);
    await authStore?.getUpdatedUserDetailsFromFirestore();
    setOpenEditAddressModal(false);
    // now we need to get the updated address from the firestore
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(profileFormRef.current!);
    const data = Object.fromEntries(formData.entries());
    authStore?.updateUserDetailsInFirestore(data as UserDetails);
  }

  function toggleEditAddressModal() {
    setOpenEditAddressModal((prev) => !prev);
  }

  useEffect(() => {
    // TODO: Other details should also be fetched from the user if they have been set
    // TODO: Add email verification before allowing users to order
    if (!authStore?.user) return;
    if (!profileFormRef.current) return;
    // TODO: consider some error handling here
    if (!authStore.userDetails) return;
    profileFormRef.current.email.value = authStore?.user?.email;
    (
      profileFormRef.current.elements.namedItem("name") as HTMLInputElement
    ).value = authStore.userDetails.name;
    profileFormRef.current.surname.value = authStore.userDetails.surname;
    profileFormRef.current.cell.value = authStore.userDetails.cell;
    profileFormRef.current.address.value = authStore.userDetails.address;
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
        <label htmlFor="address" className="block">
          <span>Address</span>
          {/* TODO: make it so that address input component allows for an initial value */}
          {/* TODO: look into restricting this to locations in south africa, specifically inside the western cape */}
          {/* TODO: looks like a better option would be to have a separate function that updates only the address. This way we won't need to struggle trying to get places API to work with our system */}
          <div className="flex gap-2">
            <div className="w-full px-4 py-2 rounded border border-white">
              {authStore?.userDetails?.address}
            </div>
            <Button
              handleClick={toggleEditAddressModal}
              type="info"
              classList="h-min"
            >
              {openEditAddressModal ? "Cancel" : "Edit"}
            </Button>
          </div>
          {openEditAddressModal && <EditAddressForm update={updateAddress} />}

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
