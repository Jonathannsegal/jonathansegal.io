import React, { useState } from "react";
import { NextSeo } from "next-seo";
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Button,
} from "@chakra-ui/core";

import Container from "../components/Container";
import Post from "../components/Post";

// eslint-disable-next-line import/no-unresolved, import/extensions
import { frontMatter as Posts } from "./blog/**/*.mdx";

const url = "https://jonathansegal.io/blog";
const title = "Blog – Jonathan Segal";
const description = "Projects, Hackathons, and other cool stuff.";

const Blog = () => {
  const [searchValue, setSearchValue] = useState("");
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: "gray.700",
    dark: "gray.400",
  };

  const filteredPosts = Posts.sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
  ).filter((frontMatter) =>
    frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
        }}
      />
      <Container>
        <Stack
          as="main"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto"
          maxWidth="700px"
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
          >
            <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
              Articles
            </Heading>
            <Text color={secondaryTextColor[colorMode]}>
              {`Here is where you can find the things I write about.
                I've written ${Posts.length} posts so far. I write a
                lot about hackathons and just things that I find interesting.`}
            </Text>
            <InputGroup my={4} mr={4} w="100%">
              <Input
                aria-label="Search articles"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
              />
              <InputRightElement>
                <Icon name="search" color="gray.300" />
              </InputRightElement>
            </InputGroup>
          </Flex>
          )}
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
            mt={4}
          >
            {!filteredPosts.length && "No posts found."}
            {filteredPosts.map((frontMatter) => (
              <Post key={frontMatter.title} {...frontMatter} />
            ))}
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default Blog;
