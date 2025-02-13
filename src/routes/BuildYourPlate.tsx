import PlateBuilder from "../components/BuildYourPlate/PlateBuilder.tsx";

export default function BuildYourPlate() {
  return (
    <div className="space-y-4">
      <h1>Build Your Perfect Braai Plate</h1>

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
