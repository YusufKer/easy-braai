import { useRef, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Button from "../components/Button";
import { useModalStore } from "../context/modalStore";

export default function Signup() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const auth = getAuth();
  const modalStore = useModalStore();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationErrors([]);
    const errors = [];
    if (!emailRef.current?.value) {
      errors.push("Email is required");
    }
    if (!passwordRef.current?.value) {
      errors.push("Password is required");
    }
    if (!confirmPasswordRef.current?.value) {
      errors.push("Confirm Password is required");
    }
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      errors.push("Passwords do not match");
    }
    if (errors.length) {
      setValidationErrors(errors);
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      emailRef.current?.value as string,
      passwordRef.current?.value as string
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        modalStore?.closeLoginModal();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        // ..
      });
  }
  return (
    <div
      onClick={() => modalStore?.closeSignupModal()}
      className="bg-black/35 absolute top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div
        className="bg-white p-4 rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold">Signup</h1>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="grid gap-2 grid-cols-[140px_auto] items-center">
            <label>Email</label>
            <input
              type="email"
              ref={emailRef}
              className="bg-white px-4 py-2 rounded"
            />
          </div>
          <div className="grid gap-2 grid-cols-[140px_auto] items-center">
            <label>Password</label>
            <input
              type="password"
              ref={passwordRef}
              className="bg-white px-4 py-2 rounded"
            />
          </div>
          <div className="grid gap-2 grid-cols-[140px_auto] items-center">
            <label>Confirm Password</label>
            <input
              type="password"
              ref={confirmPasswordRef}
              className="bg-white px-4 py-2 rounded"
            />
          </div>
          <Button type="success">Signup</Button>
          {validationErrors.length > 0 && (
            <div className="bg-red-500 text-white p-2 rounded">
              {validationErrors.map((error) => (
                <div key={error}>{error}</div>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
