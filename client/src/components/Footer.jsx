import { FaXTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <style>{`
        footer .footer-title,
        footer h6.footer-title,
        h6.footer-title {
          font-weight: 700 !important;
        }
      `}</style>
      <footer className="footer backdrop-blur-md bg-base-100/90 border-t border-base-300/50 shadow-sm">
        <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <nav>
            <h6 className="footer-title text-base font-bold mb-4 text-primary">Services</h6>
            <a className="link link-hover text-base-content/80 hover:text-primary hover:bg-base-200 transition-colors">Vehicle Rental</a>
            <a className="link link-hover text-base-content/80 hover:text-primary hover:bg-base-200 transition-colors">Trip Planning</a>
            <a className="link link-hover text-base-content/80 hover:text-primary hover:bg-base-200 transition-colors">24/7 Support</a>
            <a className="link link-hover text-base-content/80 hover:text-primary hover:bg-base-200 transition-colors">Insurance</a>
          </nav>
          <nav>
            <h6 className="footer-title text-base font-bold mb-4 text-primary">Company</h6>
            <a className="link link-hover text-base-content/80 hover:text-primary hover:bg-base-200 transition-colors">About us</a>
            <a className="link link-hover text-base-content/80 hover:text-primary hover:bg-base-200 transition-colors">Contact</a>
            <a className="link link-hover text-base-content/80 hover:text-primary hover:bg-base-200 transition-colors">Jobs</a>
            <a className="link link-hover text-base-content/80 hover:text-primary hover:bg-base-200 transition-colors">Press kit</a>
          </nav>
          <nav>
            <h6 className="footer-title text-base font-bold mb-4 text-primary">Legal</h6>
            <a className="link link-hover text-base-content/80 hover:text-primary hover:bg-base-200 transition-colors">Terms of use</a>
            <a className="link link-hover text-base-content/80 hover:text-primary hover:bg-base-200 transition-colors">Privacy policy</a>
            <a className="link link-hover text-base-content/80 hover:text-primary hover:bg-base-200 transition-colors">Cookie policy</a>
          </nav>
          <nav>
            <h6 className="footer-title text-base font-bold mb-4 text-primary">Social</h6>
            <div className="grid grid-flow-col gap-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover text-base-content/80 hover:text-primary hover:bg-base-200 transition-colors"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover text-base-content/80 hover:text-primary hover:bg-base-200 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover text-base-content/80 hover:text-primary hover:bg-base-200 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover text-base-content/80 hover:text-primary hover:bg-base-200 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </nav>
          <aside className="max-w-xs">
            <h6 className="footer-title text-base font-bold mb-4 text-primary">TravelGuru</h6>
            <p className="text-base-content/80 leading-relaxed">
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
    </>
  );
};

export default Footer;

