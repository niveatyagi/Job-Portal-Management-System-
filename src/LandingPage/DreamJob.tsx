import React from "react";
import { TextInput, Avatar } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row justify-start px-6 md:px-16 pt-20 md:pt-24 relative">
      {/* Left Section */}
      <div className="flex flex-col w-full md:w-[48%] gap-4">
        {/* Heading */}
        <h1 className="text-6xl md:text-8xl font-extrabold leading-tight text-mine-shaft-100 [&>span]:text-bright-sun-400 mb-12">
          Find your <span>dream</span> <span>job</span> with us
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-xl text-mine-shaft-200 leading-relaxed">
          Good life begins with a good company. Start exploring thousands of jobs in one place.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mt-24">
          <TextInput
            className="bg-mine-shaft-900 rounded-lg p-4 w-full text-lg"
            variant="unstyled"
            label="Job Title"
            placeholder="Software Engineer"
            classNames={{
              input: "text-mine-shaft-200 placeholder-mine-shaft-400",
              label: "text-mine-shaft-100",
            }}
          />
          <TextInput
            className="bg-mine-shaft-900 rounded-lg p-4 w-full text-lg"
            variant="unstyled"
            label="Job Type"
            placeholder="Fulltime"
            classNames={{
              input: "text-mine-shaft-200 placeholder-mine-shaft-400",
              label: "text-mine-shaft-100",
            }}
          />
          <div className="bg-bright-sun-400 flex items-center justify-center h-16 w-16 md:h-full md:w-20 text-mine-shaft-100 rounded-lg p-3 hover:bg-bright-sun-500 cursor-pointer">
            <IconSearch className="w-8 h-8 md:w-[85%] md:h-[85%]" />
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="flex w-full md:w-[48%] items-start justify-center relative -mt-8 md:-mt-28">
        <div className="w-[28rem] md:w-[36rem] relative">
          <img
            src="/working/boy.png"
            alt="boy"
            className="w-full max-w-[600px] mx-auto"
          />

          {/* Floating Cards */}
          <div className="absolute -right-16 top-[50%] border-bright-sun-400 border rounded-xl p-4 backdrop-blur-md shadow-lg">
            <div className="text-center text-mine-shaft-200 text-base md:text-lg">
              10k+ got job
            </div>
            <Avatar.Group>
              <Avatar src="/avatar/avatar1.jpg" />
              <Avatar src="/avatar/avatar2.jpg" />
              <Avatar src="/avatar/avatar3.jpg" />
              <Avatar>+9</Avatar>
            </Avatar.Group>
          </div>

          <div className="absolute -left-10 top-[28%] border-bright-sun-400 border rounded-xl p-4 backdrop-blur-md gap-4 flex flex-col shadow-lg">
            <div className="flex gap-3 items-center">
              <div className="w-16 h-14 p-2 bg-mine-shaft-900 rounded-lg">
                <img src="/working/google.png" alt="" />
              </div>
              <div className="text-base md:text-lg text-mine-shaft-100">
                <div>Software Engineer</div>
                <div className="text-mine-shaft-200 text-sm md:text-base">
                  New York
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-around text-sm md:text-base text-mine-shaft-200">
              <span>1 day ago</span>
              <span>120 Applicants</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DreamJob;
