import React from "react";
import { parseISO, format } from "date-fns";
import { useColorMode, Text, Flex, Stack } from "@chakra-ui/core";

import PostSeo from "../components/PostSeo";
import Container from "../components/Container";

const editUrl = (slug) =>
  `https://github.com/jonathannsegal/jonathansegal.io/edit/master/pages/blog/${slug}.mdx`;
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://jonathansegal.io/blog/${slug}`
  )}`;

export default (frontMatter) => {
  const slug = frontMatter.__resourcePath
    .replace("blog/", "")
    .replace(".mdx", "");

  return ({ children }) => {
    const { colorMode } = useColorMode();
    const textColor = {
      light: "gray.700",
      dark: "gray.400",
    };

    return (
      <Container>
        <PostSeo
          url={`https://jonathansegal.io/blog/${slug}`}
          {...frontMatter}
        />
        {/* <Flex h="120vh" bg="blue.500" /> */}
        <Stack
          whiteSpace="pre-line"
          as="article"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 4rem auto"
          maxWidth="700px"
          w="100%"
        >
          {children}
          {/* <Text
            mt="50px"
            lineHeight="24px"
            fontWeight="500"
            color="#666666"
            fontSize="sm"
            letterSpacing="wide">
            CONTEXT<br />
            {frontMatter.duration}
            <br /><br />
            DURATION<br />
            {frontMatter.duration}
            <br /><br />
            MY ROLE<br />
            {frontMatter.role}
            <br /><br />
            TEAM<br />
            {frontMatter.team}
            <br /><br />
          </Text> */}

          {/* <Text mt="50px">
            MORE PROJECTS WHILE YOU'RE HERE?
            <br />
            show 3 other projects
          </Text> */}
        </Stack>
      </Container>
    );
  };
};
