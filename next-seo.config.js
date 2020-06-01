const title = "Jonathan Segal – Student, Traveleler, Developer";
const description = "My Website 🚀.";

const SEO = {
  title,
  description,
  canonical: "https://jonathansegal.io",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://jonathansegal.io",
    title,
    description,
    images: [
      {
        url: "https://jonathansegal.io/static/images/og.jpg",
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    handle: "@jonathannsegal",
    site: "@jonathannsegal",
    cardType: "summary_large_image",
  },
};

export default SEO;
