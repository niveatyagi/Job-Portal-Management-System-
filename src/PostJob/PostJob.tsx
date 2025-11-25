import { Button, TagsInput, NumberInput, Textarea } from "@mantine/core";
import { fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";
import { useForm, isNotEmpty } from "@mantine/form";
import { errorNotification, successNotification } from "../Services/Notification";
import { postJob } from "../Services/JobService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostJob = () => {
const user  = useSelector((state: any) => state.user);

console.log("PROFILE FROM REDUX:", user);

  const navigate=useNavigate();
  const select = fields;

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,

    initialValues: {
      jobTitle: "",
      company: "",
      experience: "",
      jobType: "",       
      location: "",
      packageOffered: "",
      skillsRequired: [], // TagsInput uses array
      about: "",
      description:""  
    },

    validate: {
      jobTitle: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      experience: isNotEmpty("Experience is required"),
      jobType: isNotEmpty("Job Type is required"),
      location: isNotEmpty("Location is required"),
      packageOffered: isNotEmpty("Package is required"),
      skillsRequired: isNotEmpty("Skills are required"),
      about: isNotEmpty("About is required"),
      description: isNotEmpty("Description is required"),
    },
  });


const handlePost = () => {
  if (!user?.id) {
    errorNotification("Error", "User profile not loaded");
    return;
  }

  form.validate();
  if (!form.isValid()) return;

  postJob({
    ...form.getValues(),
    postedBy: user.id,
    jobStatus: "ACTIVE",
  })
    .then((res) => {
      successNotification("Success", "Job Posted Successfully");
navigate("/posted-job");


    })
    .catch((err) => {
      console.log(err);
      errorNotification("Error", "Failed to post job");
    });
};


const handleDraft = () => {
  postJob({ ...form.getValues(), postedBy: user.id, jobStatus: "DRAFT" })
    .then((res) => {
      successNotification("Success", "Job Drafted Successfully");
navigate("/posted-job");





    })
    .catch((err) => {
      console.log(err);
      errorNotification("Error", err.response.data.errorMessage);
    });
};



  return (
    <div className="w-4/5 mx-auto">
      <div className="text-2xl font-semibold mb-5">Post a Job</div>

      <div className="flex flex-col gap-5">
        
        <div className="flex gap-10 [&>_*]:w-1/2">
          <SelectInput form={form} name="jobTitle" {...select[0]} />
          <SelectInput form={form} name="company" {...select[1]} />
        </div>

        <div className="flex gap-10 [&>_*]:w-1/2">
          <SelectInput form={form} name="experience" {...select[2]} />
          <SelectInput form={form} name="jobType" {...select[3]} /> {/* ✅ FIXED */}
        </div>

        <div className="flex gap-10 [&>_*]:w-1/2">
          <SelectInput form={form} name="location" {...select[4]} />
          
        <NumberInput
  {...form.getInputProps("packageOffered")}
  label="Salary"
  withAsterisk
  classNames={{
    input:
      "!bg-mine-shaft-950 !text-white placeholder-gray-400 border-gray-700",
  }}
  min={0}
  max={1000}
  clampBehavior="none"
  allowDecimal={false}
  hideControls
  placeholder="Enter Salary"
/>
        </div>

      <TagsInput {...form.getInputProps("skillsRequired")} 

          withAsterisk
          classNames={{
            input:
              "!bg-mine-shaft-950 !text-white placeholder-gray-400 border-gray-700",
          }}
          label="Skills"
          placeholder="Enter skill"
          splitChars={[",", "|"]}
          clearable
          acceptValueOnBlur
        />

        <Textarea
          {...form.getInputProps("about")}
          withAsterisk
           classNames={{
            input:
              "!bg-mine-shaft-950 !text-white placeholder-gray-400 border-gray-700",
          }}
          className="my-3"
          label="About Job"
          autosize
          minRows={2}
          placeholder="Enter about job..."
        />

        <div className="[&_button[data-active='true']]:text-bright-sun-400 [&_button[data-active='true']]:bg-bright-sun-400/20">
          <div>
            <div className="text-sm font-medium">
              About Company<span className="text-red-500">*</span>
            </div>

            <TextEditor form={form}  name="about"/> {/* ✔ Correct */}
          </div>

          <div className="flex gap-4 mt-4">
            <Button color="yellow" onClick={handlePost} variant="light">
              Publish Job
            </Button>
            <Button color="yellow" onClick={handleDraft} variant="outline">
              Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
