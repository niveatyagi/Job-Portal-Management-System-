
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IconSpeakerphone, IconSourceCode, IconPaletteFilled,IconReportMoney,IconAddressBook, IconBrandAws,IconPaintFilled,IconAppWindow,IconAlignBoxLeftStretch,
  IconDeviceIpadSearch,IconDeviceDesktopCog,IconReportAnalytics

 } from "@tabler/icons-react";

const categories = [
  {
    name: "Digital Marketing",
    description: "Promote brands with campaigns & ads",
    jobs: "1k+ new job posted",
    icon: IconSpeakerphone,
  },
  {
    name: "Software Development",
    description: "Build apps, websites & scalable solutions",
    jobs: "900+ new job posted",
    icon: IconSourceCode,
  },
  {
    name: "Finance",
    description: "Manage financial records and transactions",
    jobs: "700+ new job posted",
    icon: IconReportMoney,
  },
  {
    name: "Human Resource",
    description: "Recruit and manage employees",
    jobs: "600+ new job posted",
    icon: IconAddressBook,
  },

  
 
  {
    name: "Graphic Design",
    description: "Design creative visuals & branding",
      jobs: "600+ new job posted",
    icon: IconPaletteFilled,
  },
  {
    name: "Data Science",
    description: "Analyze data & build AI solutions",
      jobs: "600+ new job posted",
    icon: IconBrandAws,
  },
  {
    name: "Art & Design",
    description: "Create visual content for branding and media",
      jobs: "600+ new job posted",
    icon: IconPaintFilled,
  },
  {
    name: "UI/UX Design",
    description: "Design user interfaces and enhance user experience",
      jobs: "600+ new job posted",
    icon: IconAppWindow,
  },
  {
    name: "Content Writing",
    description: "Write and edit content for various platforms",
      jobs: "600+ new job posted",
    icon: IconAlignBoxLeftStretch,
  },
  {
    name: "Data Entry",
    description: "Input data into systems accurately and efficiently",
      jobs: "600+ new job posted",
    icon: IconDeviceIpadSearch,
  },
  {
    name: "Customer Support",
    description: "Assist customers and resolve their issues",
      jobs: "600+ new job posted",
    icon: IconDeviceDesktopCog,
  },
  {
    name: "Sales",
    description: "Sell products or services to customers",
      jobs: "600+ new job posted",
    icon: IconReportAnalytics,
  },
 
 
];

const JobCategory = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, 
    slidesToScroll: 1,
    arrows: true, 
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="mt-20 pb-10">
      {/* Heading */}
      <div className="text-4xl text-center font-semibold mb-3 text-mine-shaft-100">
        Browse <span className="text-yellow-500">1000+</span> Categories
      </div>
      <div className="text-lg mx-auto text-mine-shaft-300 text-center w-1/2">
        Explore diverse job opportunities tailored to your skills. Start your career journey today!
      </div>

      {/* Slider */}
      <div className="mt-10 px-10">
  <Slider {...settings}>
    {categories.map((category, index) => {
      const Icon = category.icon;
      return (
        <div key={index} className="px-3">   {/* 👈 GAP yahan */}
          <div
            className="bg-mine-shaft-800 text-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition w-64 mx-auto"
          >
            {/* Icon */}
            <div className="p-3 bg-bright-sun-300 rounded-full w-14 h-14 mx-auto flex items-center justify-center mb-4">
              <Icon className="h-8 w-8 text-mine-shaft-900" />
            </div>

            {/* Title */}
            <div className="font-semibold text-lg mb-1">{category.name}</div>
            {/* Description */}
            <div className="text-sm text-mine-shaft-400 mb-3">{category.description}</div>
            {/* Jobs posted */}
            <div className="text-yellow-400 font-medium">{category.jobs}</div>
          </div>
        </div>
      );
    })}
  </Slider>
</div>

    </div>
  );
};

export default JobCategory;
