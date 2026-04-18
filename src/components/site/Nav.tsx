import { Link, useLocation } from "react-router-dom";
import headshot from "@/assets/headshot.png";

const links = [
  { to: "/", label: "About" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/contact", label: "Contact" },
];

const Nav = () => {
  const { pathname } = useLocation();
  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b border-border-light bg-background/80">
      <nav className="container-page flex items-center justify-between h-20">
        <Link to="/" aria-label="Home">
          <img
            src={headshot}
            alt="John Donohoe headshot"
            className="w-10 h-10 rounded-full object-cover hover:opacity-80 transition-opacity"
          />
        </Link>
        <ul className="flex items-center gap-1 list-none">
          {links.map((l) => {
            const active = isActive(l.to);
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                    active
                      ? "text-text-display"
                      : "text-text-subtle hover:text-text-display"
                  }`}
                >
                  {l.label}
                  {active && (
                    <span className="absolute left-4 right-4 -bottom-px h-0.5 rounded-full bg-accent-warm" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
