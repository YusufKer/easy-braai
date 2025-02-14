import Heading from "../components/Heading";
import homepageSrc from "../assets/homepage.png";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-4 items-center">
      <div className="space-y-4 ">
        <Heading headingType="main">
          Effortless Braais, Unforgettable Flavor
        </Heading>

        <p>
          Hosting a braai should be about good food and great company—not the
          hassle of marinating meat or washing endless dishes. That’s where we
          come in.
        </p>

        <p>
          With our <strong>pre-marinated, ready-to-braai meats</strong>, you get{" "}
          <strong>premium cuts</strong> infused with bold flavors, delivered
          straight to your door.
        </p>

        <figure className="relative aspect-square bg-blue-200 md:hidden ">
          <img
            src={homepageSrc}
            alt="A person is cooking meat on a grill"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <span className="hidden">
            Photo by{" "}
            <a href="https://unsplash.com/@marcc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
              Marek Mucha
            </a>{" "}
            on{" "}
            <a href="https://unsplash.com/photos/a-person-is-cooking-meat-on-a-grill-tAFWFWrWGyE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
              Unsplash
            </a>
          </span>
        </figure>

        <Heading>How It Works</Heading>
        <ol type="1" className="list-decimal list-inside">
          <li>
            <strong>Choose Your Cuts</strong> – Select from a variety of premium
            meats.
          </li>
          <li>
            <strong>Pick Your Flavors</strong> – From classic BBQ to bold
            peri-peri, we’ve got something for every taste.
          </li>
          <li>
            <strong>Set Your Portions</strong> – Tell us how many guests you're
            serving (1 plate per person).
          </li>
          <li>
            <strong>Pick Your Delivery Date</strong> – We’ll make sure your
            order arrives fresh and ready to braai.
          </li>
        </ol>

        <p>
          <Link to="/build-your-plate">
            🔥 <strong>Let’s Build Your Plate!</strong> 🔥
          </Link>
        </p>

        <p>
          We'll handle the prep, so all you need to do is{" "}
          <strong>fire up the grill and enjoy</strong>.
        </p>

        <p>
          <strong>
            Less mess, no stress—just delicious, hassle-free braais.
          </strong>
        </p>

        <p>
          <a href="#">Order now</a> and make your next braai effortless!
        </p>
      </div>
      <figure className="relative aspect-square bg-blue-200 md:block hidden">
        <img
          src={homepageSrc}
          alt="A person is cooking meat on a grill"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <span className="hidden">
          Photo by{" "}
          <a href="https://unsplash.com/@marcc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Marek Mucha
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/a-person-is-cooking-meat-on-a-grill-tAFWFWrWGyE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </span>
      </figure>
    </div>
  );
}
