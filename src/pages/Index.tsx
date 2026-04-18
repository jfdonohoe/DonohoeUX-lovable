import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import ConstellationFlourish from "@/components/site/ConstellationFlourish";
import AboutCarousel from "@/components/site/AboutCarousel";
import headshot from "@/assets/headshot.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main>
        {/* HERO */}
        <section className="min-h-screen flex items-center pt-20 overflow-hidden">
          <div className="container-page">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Text */}
              <div className="order-2 lg:order-1 relative">
                {/* curved arrow accent */}
                <div className="absolute -left-16 -top-4 hidden lg:block pointer-events-none">
                  <svg width="60" height="60" viewBox="0 0 40 40" fill="none">
                    <path
                      d="M8 32 Q8 8 32 8"
                      stroke="hsl(var(--accent-warm))"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      opacity="0.4"
                    />
                    <polygon
                      points="29,4 35,8 29,12"
                      fill="hsl(var(--accent-warm))"
                      opacity="0.6"
                    />
                  </svg>
                </div>

                <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-text-subtle mb-4 animate-fade-up">
                  <span className="w-8 h-px bg-text-subtle/40" />
                  UX Designer &amp; Researcher
                </p>

                <h1 className="mb-8 animate-fade-up delay-100">
                  Creating thoughtful{" "}
                  <span className="font-serif italic text-accent-warm font-light">
                    digital experiences
                  </span>
                </h1>

                <p className="text-lg leading-relaxed max-w-xl mb-8 text-text-body animate-fade-up delay-200">
                  I'm a UX designer passionate about crafting intuitive,
                  accessible, and delightful user experiences. Currently based
                  in San Francisco, I help companies transform complex problems
                  into elegant solutions.
                </p>

                <div className="flex items-center gap-6 flex-wrap animate-fade-up delay-300">
                  <a href="#about" className="btn btn-primary">
                    Learn more about me
                    <ArrowRight size={16} />
                  </a>
                  <Link to="/case-studies" className="btn btn-secondary">
                    View my work
                  </Link>
                </div>
              </div>

              {/* Headshot */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-accent-warm-light -rotate-3" />
                  <div className="absolute -inset-4 rounded-full bg-surface-warm rotate-3" />
                  <ConstellationFlourish />
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden z-20">
                    <img
                      src={headshot}
                      alt="John Donohoe"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AboutCarousel />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
