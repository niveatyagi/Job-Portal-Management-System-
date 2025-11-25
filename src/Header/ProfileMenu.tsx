import { Menu, Avatar, Switch, rem } from "@mantine/core";
import {
  IconUserCircle,
  IconMessageCircle,
  IconFileText,
  IconLogout2,
  IconMoon,
  IconSun,
  IconMoonStars,
  IconCheck,
} from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../Slices/UserSlices";
import { notifications } from "@mantine/notifications";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const [checked, setChecked] = useState(false);

  const handleLogout = () => {
    try {
      // ✅ 1. Clear user data
      dispatch(removeUser());

      // ✅ 2. Clear manually in case localStorage remains
      localStorage.removeItem("user");

      // ✅ 3. Show feedback
      notifications.show({
        title: "Logged out successfully 👋",
        message: "You have been logged out.",
        color: "yellow",
        icon: <IconCheck />,
      });

      // ✅ 4. Redirect after small delay (to ensure Menu closes first)
      setTimeout(() => {
        navigate("/login");
      }, 300);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Menu
      shadow="md"
      width={220}
      transitionProps={{ transition: "pop", duration: 150 }}
      withinPortal={false}
    >
      {/* Avatar Button */}
      <Menu.Target>
        <div className="flex items-center gap-2 cursor-pointer bg-mine-shaft-900 px-3 py-1.5 rounded-full hover:ring-2 hover:ring-bright-sun-400 transition-all">
          <div className="text-white text-sm font-medium">{user?.name || "User"}</div>
          <Avatar src="/avatar/avatar4.jpg" alt="User" radius="xl" size="md" />
        </div>
      </Menu.Target>

      {/* Dropdown */}
      <Menu.Dropdown className="!bg-mine-shaft-900 !rounded-xl !border !border-mine-shaft-800 !shadow-lg backdrop-blur-sm">
        <Menu.Item
          component={Link}
          to="/profile"
          leftSection={<IconUserCircle style={{ width: rem(14), height: rem(14) }} />}
          className="!text-white hover:!bg-mine-shaft-800"
        >
          Profile
        </Menu.Item>

        <Menu.Item
          component={Link}
          to="/messages"
          leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}
          className="!text-white hover:!bg-mine-shaft-800"
        >
          Messages
        </Menu.Item>

        <Menu.Item
          component={Link}
          to="/resume"
          leftSection={<IconFileText style={{ width: rem(14), height: rem(14) }} />}
          className="!text-white hover:!bg-mine-shaft-800"
        >
          Resume
        </Menu.Item>

        <Menu.Item
          leftSection={<IconMoon style={{ width: rem(14), height: rem(14) }} />}
          rightSection={
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              size="md"
              color="yellow"
              onLabel={<IconSun size={16} stroke={2.5} color="yellow" />}
              offLabel={<IconMoonStars size={16} stroke={2.5} color="cyan" />}
            />
          }
          className="!text-white hover:!bg-mine-shaft-800"
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider className="!border-mine-shaft-700" />

        {/* Logout */}
        <Menu.Item
          onClick={handleLogout}
          leftSection={<IconLogout2 style={{ width: rem(14), height: rem(14) }} />}
          className="!text-red-400 hover:!bg-red-900"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
