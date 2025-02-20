import { useRef, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Button from "../components/Button";

export default function Login() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const auth = getAuth();

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
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  }
  return (
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
      <Button type="success">Signup</Button>
      {validationErrors.length > 0 && (
        <div className="bg-red-500 text-white p-2 rounded">
          {validationErrors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      )}
    </form>
  );
}
