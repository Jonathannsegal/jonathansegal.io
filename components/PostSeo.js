import React from "react";
import { NextSeo, ArticleJsonLd } from "next-seo";

const PostSeo = ({ title, summary, publishedAt, url, image }) => {
  const date = new Date(publishedAt).toISOString();
  const featuredImage = {
    url: `https://jonathansegal.io${image}`,
    alt: title,
  };

  return (
    <>
      <NextSeo
        title={`${title} – Jonathan Segal`}
        description={summary}
        canonical={url}
        openGraph={{
          type: "article",
          article: {
            publishedTime: date,
          },
          url,
          title,
          description: summary,
          images: [featuredImage],
        }}
      />
      <ArticleJsonLd
        authorName="Jonathan Segal"
        dateModified={date}
        datePublished={date}
        description={summary}
        images={[featuredImage]}
        publisherLogo="/static/favicons/android-chrome-192x192.png"
        publisherName="Jonathan Segal"
        title={title}
        url={url}
      />
    </>
  );
};

export default PostSeo;
