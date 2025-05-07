import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import { useAuthStore } from "../context/authStore";

export default function Signup() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const authStore = useAuthStore();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
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
    const success = await authStore?.signup(
      emailRef.current?.value as string,
      passwordRef.current?.value as string,
      {
        name: nameRef.current?.value as string,
        surname: surnameRef.current?.value as string,
      }
    );

    if (success) {
      navigate("/");
    }
  }

  useEffect(() => {
    console.log("I have mounted...");
    if (authStore?.user) {
      navigate("/");
    }
  }, [authStore?.user, navigate]);

  return (
    <div className="bg-white p-4 rounded space-y-4">
      <h1 className="text-2xl font-bold">Signup</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="grid gap-2 md:grid-cols-[140px_auto] items-center">
          <label>Name</label>
          <input
            type="text"
            ref={nameRef}
            className="bg-white px-4 py-2 rounded"
            required
          />
        </div>
        <div className="grid gap-2 md:grid-cols-[140px_auto] items-center">
          <label>Surname</label>
          <input
            type="text"
            ref={surnameRef}
            className="bg-white px-4 py-2 rounded"
            required
          />
        </div>
        <div className="grid gap-2 md:grid-cols-[140px_auto] items-center">
          <label>Email</label>
          <input
            type="email"
            ref={emailRef}
            className="bg-white px-4 py-2 rounded"
            required
          />
        </div>
        {/* TODO: Either remove phone number from the sign up form or, add phone number to firestore and get it from there. problem is that it would then be living in two places and when a user updates one, we'd have to always make sure to update both */}
        <div className="grid gap-2 md:grid-cols-[140px_auto] items-center">
          <label>Phone number</label>
          <input
            type="tel"
            ref={phoneNumberRef}
            className="bg-white px-4 py-2 rounded"
            required
          />
        </div>
        <div className="grid gap-2 md:grid-cols-[140px_auto] items-center">
          <label>Password</label>
          <input
            type="password"
            ref={passwordRef}
            className="bg-white px-4 py-2 rounded"
            required
          />
        </div>
        <div className="grid gap-2 md:grid-cols-[140px_auto] items-center">
          <label>Confirm Password</label>
          <input
            type="password"
            ref={confirmPasswordRef}
            className="bg-white px-4 py-2 rounded"
            required
          />
        </div>
        <Button buttonType="submit" type="success" disabled={isLoading}>
          Signup
        </Button>
        {validationErrors.length > 0 && (
          <div className="bg-red-500 text-white p-2 rounded">
            {validationErrors.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
