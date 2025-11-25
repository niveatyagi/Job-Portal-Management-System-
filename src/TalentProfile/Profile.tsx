import React from "react";
import { Text, Divider, Button } from "@mantine/core";

// ✅ Type definitions
type Experience = {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  logo: string;
};

type Certification = {
  name: string;
  issuer: string;
  issued: string;
  id: string;
  logo: string;
};

type ProfileType = {
  name?: string;
  role?: string;
  company?: string;
  location?: string;
  image?: string;
  about?: string;
  topSkills?: string[];
  experience?: Experience[];
  certifications?: Certification[];
};

// ✅ Helper function to safely load images
const safeImagePath = (path: string): string => {
  try {
    return new URL(path, import.meta.url).href;
  } catch {
    return path; // fallback if not a local import
  }
};

const Profile: React.FC<{ profile: ProfileType }> = ({ profile }) => {
  if (!profile) {
    return (
      <div className="text-center p-8 text-mine-shaft-300">
        <Text>No profile data to display</Text>
      </div>
    );
  }

  // ✅ Fixed fallback Experience
  const fixedExperience: Experience[] = [
    {
      title: "Software Engineer III",
      company: "Google",
      location: "New York, United States",
      startDate: "Apr 2022",
      endDate: "Present",
      description:
        "As a Software Engineer at Google, I design, develop, and maintain scalable software systems that enhance user experience and operational efficiency.",
      logo: "/Icons/Google.png",
    },
    {
      title: "Software Engineer",
      company: "Microsoft",
      location: "Seattle, United States",
      startDate: "Jun 2018",
      endDate: "Mar 2022",
      description:
        "At Microsoft, I contributed to the development and optimization of cloud-based solutions with a focus on performance and scalability.",
      logo: "/Icons/Microsoft.png",
    },
  ];

  // ✅ Fixed fallback Certifications
  const fixedCertifications: Certification[] = [
    {
      name: "Google Professional Cloud Architect",
      issuer: "Google",
      issued: "Aug 2023",
      id: "CB72982GG",
      logo: "/Icons/Google.png",
    },
    {
      name: "Microsoft Certified: Azure Solutions Architect Expert",
      issuer: "Microsoft",
      issued: "May 2022",
      id: "MS12345AZ",
      logo: "/Icons/Microsoft.png",
    },
  ];

  return (
    <div className="bg-mine-shaft-950 text-white font-['Poppins'] rounded-lg overflow-hidden shadow-lg max-w-5xl w-full mx-auto">
      {/* ✅ Banner */}
      <div className="relative w-full h-52">
        <img
          src="/profile/banner.jpg"
          alt="Profile banner"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/profile/banner.jpg";
          }}
        />

        {/* ✅ Avatar */}
        <div className="absolute left-10 -bottom-16">
          <img
            src={`/avatar/${profile.image || "avatar1.jpg"}`}
            alt={profile.name || "avatar"}
            className="w-32 h-32 rounded-full border-4 border-mine-shaft-950 object-cover shadow-lg"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/avatar/avatar1.jpg";
            }}
          />
        </div>
      </div>

      {/* ✅ Profile Info */}
      <div className="pt-20 px-10 pb-10">
        <div className="flex justify-between items-start flex-wrap">
          <div>
            <Text size="xl" fw={700}>
              {profile.name ?? "Unnamed"}
            </Text>
            <Text size="sm" c="dimmed">
              {profile.role ?? ""}{" "}
              {profile.company ? `• ${profile.company}` : ""}
            </Text>
            {profile.location && (
              <Text size="sm" mt={4}>
                {profile.location}
              </Text>
            )}
          </div>

          <div className="mt-2">
            <Button variant="filled" color="yellow" size="sm">
              Message
            </Button>
          </div>
        </div>

        <Divider my="lg" />

        {/* ✅ About */}
        <Text fw={600} size="lg" mb={6}>
          About
        </Text>
        <Text mb="lg" c="dimmed" className="text-justify">
          {profile.about ?? "No about text provided."}
        </Text>

        {/* ✅ Skills */}
        <Text fw={600} size="lg" mb={6}>
          Skills
        </Text>
        <div className="flex gap-2 flex-wrap mb-8">
          {profile.topSkills && profile.topSkills.length > 0 ? (
            profile.topSkills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-md text-xs"
              >
                {skill}
              </span>
            ))
          ) : (
            <Text c="dimmed">No skills listed</Text>
          )}
        </div>

        <Divider my="lg" />

        {/* ✅ Experience Section */}
        <div className="mb-10">
          <Text fw={600} size="lg" mb={6}>
            Experience
          </Text>
          <div className="flex flex-col gap-6">
            {(profile.experience && profile.experience.length > 0
              ? profile.experience
              : fixedExperience
            ).map((exp, i) => (
              <div
                key={i}
                className="bg-mine-shaft-900 p-5 rounded-xl flex flex-col gap-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={safeImagePath(exp.logo)}
                    alt={exp.company}
                    className="w-8 h-8 rounded-md"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/Icons/default.png";
                    }}
                  />
                  <div>
                    <p className="font-semibold">{exp.title}</p>
                    <p className="text-sm text-gray-400">
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  {exp.startDate} – {exp.endDate}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Certifications Section */}
        <div>
          <Text fw={600} size="lg" mb={6}>
            Certifications
          </Text>
          <div className="flex flex-col gap-6">
            {(profile.certifications && profile.certifications.length > 0
              ? profile.certifications
              : fixedCertifications
            ).map((cert, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-mine-shaft-900 p-4 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={safeImagePath(cert.logo)}
                    alt={cert.name}
                    className="w-8 h-8 rounded"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/Icons/default.png";
                    }}
                  />
                  <div>
                    <p className="font-semibold">{cert.name}</p>
                    <p className="text-sm text-gray-400">{cert.issuer}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-400">
                  <p>Issued {cert.issued}</p>
                  <p>ID: {cert.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
