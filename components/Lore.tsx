import Image from "next/image";
import { Alert } from "./ui/8bit/alert";
import { Button } from "./ui/8bit/button";

const Lore = () => {
  return (
    <div className="flex items-center gap-20 justify-center">
      <div className="hover:scale-110 transition-transform duration-300 cursor-pointer hidden lg:block">
        <Image src={"/arrow.svg"} alt="leftarrow" width={90} height={135} />
      </div>
      <Alert
        borderColor="#1E3445"
        className="max-w-[430px] max-h-[80%] flex flex-col justify-between p-0 gap-0"
      >
        <Image
          src="/loreimg.png"
          alt="loreimg"
          width={432.46}
          height={432.46}
        />
        <div className="bg-[#E8DEFF] w-full px-3 py-4">
          <p className="silkscreen-regular text-2xl text-[#2245C5]">
            Llamaoism PT1
          </p>
          <p className="pixelify-sans-400 text-[#1E3445] text-lg">
            Blue steak pi crown queen sandwich taxi flash diamond red darkest
            grey purple lint hoodie strings sunset shirt wool weave
          </p>
          <div className="flex justify-between pt-4">
            <p className="silkscreen-regular text-xl text-[#2245C5]">0.025 Ξ</p>
            <Button
              size={"sm"}
              className="text-[9px] bg-[#DD1A21] hover:bg-[#FF2A31] hover:scale-105 hover:brightness-110 transition-all duration-200"
            >
              <p className="tracking-tighter">VIEW ON MAGIC EDEN</p>
            </Button>
          </div>
        </div>
      </Alert>
      <div className="hover:scale-110 transition-transform duration-300 cursor-pointer hidden lg:block">
        <Image
          src={"/arrow.svg"}
          alt="rightarrow"
          width={90}
          height={135}
          className="scale-x-[-1] "
        />
      </div>
    </div>
  );
};

export default Lore;
