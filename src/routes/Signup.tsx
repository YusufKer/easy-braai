import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import { useAuthStore } from "../context/authStore";

export default function Signup() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

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
  );
}
