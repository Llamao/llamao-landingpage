import Image from "next/image";

const Logo = () => {
  return (
    <div className="w-[93%] mt-3">
      <Image
        src="/logo.svg"
        alt="LLAMA Logo"
        width={882}
        height={369}
        className="w-full h-auto"
        priority
      />
    </div>
  );
};

export default Logo;
