// src/Profile/ExperienceCard.tsx
import React, { useEffect, useState } from "react";

export interface Experience {
  id?: number;
  title: string;
  company: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  working?: boolean;
  description: string;
}

interface Props {
  data: Experience;
  editable?: boolean;
  onChange?: (updated: Experience) => void;
  onDelete?: () => void;
}

const ExperienceCard: React.FC<Props> = ({
  data,
  editable = false,
  onChange,
  onDelete,
}) => {
  const [local, setLocal] = useState<Experience>({ ...data });

  useEffect(() => setLocal({ ...data }), [data]);

  const patch = (patchObj: Partial<Experience>) => {
    const updated = { ...local, ...patchObj };
    setLocal(updated);
    onChange?.(updated);
  };

  return (
    <div
      className={
        editable
          ? "bg-transparent text-white w-full px-1 py-2 space-y-3"
          : "border border-gray-700 rounded-xl p-4 text-white space-y-1 w-full"
      }
    >
      {editable ? (
        <>
          {/* Title */}
          <input
            className="w-full p-2 rounded bg-transparent border border-gray-600 text-white placeholder-gray-400"
            placeholder="Title"
            value={local.title}
            onChange={(e) => patch({ title: e.target.value })}
          />

          {/* Company */}
          <input
            className="w-full p-2 rounded bg-transparent border border-gray-600 text-white placeholder-gray-400"
            placeholder="Company"
            value={local.company}
            onChange={(e) => patch({ company: e.target.value })}
          />

          {/* Location */}
          <input
            className="w-full p-2 rounded bg-transparent border border-gray-600 text-white placeholder-gray-400"
            placeholder="Location"
            value={local.location || ""}
            onChange={(e) => patch({ location: e.target.value })}
          />

          {/* Dates */}
          <div className="flex gap-3">
            <input
              className="flex-1 p-2 rounded bg-transparent border border-gray-600 text-white placeholder-gray-400"
              placeholder="Start date (YYYY-MM-DD)"
              value={local.startDate || ""}
              onChange={(e) => patch({ startDate: e.target.value })}
            />

            <input
              className="w-40 p-2 rounded bg-transparent border border-gray-600 text-white placeholder-gray-400"
              placeholder="End date (YYYY-MM-DD)"
              value={local.endDate || ""}
              onChange={(e) => patch({ endDate: e.target.value })}
            />
          </div>

          {/* Description */}
          <textarea
            className="w-full p-2 rounded bg-transparent border border-gray-600 text-white placeholder-gray-400"
            placeholder="Description"
            value={local.description}
            onChange={(e) => patch({ description: e.target.value })}
            rows={3}
          />

          {/* Delete */}
          <div className="flex justify-end mt-2">
            <button
              onClick={onDelete}
              className="px-4 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white font-medium"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <h4 className="text-lg font-semibold leading-tight">{data.title}</h4>

          <p className="text-gray-400 text-sm leading-tight">
            {data.company}
            {data.location ? ` • ${data.location}` : ""}
          </p>

          <p className="text-gray-500 text-xs mt-1">
            {data.startDate || ""}
            {data.endDate ? ` — ${data.endDate}` : ""}
            {data.working ? " • Present" : ""}
          </p>

          <p className="text-gray-300 mt-2 text-sm leading-snug whitespace-pre-line">
            {data.description}
          </p>
        </>
      )}
    </div>
  );
};

export default ExperienceCard;
