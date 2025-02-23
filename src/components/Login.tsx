import { useRef, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Button from "../components/Button";
import { useModalStore } from "../context/modalStore";

export default function Login() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
    if (errors.length) {
      setValidationErrors(errors);
      return;
    }

    signInWithEmailAndPassword(
      auth,
      emailRef.current?.value as string,
      passwordRef.current?.value as string
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid);
        modalStore?.closeLoginModal();

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  }

  return (
    <div
      onClick={() => modalStore?.closeLoginModal()}
      className="bg-black/35 fixed top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div
        className="bg-white p-4 rounded space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="grid gap-2 md:grid-cols-[140px_auto] items-center">
            <label>Email</label>
            <input
              type="email"
              ref={emailRef}
              className="bg-white px-4 py-2 rounded"
            />
          </div>
          <div className="grid gap-2 md:grid-cols-[140px_auto] items-center">
            <label>Password</label>
            <input
              type="password"
              ref={passwordRef}
              className="bg-white px-4 py-2 rounded"
            />
          </div>
          <Button type="success">Login</Button>
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
