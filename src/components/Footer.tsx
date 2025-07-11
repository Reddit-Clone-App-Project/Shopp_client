import { useState } from "react";
import Logo from "../assets/Logo-white.svg";
import Youtube from "../assets/youtube.svg";
import Linkedin from "../assets/linkedin.svg";
import Github from "../assets/github.svg";
import Stripe from "../assets/stripe.svg";
import Fast from "../assets/Fast.svg";
import AmericanPost from "../assets/American-Post.svg";
import EuropeanExpress from "../assets/Europe-Express.svg";
import AirTransportation from "../assets/Air-transportation.svg";
import ArrowUp from "../assets/caret-up.svg";
import ArrowDown from "../assets/caret-down.svg";

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: "customer-service",
      title: "Customer service",
      content: (
        <ul className="space-y-2">
          {[
            "Shopp Help Center",
            "Shopp Mail",
            "Purchase/Order Guide",
            "Sales Guide",
            "Order",
            "Returns/Refunds",
            "Contact Shopp",
            "Warranty Policy",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "shopp",
      title: "Shopp",
      content: (
        <ul className="space-y-2">
          {[
            "About",
            "Recruitment",
            "MIT License",
            "Privacy Policy",
            "Seller Channel",
            "Flash Sale",
            "Affiliate Marketing",
            "Media Contact",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "payment",
      title: "Payment",
      content: <img src={Stripe} alt="Payment Methods" className="mt-2" />,
    },
    {
      id: "transport",
      title: "Transportation unit",
      content: (
        <div className="mt-2">
          <div className="flex justify-between mb-3">
            <img src={Fast} alt="Fast Delivery" />
            <img src={AirTransportation} alt="Air Transport" />
          </div>
          <div className="flex justify-between">
            <img src={AmericanPost} alt="American Post" />
            <img src={EuropeanExpress} alt="European Express" />
          </div>
        </div>
      ),
    },
    {
      id: "developers",
      title: "Developers",
      content: (
        <div className="mt-2">
          <h3 className="font-bold mb-1">Nghiêm Gia Bảo</h3>
          <div className="flex mb-3">
            <img src={Github} className="w-5 h-5 mr-4" alt="GitHub" />
            <img src={Linkedin} className="w-5 h-5" alt="LinkedIn" />
          </div>
          <h3 className="font-bold mb-1">Matteo Conci</h3>
          <div className="flex mb-3">
            <img src={Github} className="w-5 h-5 mr-4" alt="GitHub" />
            <img src={Linkedin} className="w-5 h-5" alt="LinkedIn" />
          </div>
          <p className="text-xs">@This is a fictional website...</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <hr className="mt-18 border-gray-300" />
      <div className="w-full py-8 bg-white">
        {/* Desktop View (hidden on mobile) */}
        <div className="hidden md:flex justify-around">
          {/* Keep the layout desktop */}
          <div className="w-[139px]">
            <img src={Logo} className="w-[139px] h-[56px] mb-6" alt="Logo" />
            <div className="flex justify-between">
              <img src={Github} className="w-6 h-6" alt="GitHub" />
              <img src={Youtube} className="w-6 h-6" alt="YouTube" />
              <img src={Linkedin} className="w-6 h-6" alt="LinkedIn" />
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.id} className="max-w-[180px]">
              <h2 className="mb-4 font-bold">{section.title}</h2>
              {section.content}
            </div>
          ))}
        </div>

        {/* Mobile Accordion View */}
        <div className="md:hidden px-4">
          {/* Logo and Social Icons */}
          <div className="flex flex-col items-center mb-6">
            <img src={Logo} className="w-[120px] mb-4" alt="Logo" />
            <div className="flex space-x-4">
              <img src={Github} className="w-6 h-6" alt="GitHub" />
              <img src={Youtube} className="w-6 h-6" alt="YouTube" />
              <img src={Linkedin} className="w-6 h-6" alt="LinkedIn" />
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-1">
            {sections.map((section) => (
              <div key={section.id} className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex justify-between items-center w-full py-3"
                >
                  <span className="font-bold text-left">{section.title}</span>
                  <img
                    src={openSection === section.id ? ArrowUp : ArrowDown}
                    alt={openSection === section.id ? "Collapse" : "Expand"}
                    className="w-4 h-4 ml-2"
                  />
                </button>
                {openSection === section.id && (
                  <div className="pb-3 pl-2">{section.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
