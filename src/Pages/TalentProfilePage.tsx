import { Button, Text, Card, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile, getAllProfiles } from "../Services/ProfileService";
import Profile from "../TalentProfile/Profile";

const TalentProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [allTalents, setAllTalents] = useState([]);

  useEffect(() => {
    loadProfile();
    loadAllTalents();
  }, [id]);

  const loadProfile = async () => {
    try {
      const res = await getProfile(Number(id));
      setProfile({
        name: res.name || res.fullName || "Unknown",
        role: res.jobTitle || "",
        company: res.company || "",
        location: res.location || "",
        image: res.image || "avatar1.jpg",
        about: res.about || "",
        topSkills: res.skills || [],
        experience: res.experiences || [],
        certifications: res.certifications || [],
      });
    } catch (err) {
      console.log("Profile not found");
    }
  };

  const loadAllTalents = async () => {
    try {
      const res = await getAllProfiles();
      setAllTalents(res || []);
    } catch {}
  };

  if (!profile)
    return (
      <div className="min-h-[100vh] flex justify-center items-center text-white">
        Loading profile...
      </div>
    );

  const recommended = allTalents
    .filter((t: any) => t.id !== Number(id))
    .slice(0, 2);

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 text-white pt-20 px-10 pb-20 font-['Poppins']">

      {/* BACK BUTTON */}
      <Link to="/find-talent">
        <Button
          variant="subtle"
          color="yellow"
          leftSection={<IconArrowLeft />}
          mb="lg"
        >
          Back
        </Button>
      </Link>

      <div className="grid lg:grid-cols-3 gap-10">
        
        {/* LEFT SIDE → PROFILE */}
        <div className="lg:col-span-2">
          <Profile profile={profile} />
        </div>

        {/* RIGHT SIDE → RECOMMENDED */}
        <div className="flex flex-col gap-6">
          <Text fw={600} size="lg">Recommended Talents</Text>

          {recommended.map((t: any, i: number) => (
            <Card
              key={i}
              shadow="sm"
              radius="md"
              className="bg-mine-shaft-900 text-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={t.image || "/avatar/avatar1.jpg"}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <Text fw={600}>{t.name || t.fullName}</Text>
                  <Text size="sm" c="dimmed">
                    {t.jobTitle || "Role"} • {t.company || "Company"}
                  </Text>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap mt-3">
                {(t.skills || []).slice(0, 3).map((skill: string, j: number) => (
                  <span
                    key={j}
                    className="bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded-md text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <Link to={`/talent/${t.id}`} className="w-full">
                  <Button variant="outline" color="yellow" size="xs" fullWidth>
                    View Profile
                  </Button>
                </Link>
                <Button color="yellow" size="xs" fullWidth>
                  Message
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TalentProfilePage;
