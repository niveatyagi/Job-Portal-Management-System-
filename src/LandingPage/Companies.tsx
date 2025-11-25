import Marquee from "react-fast-marquee";
import { companies } from "../Data/Data";

const Companies = () => {
  return (
    <div className="mt-5 pb-5">
      {/* Heading */}
      <div className="text-4xl text-center font-semibold mb-10 text-mine-shaft-100">
        Trusted by <span className="text-yellow-500">1000+</span> Companies
      </div>

      {/* Scrolling Logos */}
      <Marquee pauseOnHover={true} gradient={false} speed={50}>
        {companies.map((company, index) => (
          <div
            key={index}
            className="mx-8 px-2 py-1 rounded-xl cursor-pointer hover:bg-transparent"
          >
            <img
              className="h-14"
              src={`/companies/${company}.png`}
              alt={company}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Companies;
