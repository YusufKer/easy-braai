import { useEffect, useRef, useState } from "react";

type AddressInputProps = {
  update: (address: string) => void;
};

export default function AddressInput({ update }: AddressInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState({
    displayName: "",
    formattedAddress: "",
    location: { lat: 0, lng: 0 },
  });

  function checkIfDeliveryIsAvailable(lat: number, lng: number) {
    // {
    //     "lat": -34.007824899999996,
    //     "lng": 18.463276399999998
    // }
    const businessLocation = {
      lat: -34.007824899999996,
      lng: 18.463276399999998,
    };
    console.log({ lat, lng });
  }

  useEffect(() => {
    (async function () {
      (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
      const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement(
        {
          types: ["address"],
          componentRestrictions: { country: "za" },
        }
      );
      if (!containerRef.current) return;
      if (containerRef.current.children.length > 0) return;

      containerRef.current.appendChild(placeAutocomplete);
      placeAutocomplete.addEventListener(
        "gmp-select",
        async ({ placePrediction }) => {
          const place = placePrediction.toPlace();
          await place.fetchFields({
            fields: ["displayName", "formattedAddress", "location"],
          });
          setAddress({
            displayName: place.displayName,
            formattedAddress: place.formattedAddress,
            location: place.location,
          });
          update(place.formattedAddress);
          checkIfDeliveryIsAvailable(
            place.location?.lat(),
            place.location?.lng()
          );
        }
      );
    })();
  });
  return <div className="w-full rounded bg-white" ref={containerRef}></div>;
}
