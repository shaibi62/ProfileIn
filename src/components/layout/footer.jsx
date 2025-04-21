import {
    Layers,
    Users,
    BarChart,
    Edit3,
    Smartphone,
    BookOpen,
    Menu,
    X,
    Star,
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    Twitter,
  } from "lucide-react";
  import logo from '../../assets/logo-bg.png';

export default function Footer()
{
    return(
    <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Layers className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-xl font-bold">ProfileIn</span>
                <img src={logo} alt="" srcset="" />
              </div>
              <p className="text-gray-400">
                Empowering professionals to showcase their work with beautiful
                portfolios.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setCurrentPage("home")}
                    className="text-gray-400 hover:text-white"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage("about")}
                    className="text-gray-400 hover:text-white"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage("templates")}
                    className="text-gray-400 hover:text-white"
                  >
                    Templates
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage("contact")}
                    className="text-gray-400 hover:text-white"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <Mail className="h-5 w-5 mr-2" />
                  info@profilein.com
                </li>
                <li className="flex items-center text-gray-400">
                  <Phone className="h-5 w-5 mr-2" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center text-gray-400">
                  <MapPin className="h-5 w-5 mr-2" />
                  San Francisco, CA
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 ProfileIn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
}