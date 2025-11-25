import React from "react";
import {
  IconDeviceIpadBolt,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
} from "@tabler/icons-react";
import { footerLinks } from "../Data/Data";

const Footer = () => {
  return (
    <footer className="pb-10 px-10 pt-10 bg-mine-shaft-950 text-white">
      {/* Footer Layout with 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + description + social */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center text-bright-sun-400">
            <IconDeviceIpadBolt className="h-10 w-10" stroke={2.5} />
            <div className="text-2xl font-semibold">JobBlitz</div>
          </div>
          <p className="text-mine-shaft-300 text-sm">
            Job portal with user profiles, skill updates, certifications, work
            experience and admin job posting.
          </p>
          <div className="flex gap-3 mt-4 [&>div]:bg-mine-shaft-900 [&>div]:p-2 [&>div]:rounded-full [&>div]:cursor-pointer hover:[&>div]:bg-mine-shaft-700 text-bright-sun-400">
            <div>
              <IconBrandFacebook />
            </div>
            <div>
              <IconBrandInstagram />
            </div>
            <div>
              <IconBrandX />
            </div>
          </div>
        </div>

        {/* Footer Links */}
        {footerLinks.map((item, index) => (
          <div key={index}>
            <div className="text-lg font-semibold mb-4 text-bright-sun-400">
              {item.title}
            </div>
            {item.links.map((link, idx) => (
              <div
                key={idx}
                className="text-mine-shaft-300 text-sm hover:text-bright-sun-400 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out"
              >
                {link}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom copyright */}
      <div className="mt-0 text-center text-mine-shaft-400 text-xs">
        © 2025 JobBlitz. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
