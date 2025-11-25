import {
  Button,
  FileInput,
  LoadingOverlay,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "../Services/Utilities";
import { applyJob } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/Notification";
import { useSelector } from "react-redux";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
    const user = useSelector((state:any) => state.user);
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      resume: null as File | null,
      coverLetter: "",
    },
    validate: {
      name: isNotEmpty("Name cannot be empty"),
      email: isNotEmpty("Email cannot be empty"),
      phone: isNotEmpty("Phone cannot be empty"),
      website: isNotEmpty("Website cannot be empty"),
      resume: isNotEmpty("Resume cannot be empty"),
    },
  });

  const inputStyles = {
    input:
      "!bg-mine-shaft-950 !text-white placeholder-gray-400 border-gray-700 h-14 text-lg rounded-md",
    label: "text-white text-lg font-medium",
  };

  const handlePreview = () => {
    form.validate();
    if (!form.isValid()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPreview(true);
  };

const handleSubmit = async () => {
  setSubmit(true);

  const resumeFile = form.values.resume;
  if (!resumeFile) {
    setSubmit(false);
    return errorNotification("Error", "Please attach a resume");
  }

  try {
    const resumeBase64 = (await getBase64(resumeFile)) as string;

    const applicant = {
      ...form.values,
      resume: resumeBase64.split(",")[1],
      applicantId: user.id,   // ✅ FIXED
    };

    await applyJob(id, applicant);

    successNotification("Success", "Application Submitted Successfully");
    navigate("/job-history");

  } catch (err: any) {
    const message =
      err?.response?.data?.errorMessage ||
      err?.response?.data?.message ||
      "Something went wrong";

    errorNotification("Error", message);  // ✅ FIXED
  } finally {
    setSubmit(false);
  }
};


  return (
    <div className="w-2/3 m-auto text-white">
      <LoadingOverlay
        className="[&>span]:fixed [&>span]:top-1/2"
        visible={submit}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />

      <div className="text-3xl font-bold mb-8">Submit Your Application</div>

      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <TextInput
            {...form.getInputProps("name")}
            readOnly={preview}
            classNames={inputStyles}
            label="Full Name"
            withAsterisk
            placeholder="Enter name"
          />

          <TextInput
            {...form.getInputProps("email")}
            readOnly={preview}
            classNames={inputStyles}
            label="Email"
            withAsterisk
            placeholder="Enter email"
          />
        </div>

        <div className="flex gap-10 [&>*]:w-1/2">
          <NumberInput
            {...form.getInputProps("phone")}
            readOnly={preview}
            classNames={inputStyles}
            clampBehavior="strict"
            min={0}
            max={9999999999}
            label="Phone Number"
            withAsterisk
            placeholder="Enter phone"
            hideControls
          />
        </div>
      </div>

      <TextInput
        {...form.getInputProps("website")}
        readOnly={preview}
        classNames={inputStyles}
        label="Personal Website"
        withAsterisk
        placeholder="Enter URL"
      />

      <FileInput
        {...form.getInputProps("resume")}
        accept="application/pdf"
        readOnly={preview}
        classNames={inputStyles}
        withAsterisk
        leftSection={<IconPaperclip stroke={1.5} />}
        label="Resume/CV"
        placeholder="Attach Resume/CV"
        leftSectionPointerEvents="none"
      />

      <Textarea
        {...form.getInputProps("coverLetter")}
        readOnly={preview}
        classNames={{
          input:
            "!bg-mine-shaft-950 !text-white placeholder-gray-400 border-gray-700 min-h-[150px] text-lg rounded-md",
          label: "text-white text-lg font-medium",
        }}
        placeholder="Type something about yourself"
        label="Cover Letter"
      />

      {preview ? (
        <div className="flex gap-10 mt-6">
          <Button fullWidth onClick={() => setPreview(false)} variant="outline">
            Edit
          </Button>
          <Button fullWidth onClick={handleSubmit} color="brightSun.4" variant="light">
            Submit
          </Button>
        </div>
      ) : (
        <Button fullWidth onClick={handlePreview} color="brightSun.4"  
        variant="filled"
                 className="!bg-yellow-400 text-black font-semibold shadow-md hover:!bg-yellow-500 hover:shadow-yellow-500/50 transition-all duration-200 mt-6">
          Preview
        </Button>
      )
        
      }
    </div>
  );
};

export default ApplicationForm;
