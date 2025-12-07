import { FaXTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer bg-base-200/50 text-base-content border-t border-base-300/50">
      <div className="container mx-auto px-4 py-12">
        <nav>
          <h6 className="footer-title text-base font-semibold mb-4">Services</h6>
          <a className="link link-hover text-base-content/70 hover:text-primary transition-colors">Vehicle Rental</a>
          <a className="link link-hover text-base-content/70 hover:text-primary transition-colors">Trip Planning</a>
          <a className="link link-hover text-base-content/70 hover:text-primary transition-colors">24/7 Support</a>
          <a className="link link-hover text-base-content/70 hover:text-primary transition-colors">Insurance</a>
        </nav>
        <nav>
          <h6 className="footer-title text-base font-semibold mb-4">Company</h6>
          <a className="link link-hover text-base-content/70 hover:text-primary transition-colors">About us</a>
          <a className="link link-hover text-base-content/70 hover:text-primary transition-colors">Contact</a>
          <a className="link link-hover text-base-content/70 hover:text-primary transition-colors">Jobs</a>
          <a className="link link-hover text-base-content/70 hover:text-primary transition-colors">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title text-base font-semibold mb-4">Legal</h6>
          <a className="link link-hover text-base-content/70 hover:text-primary transition-colors">Terms of use</a>
          <a className="link link-hover text-base-content/70 hover:text-primary transition-colors">Privacy policy</a>
          <a className="link link-hover text-base-content/70 hover:text-primary transition-colors">Cookie policy</a>
        </nav>
        <nav>
          <h6 className="footer-title text-base font-semibold mb-4">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-base-content/70 hover:text-primary transition-colors"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-base-content/70 hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-base-content/70 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-base-content/70 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </nav>
        <aside className="max-w-xs">
          <h6 className="footer-title text-base font-semibold mb-4">TravelGuru</h6>
          <p className="text-base-content/70 leading-relaxed">
            Your trusted partner for vehicle rentals and trip management.
            <br />
            Making travel easy and affordable.
          </p>
          <p className="mt-6 text-sm text-base-content/60">
            &copy; {new Date().getFullYear()} TravelGuru. All rights reserved.
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;

