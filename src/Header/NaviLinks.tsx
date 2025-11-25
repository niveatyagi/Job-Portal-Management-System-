import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NaviLinks = () => {
  const location = useLocation();
  const user = useSelector((state: any) => state.user);

  const links = [
    { name: "Find Job", url: "/find-jobs" },
    { name: "Find Talent", url: "/find-talent" },
    { name: "Post Jobs", url: "/post-jobs" },
    { name: "Posted Jobs", url: "/posted-job" },

    // 👇 Show only if logged in
    ...(user ? [{ name: "Job History", url: "/job-history" }] : []),

    // 👇 Show only if NOT logged in
    ...(!user ? [{ name: "SignUp", url: "/signup" }] : []),
  ];

  return (
    <div className="flex gap-5 h-full text-mine-shaft-300 items-center flex-wrap">
      {links.map((link, index) => (
        <div
          key={index}
          className={`h-full flex items-center border-t-[3px] transition-colors duration-200 ${
            location.pathname === link.url
              ? "text-bright-sun-400 border-bright-sun-400"
              : "border-transparent hover:border-bright-sun-400 hover:text-bright-sun-400"
          }`}
        >
          <Link to={link.url}>{link.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default NaviLinks;
