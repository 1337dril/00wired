import { useRef } from "react";
import { Link, useLocation } from "wouter";
import ParticlesBackground from "../components/ParticlesBackground";
import useStore from "../store/useStore";

export default function Login() {
  const [, setLocation] = useLocation();
  const loginUser = useStore((state) => state.loginUser);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await loginUser({
        username: usernameRef.current.value.trim(),
        password: passwordRef.current.value,
      });
      setLocation("/app/dashboard");
    } catch (e) {
      console.error(e);
    } finally {
      usernameRef.current.value = "";
      passwordRef.current.value = "";
    }
  };
  return (
    <div className="flex justify-center items-center bg-base-300 h-screen">
      <ParticlesBackground />
      <div className="card w-96 glass h-1/2 relative">
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
          <h2 className="card-title  text-4xl">Login</h2>
          <form onSubmit={loginHandler}>
            <input
              type="text"
              ref={usernameRef}
              placeholder="Username"
              className="input w-full my-1 max-w-xs"
            />
            <input
              type="password"
              ref={passwordRef}
              placeholder="Password"
              className="input w-full my-1 max-w-xs"
            />

            <div className="card-actions justify-center my-2">
              <button className="btn btn-primary">Login!</button>
            </div>
            <div className="card-actions">
              <p>
                Don't have an account?{" "}
                <Link className="btn-link text-secondary" href="/signup">
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
