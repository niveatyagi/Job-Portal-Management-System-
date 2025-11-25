import React, { useEffect, useState } from "react";
import { IconEdit, IconCheck, IconX, IconPlus } from "@tabler/icons-react";



import { getItem } from "../Services/LocalStorageService";
import ExperienceCard, { Experience } from "./ExperienceCard";
import CertificationCard, { Certification } from "./CertificationCard";

interface Props {
  profile: any;
  onSectionSave: (profileFrontend: any) => Promise<void>;
  onDeleteItem: (type: string, id: number) => Promise<void>;
}

const Profile: React.FC<Props> = ({ profile, onSectionSave, onDeleteItem }) => {

  // SINGLE VALID STATE
  const [local, setLocal] = useState<any>(profile);

  useEffect(() => setLocal(profile), [profile]);

  // edit states
  const [editingBasic, setEditingBasic] = useState(false);
  const [editingAbout, setEditingAbout] = useState(false);
  const [editingSkills, setEditingSkills] = useState(false);

  // experience editing
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<number | null>(null);

// ✔️ Right — always at top
const [editingCertIndex, setEditingCertIndex] = useState<number | null>(null);

const [tempCert, setTempCert] = useState<Certification>({
  name: "",
  issuer: "",
  issueDate: "",
  certificateId: "",
});


  const saveSection = async (section: string) => {
  await onSectionSave(local);

  if (section === "basic") setEditingBasic(false);
  if (section === "about") setEditingAbout(false);
  if (section === "skills") setEditingSkills(false);
  if (section === "experience") setEditingExperienceIndex(null);
  if (section === "certifications") setEditingCertIndex(null);
};

  const cancelSection = (section: string) => {
  setLocal(profile);

  if (section === "basic") setEditingBasic(false);
  if (section === "about") setEditingAbout(false);
  if (section === "skills") setEditingSkills(false);
  if (section === "experience") setEditingExperienceIndex(null);
  if (section === "certifications") setEditingCertIndex(null);
};

  if (!local) return null;

  // certifications states


  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['Poppins'] py-10">
      <div className="w-full max-w-4xl mx-auto">

        {/* BASIC INFO */}
        <div className="bg-mine-shaft-900 text-white p-6 rounded-2xl shadow-lg border border-mine-shaft-800">
          <img
            src="/avatar/avatar5.png"
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#0b0b0b]"
          />

          <div>
            <h2 className="text-2xl font-semibold">
              {getItem("user")?.name ?? local.name ?? "Your Name"}
            </h2>

            {!editingBasic ? (
              <div className="text-gray-300">
                <span>{local.jobTitle || ""}</span>
                {local.jobTitle && local.company ? " • " : ""}
                <span>{local.company || ""}</span>
                {local.location ? <div className="text-gray-400">{local.location}</div> : null}
              </div>
            ) : (
              <div className="flex gap-3 mt-2">
                <input
                  className="bg-transparent p-2 rounded border border-bright-sun-400"
                  placeholder="Job Title"
                  value={local.jobTitle || ""}
                  onChange={(e) => setLocal({ ...local, jobTitle: e.target.value })}
                />
                <input
                  className="bg-transparent p-2 rounded border border-bright-sun-400"
                  placeholder="Company"
                  value={local.company || ""}
                  onChange={(e) => setLocal({ ...local, company: e.target.value })}
                />
                <input
                  className="bg-transparent p-2 rounded border border-bright-sun-400"
                  placeholder="Location"
                  value={local.location || ""}
                  onChange={(e) => setLocal({ ...local, location: e.target.value })}
                />
              </div>
            )}
          </div>

          <div className="ml-auto">
            {!editingBasic ? (
              <button onClick={() => setEditingBasic(true)} className="text-gray-400 hover:text-gray-200">
                <IconEdit size={18} />
              </button>
            ) : (
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => saveSection("basic")}
                  className="bg-[#ffd866] text-black px-3 py-1 rounded flex items-center gap-2"
                >
                  <IconCheck size={16} /> Save
                </button>
                <button
                  onClick={() => cancelSection("basic")}
                  className="bg-gray-700 px-3 py-1 rounded"
                >
                  <IconX size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        <hr className="border-gray-700 my-4" />

        {/* ABOUT */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">About</h3>

            {!editingAbout ? (
              <button onClick={() => setEditingAbout(true)} className="text-gray-400 hover:text-gray-200">
                <IconEdit size={16} />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => saveSection("about")}
                  className="bg-[#ffd866] text-black px-3 py-1 rounded flex items-center gap-2"
                >
                  <IconCheck size={16} /> Save
                </button>
                <button
                  onClick={() => cancelSection("about")}
                  className="bg-gray-700 px-3 py-1 rounded"
                >
                  <IconX size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="mt-2">
            {editingAbout ? (
              <textarea
                className="w-full bg-mine-shaft-800 text-white px-3 py-2 rounded-md border border-mine-shaft-700 focus:border-[#ffd866]"
                rows={4}
                value={local.about || ""}
                onChange={(e) => setLocal({ ...local, about: e.target.value })}
              />
            ) : (
              <p className="text-gray-300">
                {local.about || <span className="text-gray-600">Write something about yourself...</span>}
              </p>
            )}
          </div>
        </div>

        <hr className="border-gray-700 my-4" />

        {/* SKILLS */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Skills</h3>

            {!editingSkills ? (
              <button onClick={() => setEditingSkills(true)} className="text-gray-400 hover:text-gray-200">
                <IconEdit size={16} />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => saveSection("skills")}
                  className="bg-[#ffd866] text-black px-3 py-1 rounded flex items-center gap-2"
                >
                  <IconCheck size={16} /> Save
                </button>
                <button onClick={() => cancelSection("skills")} className="bg-gray-700 px-3 py-1 rounded">
                  <IconX size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="mt-2">
            {!editingSkills ? (
              <div className="flex gap-2 flex-wrap">
                {(local.skills || []).map((s: string, i: number) => (
                  <span key={i} className="px-3 py-1 rounded-full text-sm bg-[#2b2b2b] text-[#ffd866] border border-[#444]">
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <div className="bg-mine-shaft-800 border border-mine-shaft-700 rounded-md p-3 max-h-56 overflow-y-auto">
                {[
                  "React","Node.js","JavaScript","TypeScript","C++","DSA","MongoDB",
                  "Express.js","HTML","CSS","Tailwind","Redux","MySQL","Git",
                ].map((skill) => {
                  const selected = local.skills?.includes(skill);

                  return (
                    <label key={skill} className="flex items-center gap-2 text-white py-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => {
                          let updated = [...(local.skills || [])];

                          if (selected) updated = updated.filter((s) => s !== skill);
                          else if (updated.length < 5) updated.push(skill);

                          setLocal({ ...local, skills: updated });
                        }}
                      />
                      {skill}
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <hr className="border-gray-700 my-4" />

        {/* EXPERIENCE */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Experience</h3>

            <button
              onClick={() => {
                const newExp = {
                  title: "",
                  company: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  working: false,
                  description: "",
                };

                setLocal({
                  ...local,
                  experiences: [...(local.experiences || []), newExp],
                });

                setEditingExperienceIndex((local.experiences?.length || 0));
              }}
              className="text-gray-400 hover:text-gray-200"
            >
              <IconEdit size={16} />
            </button>
          </div>

          {!local.experiences || local.experiences.length === 0 ? (
            <p className="text-gray-500 mt-2">No experience added</p>
          ) : (
            <div className="mt-3 space-y-3">
              {local.experiences.map((exp: Experience, idx: number) => (
                <div key={idx} className="relative">
                  <ExperienceCard
                    data={exp}
                    editable={editingExperienceIndex === idx}
                    onChange={(updated) => {
                      const copy = [...local.experiences];
                      copy[idx] = updated;
                      setLocal({ ...local, experiences: copy });
                    }}
                    onDelete={() => {
                      const copy = [...local.experiences];
                      copy.splice(idx, 1);
                      setLocal({ ...local, experiences: copy });
                      setEditingExperienceIndex(null);
                    }}
                  />

                  <div className="absolute right-3 top-3">
                    {editingExperienceIndex === idx ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveSection("experience")}
                          className="bg-[#ffd866] text-black px-2 py-1 rounded"
                        >
                          <IconCheck size={14} />
                        </button>
                        <button
                          onClick={() => {
                            setEditingExperienceIndex(null);
                            setLocal(profile);
                          }}
                          className="bg-gray-700 px-2 py-1 rounded"
                        >
                          <IconX size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingExperienceIndex(idx)}
                        className="text-gray-400 hover:text-gray-200"
                      >
                        <IconEdit size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              const newExp = {
                title: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                working: false,
                description: "",
              };

              setLocal({
                ...local,
                experiences: [...local.experiences, newExp],
              });

              setEditingExperienceIndex(local.experiences.length);
            }}
            className="text-gray-400 hover:text-gray-200 flex items-center gap-1 mt-2"
          >
            <IconPlus size={16} /> Add experience
          </button>
        </div>

        <hr className="border-gray-700 my-4" />

{/* CERTIFICATIONS */}
<div className="mb-6">
  <div className="flex items-center justify-between">
    <h3 className="text-lg font-semibold text-white">Certifications</h3>
  </div>

  {local.certifications && local.certifications.length > 0 ? (
    <div className="mt-3 space-y-3">
      {local.certifications.map((cert: Certification, idx: number) => (
        <div key={idx} className="relative">
          <CertificationCard
            data={editingCertIndex === idx ? tempCert : cert}
            editable={editingCertIndex === idx}
            onChange={(updated: Certification) => setTempCert(updated)}
            onDelete={async () => {
              const updated = [...local.certifications];
              updated.splice(idx, 1);

              const updatedProfile = {
                ...local,
                certifications: updated,
              };

              setLocal(updatedProfile);
              await onDeleteItem("certifications", idx);
              await onSectionSave(updatedProfile);
            }}
          />

          {/* Edit / Save / Cancel Buttons */}
          <div className="absolute right-3 top-3">
            {editingCertIndex === idx ? (
              <div className="flex gap-2">
                {/* SAVE */}
                <button
                  onClick={async () => {
                    const updatedList = [...local.certifications];
                    updatedList[idx] = tempCert;

                    const updatedProfile = {
                      ...local,
                      certifications: updatedList,
                    };

                    setLocal(updatedProfile);
                    setEditingCertIndex(null);

                    await onSectionSave(updatedProfile);
                  }}
                  className="bg-[#ffd866] text-black px-2 py-1 rounded"
                >
                  <IconCheck size={14} />
                </button>

                {/* CANCEL */}
                <button
                  onClick={() => setEditingCertIndex(null)}
                  className="bg-gray-700 px-2 py-1 rounded"
                >
                  <IconX size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setEditingCertIndex(idx);
                  setTempCert(cert);
                }}
                className="text-gray-400 hover:text-gray-200"
              >
                <IconEdit size={14} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 mt-2">No certifications added</p>
  )}

  {/* ADD NEW CERTIFICATION */}
  <button
    onClick={() => {
      const newCert: Certification = {
        name: "",
        issuer: "",
        issueDate: "",
        certificateId: "",
      };

      const updated = [...(local.certifications || []), newCert];

      setLocal({ ...local, certifications: updated });
      setEditingCertIndex(updated.length - 1);
      setTempCert(newCert);
    }}
    className="text-gray-400 hover:text-gray-200 flex items-center gap-1 mt-3"
  >
    <IconPlus size={16} /> Add certification
  </button>
</div>

<hr className="border-gray-700 my-4" />



      </div>
    </div>
  );
};

export default Profile;
