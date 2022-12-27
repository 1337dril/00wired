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

  const signupHandler = (e) => {
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
    registerUser({
      username: usernameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value,
    })
      .then(() => setLocation("/app/dashboard"))
      .catch((e) => {
        setFormError(e.message.split("|"));
      })
      .finally(() => {
        passwordRef.current.value = "";
        confirmPasswordRef.current.value = "";
      });
  };

  return (
    <div className="flex h-screen items-center justify-center text-white">
      <ParticlesBackground />

      <div className="card glass relative h-[95%] min-h-fit w-96 lg:h-4/5">
        <button
          className="btn-outline btn-circle btn absolute top-3 left-3 rotate-[-90deg] overflow-hidden"
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
              className="input my-1 w-full max-w-xs"
            />
            <input
              type="email"
              ref={emailRef}
              placeholder="Email"
              className="input my-1 w-full max-w-xs"
            />
            <input
              type="password"
              ref={passwordRef}
              placeholder="Password"
              className="input my-1 w-full max-w-xs"
            />
            <input
              type="password"
              ref={confirmPasswordRef}
              placeholder="Confirm Password"
              className="input my-1 w-full max-w-xs"
            />
            <div className="my-2">
              {formError.map((err, idx) => (
                <div
                  key={idx}
                  className="my-1 rounded-sm border border-error p-2"
                >
                  <p className="text-sm font-semibold text-error">{err}</p>
                </div>
              ))}
            </div>

            <div className="card-actions my-2 justify-center">
              <button className="btn-outline btn">Signup!</button>
            </div>

            <div className="card-actions">
              <p>
                Already have an account?{" "}
                <Link className="btn-link mt-5 text-purple-700" href="/login">
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
