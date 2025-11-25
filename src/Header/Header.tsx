import React from "react";
import { IconDeviceIpadBolt, IconBell, IconSettings } from "@tabler/icons-react";
import { Avatar, Button, Indicator } from "@mantine/core";
import NavLinks from "./NaviLinks";
import ProfileMenu from "./ProfileMenu";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state: any) => state.user);
  const location = useLocation();

  return (
    <div className="w-full bg-mine-shaft-950 px-8 text-white h-20 flex items-center justify-between fixed top-0 left-0 z-[9999]">
      {/* 🔹 Logo */}
      <Link
        to="/"
        className="flex gap-2 items-center text-bright-sun-400 hover:text-bright-sun-300 transition-all cursor-pointer"
      >
        <IconDeviceIpadBolt className="h-10 w-10" stroke={2.5} />
        <div className="text-2xl font-semibold">JobBlitz</div>
      </Link>

      {/* 🔹 Center Links */}
      <div className="flex-1 flex justify-center overflow-visible flex-wrap">
        <NavLinks />
      </div>

      {/* 🔹 Right Section */}
      <div className="flex gap-4 items-center">
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator color="bright-sun.3" offset={6} size={10} processing>
            <IconBell stroke={1.5} />
          </Indicator>
        </div>

        {/* 🔹 Login or Profile */}
        {user ? (
          <ProfileMenu />
        ) : (
          <Link to="/login">
            <Button
              variant="filled"
              color="yellow"
              radius="xl"
              className="font-medium"
            >
              Login
            </Button>
          </Link>
        )}

        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator color="bright-sun.4" size={12} processing>
            <IconSettings stroke={1.5} />
          </Indicator>
        </div>
      </div>
    </div>
  );
};

export default Header;
