import { Avatar } from "@mantine/core";
import { WorkSteps } from "../Data/Data";

const Work = () => {
  return (
    <div className="mt-20 pb-10">
      {/* Heading */}
      <div className="text-4xl text-center font-semibold mb-3 text-mine-shaft-100">
        How it <span className="text-yellow-500">Works</span>
      </div>
      <div className="text-lg mx-auto text-mine-shaft-300 text-center w-1/2">
        Effortlessly navigate through the process and land your dream job.
      </div>

      <div className="flex px-16 justify-between items-center mt-10">
        {/* Left Side Image with Overlay */}
        <div className="relative ml-12">
          <img className="w-[40rem] max-w-full" src="/working/girl.png" alt="girl" />

          {/* Overlay Card */}
          <div className="absolute top-[15%] right-4 flex flex-col items-center gap-2 
                          border border-bright-sun-500 rounded-xl py-3 px-2 backdrop-blur-md bg-mine-shaft-900/70">
            <Avatar className="!h-16 !w-16" src="/working/avatar2.jpg" alt="its me" />
            <div className="text-sm font-semibold text-mine-shaft-200 text-center">
              Complete your profile
            </div>
            <div className="text-xs font-semibold text-mine-shaft-200 text-center">
              70% Completed
            </div>
          </div>
        </div>

        {/* Right Side Steps */}
        <div className="flex flex-col gap-2">
          {WorkSteps.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="p-9">
                <img className="h-24 w-24" src={item.icon} alt={item.name} />
              </div>
              <div>
                <div className="text-mine-shaft-200 text-xl font-semibold">{item.name}</div>
                <div className="text-mine-shaft-300">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;

