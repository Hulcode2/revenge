import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import logo from "../assets/logo-CF3gF4eH.svg";
export default function Footer() {
  return (
    <footer className="mt-20 px-20 ">
      <div className="max-w-7xl mx-auto  grid gap-12 md:grid-cols-2 ">
        {/* Logo */}
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="" />
          </div>

          <p className="mt-2 text-muted-foreground leading-5">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </p>

          <div className="flex gap-4 mt-8">
            <Facebook className="cursor-pointer hover:text-blue-600" />
            <Instagram className="cursor-pointer hover:text-blue-600" />
            <Twitter className="cursor-pointer hover:text-blue-600" />
            <Mail className="cursor-pointer hover:text-blue-600" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-row justify-around">
          {" "}
          <div>
            <h3 className="font-semibold  mb-6">QUICK LINKS</h3>

            <ul className=" text-muted-foreground">
              <li className="hover:text-primary cursor-pointer">Home</li>

              <li className="hover:text-primary cursor-pointer">Browse Cars</li>

              <li className="hover:text-primary cursor-pointer">
                List Your Car
              </li>

              <li className="hover:text-primary cursor-pointer">About Us</li>
            </ul>
          </div>
          {/* Resources */}
          <div>
            <h3 className="font-semibold  mb-6">RESOURCES</h3>

            <ul className=" text-muted-foreground">
              <li>Help Center</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Insurance</li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="font-semibold  mb-6">CONTACT</h3>

            <ul className=" text-muted-foreground">
              <li>1234 Luxury Drive</li>
              <li>San Francisco, CA 94107</li>
              <li>+1 234 567890</li>
              <li>info@example.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="border-t mt-6 pt-2 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-muted-foreground">
          © 2026 Brand. All rights reserved.
        </p>

        <div className="flex gap-8 mb-2 text-muted-foreground">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
