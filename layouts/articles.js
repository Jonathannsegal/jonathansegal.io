import React from "react";
import { parseISO, format } from "date-fns";
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Avatar,
  Link,
  Box,
} from "@chakra-ui/core";

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
        <Stack
          as="article"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 4rem auto"
          maxWidth="700px"
          w="100%"
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
            w="100%"
          >
            <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
              {frontMatter.title}
            </Heading>
            <Flex
              justify="space-between"
              align={["initial", "center"]}
              direction={["column", "row"]}
              mt={2}
              w="100%"
              mb={4}
            >
              <Flex align="center">
                <Avatar
                  size="xs"
                  name="Jonathan Segal"
                  src="https://drive.google.com/uc?export=view&id=1Iy2em95KWERTiMnHYITSl3Har6eIzaId"
                  mr={2}
                />
                <Text fontSize="sm" color={textColor[colorMode]}>
                  {frontMatter.by}
                  {"Jonathan Segal / "}
                  {format(parseISO(frontMatter.publishedAt), "MMMM dd, yyyy")}
                </Text>
              </Flex>
              <Text fontSize="sm" color="gray.500" minWidth="100px" mt={[2, 0]}>
                {frontMatter.readingTime.text}
              </Text>
            </Flex>
          </Flex>
          {children}
          <Box>
            <Link href={discussUrl(slug)} isExternal>
              {"Discuss on Twitter"}
            </Link>
            {` • `}
            <Link href={editUrl(slug)} isExternal>
              {"Edit on GitHub"}
            </Link>
          </Box>
        </Stack>
      </Container>
    );
  };
};
