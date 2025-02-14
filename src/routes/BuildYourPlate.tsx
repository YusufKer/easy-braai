import PlateBuilder from "../components/BuildAPlate/PlateBuilder.tsx";
import Heading from "../components/Heading.tsx";

export default function BuildYourPlate() {
  return (
    <div className="space-y-4">
      <Heading headingType="main">Build Your Perfect Braai Plate</Heading>

      <p>
        Customize your braai experience with{" "}
        <strong>flavor-packed, ready-to-grill meats</strong>—no prep, no mess,
        just great taste!
      </p>

      <p>
        <a href="#">Start Building Your Plate</a>
      </p>
      <PlateBuilder />
    </div>
  );
}
