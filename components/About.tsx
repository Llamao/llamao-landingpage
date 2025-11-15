import Image from "next/image";
import { Alert, AlertDescription } from "./ui/8bit/alert";

const About = () => {
  return (
    <Alert borderColor="#6043AF" className="lg:w-3xl xl:w-3xl 2xl:w-5xl">
      <AlertDescription className="pixelify-sans-500 text-lg md:text-xl lg:text-2xl lg:text-justify text-black">
        <div className="w-full lg:max-h-[300px] 2xl:max-h-[500px]">
          <Image
            src={"/aboutus.gif"}
            alt="des-img"
            width={989}
            height={411}
            className="w-full h-full object-center object-cover mb-4 rounded-md"
          />
        </div>
        <div>
          <p className="">
            Llamao is a mindfulness-first IP brand building a wellness ecosystem
            focused on calm, clarity, and balance. The core is Llamaoism, a
            mindful philosophy that helps people stay mentally stable, true to
            themselves, and fully present
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default About;
