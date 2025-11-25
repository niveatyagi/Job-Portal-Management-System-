import { Avatar } from "@mantine/core";
import { Rating } from "@mantine/core";
import { testimonials } from "../Data/Data";

const Testimonials = () => {
  return (
    <div className="mt-20 pb-10">
      {/* Heading */}
      <div className="text-4xl text-center font-semibold mb-3 text-mine-shaft-100">
        What <span className="text-yellow-500">User</span> says about us?
      </div>

      {/* Cards */}
      <div className="flex justify-evenly mt-10">
        {testimonials.map((data, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 w-[23%] border border-bright-sun-400 p-4 rounded-xl bg-mine-shaft-900/50"
          >
            {/* Top: Avatar + Name + Rating */}
            <div className="flex gap-3 items-center">
              <Avatar className="!h-16 !w-16" src={data.avatar} alt={data.name} />
              <div>
                <div className="text-lg text-mine-shaft-100 font-semibold">{data.name}</div>
                <Rating value={data.rating} fractions={2} readOnly />
              </div>
            </div>

        
            <div className="text-sm text-mine-shaft-300">{data.review}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
