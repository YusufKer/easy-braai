// THIS COULD BE DONE A LOT BETTER, BUT I DON"T CARE RIGHT NOW

import { useState } from "react";
import AddressInput from "../AddressInput";
import Button from "../Button";

type EditAddressFormProps = {
  update: (addressObject: AddressObject) => void;
};
type AddressObject = {
  address: string;
  lat: number;
  lng: number;
};
export default function EditAddressForm(props: EditAddressFormProps) {
  const [address, setAddress] = useState({
    address: "",
    lat: 0,
    lng: 0,
  });

  function updateAddress(addressObject: {
    address: string;
    lat: number;
    lng: number;
  }) {
    setAddress(addressObject);
  }

  function handleSave() {
    props.update(address);
  }
  return (
    <div className="flex gap-2 mt-2">
      <AddressInput update={updateAddress} />
      <Button handleClick={handleSave} type="success">
        Update
      </Button>
    </div>
  );
}
