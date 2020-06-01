import React from "react";
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Link,
  List,
  ListItem,
  Icon,
  Divider,
  Button,
} from "@chakra-ui/core";

import Timeline from "../components/Timeline";
import Container from "../components/Container";
import { internships, projects } from "../data/lists";

const Index = () => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: "rgba(0,0,0,.6)",
    dark: "gray.400",
  };
  const sourceBgColor = {
    light: "#eff3f6",
    dark: "#232533",
  };
  const sourceBorderColor = {
    light: "#cdcfd1",
    dark: "#737373",
  };

  return (
    <Container>
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        mx="auto"
        mb={2}
        maxWidth="700px"
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
        >
          <Heading
            letterSpacing="tight"
            w={["100%", "80%", "100%"]}
            mb={2}
            as="h1"
            size="2xl"
          >
            Hey, I’m Jonathan Segal
          </Heading>
          <Text color={secondaryTextColor[colorMode]}>
            I’m a student, developer, and creator currently living in Las Vegas,
            NV. While your here check out some of my projects, my&nbsp;
            <Link
              href="/resume"
              title="Resume"
              passHref
              color="hsl(208, 99%, 50%)"
            >
              Resume
            </Link>
            , or{" "}
            <Link
              href="/about#contact"
              title="Contact"
              passHref
              color="hsl(208, 99%, 50%)"
            >
              Contact me
            </Link>
            .
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
          w="100%"
        >
          <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={300}>
            Internships
          </Heading>
          <List w="100%">
            {internships.map((internship) => (
              <>
                <ListItem py={2}>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center" fontWeight={100}>
                      {/* <Link
                        _hover={{ textDecoration: "none" }}
                        href={`./projects/${internship.name
                          .toLowerCase()
                          .replace(/ +/g, "")}`}
                      > */}
                      <Flex alignItems="center" fontWeight={100}>
                        <Text fontSize="2xl" mr="0.5em">
                          <Icon name={internship.icon} />
                        </Text>
                        <Text
                          fontWeight={400}
                          fontSize="lg"
                          lineHeight="shorter"
                          w={["1em", "5em", "8em"]}
                        >
                          {internship.name}
                        </Text>
                      </Flex>
                      {/* </Link> */}
                      <Text
                        display={["none", "none", "block"]}
                        pl="1em"
                        pr="2em"
                        color={secondaryTextColor[colorMode]}
                        w="full"
                      >
                        {internship.description}
                      </Text>
                    </Flex>
                    {/* <Flex>
                      {internship.hasOwnProperty("link") ? (
                        <Link
                          _hover={{ textDecoration: "none" }}
                          href={internship.link}
                          isExternal
                        >
                          <Button
                            ml="0.5em"
                            size="sm"
                            bg="blue.400"
                            color="white"
                            p="0.6em"
                          >
                            Read more
                          </Button>
                        </Link>
                      ) : null}
                    </Flex> */}
                  </Flex>
                </ListItem>
                {internship.name != "Corteva" ? (
                  <Divider display={["none", "none", "block"]} />
                ) : null}
              </>
            ))}
          </List>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
          w="100%"
        >
          <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={300}>
            Projects
          </Heading>
          <List w="100%">
            {projects.map((project) => (
              <>
                <ListItem py={2}>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center" fontWeight={100}>
                      <Link
                        _hover={{ textDecoration: "none" }}
                        href={`./projects/${project.name
                          .toLowerCase()
                          .replace(/ +/g, "")}`}
                      >
                        <Flex alignItems="center" fontWeight={100}>
                          <Text fontSize="2xl" mr="0.5em">
                            {project.icon}
                          </Text>
                          <Text
                            fontWeight={400}
                            fontSize="lg"
                            lineHeight="shorter"
                            w={["3em", "5em", "8em"]}
                          >
                            {project.name}
                          </Text>
                        </Flex>
                      </Link>
                      <Text
                        display={["none", "none", "block"]}
                        pl="1em"
                        pr="2em"
                        color={secondaryTextColor[colorMode]}
                        w="full"
                      >
                        {project.description}
                      </Text>
                    </Flex>
                    <Flex>
                      {project.hasOwnProperty("source") ? (
                        <Link
                          _hover={{ textDecoration: "none" }}
                          href={project.source}
                          isExternal
                        >
                          <Button
                            size="sm"
                            leftIcon="github"
                            bg={sourceBgColor[colorMode]}
                            borderColor={sourceBorderColor[colorMode]}
                            borderWidth="1px"
                            pl="1em"
                          >
                            source
                          </Button>
                        </Link>
                      ) : null}
                      {project.hasOwnProperty("live") ? (
                        <Link
                          _hover={{ textDecoration: "none" }}
                          href={project.live}
                          isExternal
                        >
                          <Button
                            ml="0.5em"
                            size="sm"
                            bg="red.400"
                            color="white"
                            p="0.6em"
                          >
                            live
                          </Button>
                        </Link>
                      ) : null}
                      {project.hasOwnProperty("download") ? (
                        <Link
                          _hover={{ textDecoration: "none" }}
                          href={project.download}
                          download
                        >
                          <Button
                            ml="0.5em"
                            size="sm"
                            bg="hsl(208, 99%, 50%)"
                            color="white"
                            p="0.6em"
                          >
                            download
                          </Button>
                        </Link>
                      ) : null}
                    </Flex>
                  </Flex>
                </ListItem>
                {project.name != "Power Up" ? (
                  <Divider display={["none", "none", "block"]} />
                ) : null}
              </>
            ))}
          </List>
        </Flex>
        <Timeline />
      </Stack>
    </Container>
  );
};

export default Index;
