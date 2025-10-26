import { Alert, AlertDescription } from "./ui/8bit/alert";

const About = () => {
  return (
    <Alert borderColor="#6043AF" className="2xl:w-[1024px]">
      <AlertDescription className="pixelify-sans-500 text-2xl text-justify text-black">
        <p className="">
          Llamao-ism is the first and finest ideology born on Monad — rooted in
          one simple principle:
        </p>
        <ul className="list-disc 2xl:ml-12 my-8">
          <li>
            <p>Create real value, stay chill, no matter the market.</p>
          </li>
          <li>
            <p>
              {`Whether it's bull or bear, llamao-ists don't chase hype. They
                  build. They meme. They make markets better — quietly but
                  consistently.`}
            </p>
          </li>
        </ul>
        <p className="pixelify-sans-500 text-2xl">
          {`Llamao-ism is not a cult. It’s a vibe, productive
              collective.Welcome to the future of sustainable clout, only on
              Monad.`}
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default About;
