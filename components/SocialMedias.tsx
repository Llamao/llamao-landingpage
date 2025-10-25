import Image from "next/image";

const SocialMedias = () => {
  return (
    <div className="flex gap-5 mt-5">
      <a
        href="https://x.com/llamao_"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-110 active:scale-95"
      >
        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <Image
            src="/twitter.svg"
            alt="Twitter"
            width={80}
            height={80}
            className="w-full h-full"
          />
        </div>
      </a>
      <a
        href="discord.com/invite/llamao"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-110 active:scale-95"
      >
        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <Image
            src="/discord.svg"
            alt="Discord"
            width={80}
            height={80}
            className="w-full h-full"
          />
        </div>
      </a>
      <a
        href="https://t.me/llamaomeme"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-110 active:scale-95"
      >
        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <Image
            src="/telegram.svg"
            alt="Telegram"
            width={80}
            height={80}
            className="w-full h-full"
          />
        </div>
      </a>
    </div>
  );
};

export default SocialMedias;
