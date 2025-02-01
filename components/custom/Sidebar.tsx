import { useState } from "react";
import { X, Menu } from "lucide-react"; // Use Menu and X icons for toggling

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="relative">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="p-4 fixed top-4 left-4 z-50 bg-primary text-white rounded-full md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-sidebar text-sidebar-foreground z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">Menu</h2>
        </div>
        <ul className="space-y-4 p-4">
          <li>
            <a href="/" className="block py-2 px-4 text-lg text-sidebar-primary hover:bg-primary hover:text-white rounded-md">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="block py-2 px-4 text-lg text-sidebar-primary hover:bg-primary hover:text-white rounded-md">
              About
            </a>
          </li>
          <li>
            <a href="/services" className="block py-2 px-4 text-lg text-sidebar-primary hover:bg-primary hover:text-white rounded-md">
              Services
            </a>
          </li>
          <li>
            <a href="/contact" className="block py-2 px-4 text-lg text-sidebar-primary hover:bg-primary hover:text-white rounded-md">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Overlay (optional, for closing sidebar when clicked outside) */}
      <div
        className={`fixed inset-0 bg-black opacity-50 z-30 transition-opacity ${isOpen ? "opacity-50" : "opacity-0 pointer-events-none"}`}
        onClick={toggleSidebar}
      />
    </div>
  );
};

export default Sidebar;
