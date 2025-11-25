import { useEffect, useState } from "react";

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string | null;
  certificateId: string;
}

interface Props {
  data: Certification;
  editable?: boolean;
  onChange?: (updated: Certification) => void;
  onDelete?: () => void;
}

const CertificationCard: React.FC<Props> = ({
  data,
  editable = false,
  onChange,
  onDelete,
}) => {
  const [local, setLocal] = useState<Certification>({ ...data });

  useEffect(() => setLocal({ ...data }), [data]);

  const patch = (patchObj: Partial<Certification>) => {
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
          {/* Name */}
          <input
            className="w-full p-2 rounded bg-transparent border border-gray-600 text-white placeholder-gray-400"
            placeholder="Certification Name"
            value={local.name}
            onChange={(e) => patch({ name: e.target.value })}
          />

          {/* Issuer */}
          <input
            className="w-full p-2 rounded bg-transparent border border-gray-600 text-white placeholder-gray-400"
            placeholder="Issuer"
            value={local.issuer}
            onChange={(e) => patch({ issuer: e.target.value })}
          />

          {/* Date */}
        <input
  type="date"
  className="w-full p-2 rounded bg-transparent border border-gray-600 text-white placeholder-gray-400"
  value={local.issueDate ? local.issueDate.substring(0, 10) : ""}
  onChange={(e) => {
    const value = e.target.value;

    // convert to backend-safe ISO or null
    const formatted = value ? value + "T00:00:00" : null;

    patch({ issueDate: formatted });
  }}
/>


          {/* Certificate ID */}
          <input
            className="w-full p-2 rounded bg-transparent border border-gray-600 text-white placeholder-gray-400"
            placeholder="Certificate ID"
            value={local.certificateId}
            onChange={(e) => patch({ certificateId: e.target.value })}
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
          <h4 className="text-lg font-semibold leading-tight">
            {data.name || "No certification name added"}
          </h4>

          {data.issuer && (
            <p className="text-gray-400 text-sm">Issuer: {data.issuer}</p>
          )}

          {data.issueDate ? (
            <p className="text-gray-400 text-sm">
              Issued on: {data.issueDate.substring(0, 10)}
            </p>
          ) : (
            <p className="text-gray-500 text-sm">No issue date added</p>
          )}

          {data.certificateId && (
            <p className="text-gray-500 text-xs mt-1">
              Certificate ID: {data.certificateId}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CertificationCard;
