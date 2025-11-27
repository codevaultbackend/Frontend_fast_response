import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import asstes from "../../../public/assets/asstes";

export default function Footer({ role }) {
  if (role === "technician" || role === "admin") return null;

  return (
    <footer className="bg-white border-t border-[#E5E7EB] pt-16 pb-10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={asstes.MainLogo} alt="FastResponse" className="h-[70px]" />
          </div>
          <p className="text-[#6B7280] text-sm mb-6">
            FastResponse connects you with trusted and verified technicians—
            ensuring quick, reliable, and high-quality home service assistance at your doorstep.
          </p>

          <div className="flex gap-4 text-[#5C6BF0]">
            <Facebook className="w-4 h-4 cursor-pointer hover:text-[#3b4fe2] transition" />
            <Twitter className="w-4 h-4 cursor-pointer hover:text-[#3b4fe2] transition" />
            <Instagram className="w-4 h-4 cursor-pointer hover:text-[#3b4fe2] transition" />
            <Linkedin className="w-4 h-4 cursor-pointer hover:text-[#3b4fe2] transition" />
            <Youtube className="w-4 h-4 cursor-pointer hover:text-[#3b4fe2] transition" />
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold text-[#1A1A1A] mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-[#6B7280]">
            <li className="hover:text-[#5C6BF0] cursor-pointer">About Us</li>
            <li className="hover:text-[#5C6BF0] cursor-pointer">Our Services</li>
            <li className="hover:text-[#5C6BF0] cursor-pointer">Become a Technician</li>
            <li className="hover:text-[#5C6BF0] cursor-pointer">FAQs</li>
            <li className="hover:text-[#5C6BF0] cursor-pointer">Blog</li>
          </ul>
        </div>

        {/* Popular Services */}
        <div>
          <h3 className="font-semibold text-[#1A1A1A] mb-4">Popular Services</h3>
          <ul className="space-y-2 text-sm text-[#6B7280]">
            <li className="hover:text-[#5C6BF0] cursor-pointer">Plumbing</li>
            <li className="hover:text-[#5C6BF0] cursor-pointer">Electrical Repair</li>
            <li className="hover:text-[#5C6BF0] cursor-pointer">AC Installation & Repair</li>
            <li className="hover:text-[#5C6BF0] cursor-pointer">Painting Services</li>
            <li className="hover:text-[#5C6BF0] cursor-pointer">CCTV Installation</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-[#1A1A1A] mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-[#6B7280]">
            <li className="hover:text-[#5C6BF0] cursor-pointer">How to Book</li>
            <li className="hover:text-[#5C6BF0] cursor-pointer">Help Center</li>
            <li className="hover:text-[#5C6BF0] cursor-pointer">Service Tracking</li>
            <li className="hover:text-[#5C6BF0] cursor-pointer">Customer Support</li>
            <li className="hover:text-[#5C6BF0] cursor-pointer">Cancellation Policy</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="font-semibold text-[#1A1A1A] mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm text-[#6B7280]">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#5C6BF0]" /> support@fastresponse.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#5C6BF0]" /> +91 95801 58154
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-8 h-8 text-[#5C6BF0] mt-0.5" />
              794, FastResponse Office, Sector 49, Gurugram, Haryana, India
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-12 pt-6 border-t border-[#E5E7EB] flex flex-col md:flex-row justify-between items-center text-xs text-[#6B7280]">
        <p>© {new Date().getFullYear()} FastResponse — All rights reserved.</p>
        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-[#5C6BF0] transition">
            Terms & Conditions
          </a>
          <a href="#" className="hover:text-[#5C6BF0] transition">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
