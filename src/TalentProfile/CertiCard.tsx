const CertiCard = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-mine-shaft-800 rounded-md">
          <img className="h-7" src={"/Icons/Google.png"} alt="" />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">Cloud Certification</div>
           <div className="text-sm text-mine-shaft-300">
              Google 
            </div>
        </div>
      </div>
      <div className="text-sm text-mine-shaft-300">
        <div className="text-sm text-mine-shaft-300">
              Jun 2023</div>
        <div className="text-sm text-mine-shaft-300">
              ID: JUDJH5766G</div>
      </div>
    </div>
  );
};

export default CertiCard;
