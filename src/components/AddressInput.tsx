import { useEffect, useRef } from "react";

type AddressInputProps = {
  update: (addressObject: {
    address: string;
    lat: number;
    lng: number;
    initialValue?: string;
  }) => void;
};

export default function AddressInput({ update }: AddressInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // TODO: Look into making this better. Right now it pretty kak
  useEffect(() => {
    (async function () {
      (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
      const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement(
        {
          types: ["address"],
          componentRestrictions: { country: ["za"] },
        }
      );
      if (!containerRef.current) return;
      if (containerRef.current.children.length > 0) return;

      containerRef.current.appendChild(placeAutocomplete);
      placeAutocomplete.addEventListener(
        "gmp-select",
        // @ts-expect-error
        async ({ placePrediction }) => {
          const place = placePrediction.toPlace();
          await place.fetchFields({
            fields: ["displayName", "formattedAddress", "location"],
          });
          update({
            address: place.formattedAddress,
            lat: place.location.lat(),
            lng: place.location.lng(),
          });
        }
      );
    })();
  });
  return <div className="w-full rounded bg-white" ref={containerRef}></div>;
}
