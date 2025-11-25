const ExpCard = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img className="h-7 w-7" src={"/Icons/Google.png"} alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold">Software Engineer</div>
            <div className="text-sm text-mine-shaft-300">
              Google &bull; New York, United States
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm text-mine-shaft-300">Jan 2022 - Present</div>
      <div className="text-sm text-mine-shaft-300 text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At facere accusantium amet reiciendis odio quos fugiat atque! Ipsam modi incidunt qui quisquam, temporibus consectetur et atque hic? Repudiandae, quasi excepturi!
      </div>
    </div>
  );
};

export default ExpCard;

    