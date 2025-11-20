import type { Metadata, MetadataRoute } from "next";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://llamao.xyz"
).replace(/\/$/, "");
const DEFAULT_OG_IMAGE = "/llamao_crop32x32.png";
const DEFAULT_OG_ALT = "LLAMAO pixel avatar";
const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

type RouteSeoConfig = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogAlt?: string;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
  lastModified?: string;
  noindex?: boolean;
};

const seoRoutes: Record<string, RouteSeoConfig> = {
  home: {
    path: "/",
    title: "LLAMAO | Mindfulness-First Wellness IP",
    description:
      "Discover Llamaoism, the Web3 mindfulness philosophy that keeps builders and investors grounded with calm, clarity, and balance across every market cycle.",
    keywords: [
      "llamao",
      "llamaoism",
      "web3 mindfulness",
      "mental wellness",
      "calm clarity balance",
      "mindfulness brand",
    ],
    ogImage: "/llamao_avatar1.png",
    ogAlt: "LLAMAO mindfulness IP hero",
    priority: 1,
    changeFrequency: "weekly",
  },
  about: {
    path: "/about",
    title: "About Llamaoism | Calm, Clarity, Balance",
    description:
      "Meet Llamao, a mindfulness-first IP brand helping the Web3 community build emotional resilience, intentional routines, and supportive wellness experiences.",
    keywords: [
      "about llamao",
      "llamao philosophy",
      "mindfulness web3 brand",
      "wellness ecosystem",
    ],
    ogImage: "/aboutus.gif",
    ogAlt: "About Llamaoism graphic",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  chillmao: {
    path: "/chillmao",
    title: "Chillmao Traits | Mindful Characters For Builders",
    description:
      "Explore Chillmao traits and rewards that encourage slower, calmer, and more intentional building sessions for creators living on-chain and IRL.",
    keywords: [
      "chillmao",
      "llamao traits",
      "mindful nft rewards",
      "builder wellness",
    ],
    ogImage: "/llamao-gen.png",
    ogAlt: "Chillmao traits grid",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  lore: {
    path: "/lore",
    title: "Llamao Lore | The Origins Of Llamaoism",
    description:
      "Read the evolving lore behind Llamaoism, packed with mindful adventures that encourage presence, emotional stability, and playful creativity.",
    keywords: [
      "llamao lore",
      "llamaoism story",
      "mindfulness tale",
      "web3 character story",
    ],
    ogImage: "/logo.png",
    ogAlt: "Llamao lore illustration",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  rewardPools: {
    path: "/reward-pools",
    title: "Reward Pools | Tokens & NFTs For Mindful Participation",
    description:
      "Track the current Llamao reward pools including blue-chip NFTs and community token drops that celebrate consistent mindfulness practice.",
    keywords: [
      "llamao reward pools",
      "mindfulness rewards",
      "nft prizes",
      "community incentives",
    ],
    ogImage: "/rewards-thumbnail.png",
    ogAlt: "Reward Pools thumbnail preview",
    changeFrequency: "daily",
    priority: 0.9,
  },
  test: {
    path: "/test",
    title: "Internal Canvas Playground",
    description:
      "Fabric.js playground used for internal layout testing and rapid prototyping. This route is hidden from search engines.",
    keywords: ["fabric playground", "llamao test"],
    ogImage: DEFAULT_OG_IMAGE,
    ogAlt: "LLAMAO internal tool",
    noindex: true,
  },
} satisfies Record<string, RouteSeoConfig>;

export type SeoRouteKey = keyof typeof seoRoutes;

const metadataBase = new URL(SITE_URL);

const defaultOpenGraph = {
  type: "website" as const,
  siteName: "LLAMAO",
  locale: "en_US",
};

export const baseMetadata: Metadata = {
  metadataBase,
  title: {
    default: "LLAMAO: Llamaoism Philosophy | Web3 Mental Stability & Wellness",
    template: "%s | Llamaoism: Calm, Clarity, Balance",
  },
  description:
    "LLAMAO is a mindfulness-first IP brand building a wellness ecosystem. Explore Llamaoism, the mindful philosophy that helps Web3 builders stay mentally stable, present, and confident.",
  keywords: seoRoutes.home.keywords,
  openGraph: {
    ...defaultOpenGraph,
    title: "LLAMAO: Llamaoism – The Web3 Mental Stability Solution",
    description:
      "Escape the emotional pressure of Web3. Llamaoism guides purposeful action and inner strength for long-term confidence and authenticity.",
    url: SITE_URL,
    images: [buildOgImage(DEFAULT_OG_IMAGE, DEFAULT_OG_ALT)],
  },
  twitter: {
    card: "summary_large_image",
    title: "LLAMAO: Calm, Clarity, Balance",
    description:
      "Mindfulness-first IP guiding Web3 builders with practical rituals and emotional stability.",
    creator: "@llamao_",
    site: "@llamao_",
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: DEFAULT_OG_IMAGE,
    shortcut: DEFAULT_OG_IMAGE,
    apple: DEFAULT_OG_IMAGE,
  },
};

function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function buildOgImage(imagePath?: string, alt?: string) {
  const src = absoluteUrl(imagePath || DEFAULT_OG_IMAGE);
  return {
    url: src,
    width: OG_IMAGE_SIZE.width,
    height: OG_IMAGE_SIZE.height,
    alt: alt || "LLAMAO preview image",
  };
}

export function createRouteMetadata(key: SeoRouteKey): Metadata {
  const config = seoRoutes[key];
  const url = absoluteUrl(config.path);
  const image = buildOgImage(config.ogImage, config.ogAlt);

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...defaultOpenGraph,
      url,
      title: config.title,
      description: config.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [image.url],
    },
    robots: config.noindex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}

export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  return Object.values(seoRoutes)
    .filter((route) => !route.noindex)
    .map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: route.lastModified || now,
      changeFrequency: route.changeFrequency || "monthly",
      priority: route.priority ?? 0.6,
    }));
}

export function getSeoSiteUrl() {
  return SITE_URL;
}

export function getIndexablePaths() {
  return Object.values(seoRoutes)
    .filter((route) => !route.noindex)
    .map((route) => route.path);
}
