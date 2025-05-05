import AddressInput from "../AddressInput";

export default function ProfileDetails() {
  function updateAddress(address: string) {
    console.log("Updating...", address);
  }
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <form>
        <label htmlFor="name" className="">
          <span>Name</span>
          <input
            required
            id="name"
            className="w-full px-4 py-2 rounded bg-white"
            type="text"
          />
        </label>
        <label htmlFor="surname" className="">
          <span>Surname</span>
          <input
            required
            id="surname"
            className="w-full px-4 py-2 rounded bg-white"
            type="text"
          />
        </label>
        <label htmlFor="email" className="">
          <span>Email</span>
          <input
            required
            id="email"
            className="w-full px-4 py-2 rounded bg-white"
            type="email"
          />
        </label>
        <label htmlFor="cell" className="">
          <span>Cell</span>
          <input
            required
            id="cell"
            className="w-full px-4 py-2 rounded bg-white"
            type="tel"
          />
        </label>
        <label htmlFor="address" className="">
          <span>Address</span>
          <AddressInput update={updateAddress} />
        </label>
      </form>
    </div>
  );
}
