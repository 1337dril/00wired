import { Link } from "wouter";
import ParticlesBackground from "./ParticlesBackground";

export default function HeroSection() {
  return (
    <div className="hero h-96 relative">
      <ParticlesBackground />
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-6xl text-white  font-bold">WIRED</h1>
          <h2 className="mb-5 text-xl ">
            An open source network for secure communication
          </h2>
          <Link href="/app/dashboard">
            <button className="btn btn-block hover:bg-purple-900 hover:text-white hover:border-purple-900 btn-outline">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
