import { Alert, AlertDescription } from "./ui/8bit/alert";

const About = () => {
  return (
    <Alert borderColor="#6043AF" className="lg:w-4xl xl:w-5xl">
      <AlertDescription className="pixelify-sans-500 text-lg md:text-xl lg:text-2xl lg:text-justify text-black">
        <p className="">
        Llamao is a mindfulness-first IP brand building a wellness ecosystem focused on calm, clarity, and balance. The core is Llamaoism, a mindful philosophy that helps people stay mentally stable, true to themselves, and fully present
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default About;
