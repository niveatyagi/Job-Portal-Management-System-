import { TextInput, Button } from "@mantine/core";

const Subscribe = () => {
  return (
    <div className="mt-20 flex items-center bg-mine-shaft-900 mx-20 py-3 rounded-xl justify-around">
      <div className="text-4xl w-2/5  text-center font-semibold mb-3 text-mine-shaft-100">
        Never want to miss any <span className="text-yellow-500">Job News?</span>
      </div>
      <div className="flex gap-4 rounded-xl bg-mine-shaft-700 px-3 py-2 items-center">
        <TextInput
        className="[&_input ]:bg-mine-shaft-100 font-semibold "
          variant="unstyled"

          placeholder="your@email.com"
          size="xl"
        />
        <Button size="lg" color="yellow" variant="filled">Subscribe</Button>
      </div>
    </div>
  );
};

export default Subscribe;
export {};
