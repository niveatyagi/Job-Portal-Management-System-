import React from "react";
import { timeAgo } from "../Services/Utilities";

const PostedJobCard = ({
  jobTitle,
  location,
  postTime,
  isSelected,
  onSelect,
}: any) => {
  return (
    <div
      onClick={onSelect}
      className={`p-3 rounded-md cursor-pointer border transition-all
      ${
        isSelected
          ? "bg-yellow-500/10 border-yellow-400 text-white"
          : "bg-transparent border-gray-700 hover:border-yellow-400"
      }`}
    >
      <div className="text-sm font-semibold">{jobTitle}</div>
      <div className="text-xs text-gray-300">{location}</div>
      {postTime && (
        <div className="text-xs text-gray-400">
          Posted {timeAgo(postTime)}
        </div>
      )}
    </div>
  );
};

export default PostedJobCard;
