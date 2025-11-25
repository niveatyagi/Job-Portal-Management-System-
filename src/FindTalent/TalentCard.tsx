import { Divider, Text, Button, Avatar, Modal } from "@mantine/core";
import { IconMapPin, IconHeart, IconCalendarMonth } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { DateInput } from "@mantine/dates";
import "@mantine/dates/styles.css";

interface TalentCardProps {
  id: number;
  name: string;
  role: string;
  company: string;
  topSkills: string[];
  about: string;
  expectedCtc: string;
  location: string;
  posted?: boolean; 
    invited?: boolean;
}

const TalentCard: React.FC<TalentCardProps> = ({
  id,
  name,
  role,
  company,
  topSkills,
  about,
  expectedCtc,
  location,
  posted = false,
  invited = false,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<Date | null>(null);

  const femaleNames = ["Alice Johnson", "Diana Prince", "Fiona Gallagher", "Helen Mirren"];
  const isFemale = femaleNames.includes(name);

  return (
    <div className="transition duration-300 ease-in-out w-[350px] flex flex-col gap-3 bg-mine-shaft-900 p-5 rounded-2xl border border-mine-shaft-800 hover:border-bright-sun-400/50 hover:shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <Avatar
            size="lg"
            src={isFemale ? "/avatar/avatar4.jpg" : "/avatar/avatar1.jpg"}
            radius="xl"
          />
          <div className="flex flex-col">
            <div className="font-semibold text-lg text-mine-shaft-100">{name}</div>
            <div className="text-sm text-mine-shaft-300">
              {role} • {company}
            </div>
          </div>
        </div>
        <IconHeart
          className="cursor-pointer text-mine-shaft-400 hover:text-bright-sun-400"
          stroke={1.5}
        />
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mt-2">
        {topSkills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-mine-shaft-800 text-bright-sun-400 rounded-md text-xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* About */}
      <Text className="!text-xs !text-mine-shaft-300 text-justify leading-relaxed" lineClamp={3}>
        {about}
      </Text>

      <Divider color="mineShaft.7" size="xs" />

      {/* Salary + Location */}
      <div className="flex justify-between items-center">
        <div className="font-semibold text-mine-shaft-200">₹{expectedCtc}</div>
        <div className="text-xs flex gap-1 items-center text-mine-shaft-400">
          <IconMapPin className="h-4 w-4" stroke={1.5} />
          {location}
        </div>
      </div>

      <Divider color="mineShaft.7" size="xs" />

      {/* Buttons */}
   {/* Action Buttons */}
<div className="flex gap-3">

  {/* ---------- INVITED → ACCEPT / REJECT ---------- */}
  {invited ? (
    <>
      <Button
        fullWidth
        className="font-medium bg-green-500 text-white hover:bg-green-600"
      >
        Accept
      </Button>

      <Button
        fullWidth
        className="font-medium bg-red-500 text-white hover:bg-red-600"
      >
        Reject
      </Button>
    </>
  ) : (
    <>
      {/* ---------- PROFILE BUTTON ---------- */}
      <Link to={`/talent/${id}`} className="w-1/2">
        <Button
          color="yellow"
          variant="outline"
          fullWidth
          className="font-medium border-bright-sun-400 text-bright-sun-400 hover:bg-bright-sun-400 hover:text-mine-shaft-900"
        >
          Profile
        </Button>
      </Link>

      {/* ---------- IF POSTED → SHOW SCHEDULE (WITH MODAL) ---------- */}
      <div className="w-1/2">
        {posted ? (
          <>
            <Button
              onClick={open}
              rightSection={<IconCalendarMonth className="w-5 h-5" />}
              variant="outline"
              fullWidth
              className="font-medium border-bright-sun-400 text-bright-sun-400 hover:bg-bright-sun-400 hover:text-mine-shaft-900"
            >
              Schedule
            </Button>

            {/* --- Schedule Modal (ONLY for posted === true) --- */}
            <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
              <Text className="mb-3 text-sm text-mine-shaft-200">
                Select a date for the interview:
              </Text>

              <DateInput
                value={value}
                onChange={(val) => setValue(val as Date | null)}
                label="Interview Date"
                placeholder="Pick a date"
                clearable
                className="mb-4"
              />

              <div className="mt-4 flex justify-end">
                <Button
                  onClick={close}
                  variant="outline"
                  className="font-medium border-bright-sun-400 text-bright-sun-400 hover:bg-bright-sun-400 hover:text-mine-shaft-900"
                >
                  Confirm
                </Button>
              </div>
            </Modal>
          </>
        ) : (
          <Link to="/messages" className="w-full no-underline">
            <Button
              color="yellow"
              variant="outline"
              fullWidth
              className="font-medium border-bright-sun-400 text-bright-sun-400 hover:bg-bright-sun-400 hover:text-mine-shaft-900"
            >
              Message
            </Button>
          </Link>
        )}
      </div>
    </>
  )}
</div>
    </div>
  );
};

export default TalentCard;
