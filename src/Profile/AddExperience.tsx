// src/Profile/AddExperience.tsx
import React, { useState } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Experience } from "./ExperienceCard";

interface Props {
  onSave: (exp: Experience) => void;
  onCancel: () => void;
}

const AddExperience: React.FC<Props> = ({ onSave, onCancel }) => {
  const [local, setLocal] = useState<Experience>({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    working: false,
    description: "",
  });

  return (
    <div className="bg-transparent text-white px-1 py-1">

      <input
        className="w-full mb-2 p-2 rounded bg-[#111] border border-[#333] text-white placeholder-gray-500"
        placeholder="Title"
        value={local.title}
        onChange={(e) => setLocal({ ...local, title: e.target.value })}
      />

      <input
        className="w-full mb-2 p-2 rounded bg-[#111] border border-[#333] text-white placeholder-gray-500"
        placeholder="Company"
        value={local.company}
        onChange={(e) => setLocal({ ...local, company: e.target.value })}
      />

      <input
        className="w-full mb-2 p-2 rounded bg-[#111] border border-[#333] text-white placeholder-gray-500"
        placeholder="Location"
        value={local.location}
        onChange={(e) => setLocal({ ...local, location: e.target.value })}
      />

      <div className="flex gap-2">
        <input
          className="flex-1 mb-2 p-2 rounded bg-[#111] border border-[#333] text-white placeholder-gray-500"
          placeholder="Start date (YYYY-MM-DD)"
          value={local.startDate || ""}
          onChange={(e) => setLocal({ ...local, startDate: e.target.value })}
        />

        <input
          className="w-40 mb-2 p-2 rounded bg-[#111] border border-[#333] text-white placeholder-gray-500"
          placeholder="End date"
          value={local.endDate || ""}
          onChange={(e) => setLocal({ ...local, endDate: e.target.value })}
        />
      </div>

      <textarea
        className="w-full mb-2 p-2 rounded bg-[#111] border border-[#333] text-white placeholder-gray-500"
        placeholder="Description"
        value={local.description}
        onChange={(e) => setLocal({ ...local, description: e.target.value })}
      />

      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => onSave(local)}
          className="px-3 py-1 rounded bg-[#ffd866] text-black flex items-center gap-2"
        >
          <IconCheck size={16} /> Save
        </button>

        <button
          onClick={onCancel}
          className="px-3 py-1 rounded bg-gray-700 text-white flex items-center gap-2"
        >
          <IconX size={16} /> Cancel
        </button>
      </div>
    </div>
  );
};

export default AddExperience;
