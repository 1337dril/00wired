import { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import ParticlesBackground from "../components/ParticlesBackground";
import { registerUser } from "../utils/api";
import { validateSignup } from "../utils/validators";

export default function Signup() {
  const [, setLocation] = useLocation();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();
  const [formError, setFormError] = useState([]);

  const signupHandler = async (e) => {
    e.preventDefault();
    setFormError([]);

    const clientValidationErrors = validateSignup({
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    });

    if (clientValidationErrors.length > 0) {
      setFormError(clientValidationErrors);
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
      return;
    }

    try {
      await registerUser({
        username: usernameRef.current.value.trim(),
        email: emailRef.current.value.trim(),
        password: passwordRef.current.value,
      });
      setLocation("/app/dashboard");
    } catch (e) {
      setFormError(e.message.split("|"));
      console.error(e);
    } finally {
      usernameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    }
  };

  return (
    <div className="flex justify-center items-center bg-base-300 h-screen">
      <ParticlesBackground />

      <div className="card w-96 glass  min-h-fit relative">
        <button
          className="overflow-hidden btn btn-circle btn-outline rotate-[-90deg] absolute top-3 left-3"
          onClick={() => setLocation("/")}
        >
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            className="fill-base-100"
          >
            <g>
              <path
                d="M46.255,35.941c-0.256,0-0.512-0.098-0.707-0.293l-21.921-21.92l-21.92,21.92c-0.391,0.391-1.023,0.391-1.414,0
		c-0.391-0.391-0.391-1.023,0-1.414L22.92,11.607c0.391-0.391,1.023-0.391,1.414,0l22.627,22.627c0.391,0.391,0.391,1.023,0,1.414
		C46.767,35.844,46.511,35.941,46.255,35.941z"
              />
            </g>
          </svg>
        </button>
        <div className="card-body items-center justify-evenly">
          <h2 className="card-title text-4xl">Sign up</h2>
          <form onSubmit={signupHandler}>
            <input
              type="text"
              ref={usernameRef}
              placeholder="Username"
              className="input w-full my-1 max-w-xs"
            />
            <input
              type="email"
              ref={emailRef}
              placeholder="Email"
              className="input w-full my-1 max-w-xs"
            />
            <input
              type="password"
              ref={passwordRef}
              placeholder="Password"
              className="input w-full my-1 max-w-xs"
            />
            <input
              type="password"
              ref={confirmPasswordRef}
              placeholder="Confirm Password"
              className="input w-full my-1 max-w-xs"
            />
            <div className="my-2">
              {formError.map((err, idx) => (
                <div
                  key={idx}
                  className="my-1 border border-error rounded-sm p-2"
                >
                  <p className="text-sm font-semibold text-error">{err}</p>
                </div>
              ))}
            </div>

            <div className="card-actions justify-center my-2">
              <button className="btn btn-primary">Signup!</button>
            </div>

            <div className="card-actions">
              <p>
                Already have an account?{" "}
                <Link className="btn-link text-secondary" href="/login">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
