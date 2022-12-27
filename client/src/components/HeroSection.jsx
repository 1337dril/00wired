import { Link } from "wouter";
import ParticlesBackground from "./ParticlesBackground";

export default function HeroSection() {
  return (
    <div className="hero relative h-96">
      <ParticlesBackground />
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-dark-gray-100">
        <div className="max-w-md">
          <h1 className="mb-5 text-6xl font-bold  text-white">WIRED</h1>
          <h2 className="mb-5 text-xl ">
            An open source network for secure communication
          </h2>
          <Link href="/app/dashboard">
            <button className="btn-outline btn-block btn hover:border-purple-900 hover:bg-purple-900 hover:text-white">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
