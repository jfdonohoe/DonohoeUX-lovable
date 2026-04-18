import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="py-16 border-t border-border">
    <div className="container-page">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="text-center lg:text-left">
          <p className="font-serif text-2xl font-medium text-text-display mb-1">
            John Donohoe
          </p>
          <p className="text-sm text-text-subtle">
            UX Designer · San Francisco, CA
          </p>
        </div>

        <div className="text-center">
          <p className="text-text-body mb-3">Interested in working together?</p>
          <Link
            to="/contact"
            className="text-accent-warm font-medium hover:text-accent-warm-dark transition-colors"
          >
            Get in touch →
          </Link>
        </div>

        <div className="flex gap-3">
          <a
            href="https://www.linkedin.com/in/jfdonohoe/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-text-subtle hover:bg-accent-warm hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
            </svg>
          </a>
          <a
            href="mailto:john@donohoeux.com"
            aria-label="Email"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-text-subtle hover:bg-accent-warm hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-border-light flex flex-col sm:flex-row items-center justify-center gap-4">
        <p className="text-sm text-text-subtle">
          © {new Date().getFullYear()} John Donohoe. Designed with care.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
