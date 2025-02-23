import { Link } from "react-router";

export default function Footer() {
  return (
    <div className="bg-black text-white">
      <div className="container mx-auto p-4 flex justify-between">
        <Link to="/">Home</Link>
        <div className="grid grid-cols-2 gap-4">
          <ul>
            <li>Legal</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
          <ul>
            <li>Contact</li>
            <li>
              Phone number: <a href="tel:0800 555 444">0800 555 444</a>
            </li>
            <li>
              Email: <a href="mailto:easybraai@test.com">easybraai@test.com</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
