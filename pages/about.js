import React from "react";
import { NextSeo } from "next-seo";
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Link,
  List,
  ListItem,
} from "@chakra-ui/core";

import Container from "../components/Container";
import Map from "../components/Map";

const url = "https://jonathansegal.io/about";
const title = "About Me – Jonathan Segal";

const About = () => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: "gray.700",
    dark: "gray.400",
  };
  const linkColor = {
    light: "hsl(208, 99%, 44%)",
    dark: "hsl(208, 95%, 68%)",
  };
  const mapStyle = {
    light: "mapbox://styles/mapbox/streets-v11",
    dark: "mapbox://styles/mapbox/dark-v10",
  };

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
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
            <Heading letterSpacing="tight" mb="2" as="h1" size="2xl">
              About Me
            </Heading>
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              I’m Jonathan Segal, a student at Iowa State University, developer,
              and photographer. I work on fun projects and write blog posts
              about stuff I find interesting. I am currently an intern at&nbsp;
              <Link
                href="https://www.dwolla.com"
                title="Dwolla"
                isExternal
                color={linkColor[colorMode]}
              >
                Dwolla
              </Link>
              , working remotely from Las Vegas, NV.
            </Text>
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              I spend my time out of the classroom going across the country to
              hackathons with my friends and building interesting projects. I
              also actively write on my blog, about things I find interesting
              such as new technology, hackathons, and how to make the most out
              of college.
            </Text>
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              I grew up primarily in Iowa and am going to school at Iowa State
              for Software Engineering. I plan on graduating in May of 2022. I
              spend my free time going on adventures, taking pictures, and
              spending time with friends and family.
            </Text>
            <Heading
              id="contact"
              pt="4em"
              mt="-4em"
              mb="2"
              size="lg"
              fontWeight="300"
            >
              Contact:
            </Heading>
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              Feel free to email me at at: <br />
              &nbsp;
              <Link
                href="mailto:jonathannsegal@gmail.com"
                color={linkColor[colorMode]}
              >
                jonathannsegal at gmail dot com
              </Link>
              .
            </Text>
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              For more info about my work, here's my&nbsp;
              <Link href="/resume" color={linkColor[colorMode]}>
                resume
              </Link>
              .
            </Text>
            <Heading
              id="jonathan"
              pt="4em"
              mt="-4em"
              mb="1"
              size="lg"
              fontWeight="300"
            >
              Jonathan:
            </Heading>
            <List
              color={secondaryTextColor[colorMode]}
              styleType="disc"
              lineHeight="2em"
              mb={5}
            >
              <ListItem>
                <span role="img" aria-label="Programer">
                  👨🏻‍💻
                </span>{" "}
                Software Engineering Intern
              </ListItem>
              <ListItem>
                <span role="img" aria-label="School">
                  🏫
                </span>{" "}
                getting a degree at Iowa State
              </ListItem>
              <ListItem>
                <span role="img" aria-label="Hockey">
                  🏒
                </span>{" "}
                plays ice hockey
              </ListItem>
              <ListItem>
                <span role="img" aria-label="Map">
                  🗺️
                </span>{" "}
                has been to 7 countries and 40 US states
              </ListItem>
              <ListItem>
                <span role="img" aria-label="Camera">
                  📷
                </span>{" "}
                shoots incredible pictures
              </ListItem>
              <ListItem>
                <span role="img" aria-label="Pizza">
                  🍕
                </span>{" "}
                needs pizza
              </ListItem>
              <ListItem>
                <span role="img" aria-label="Colors">
                  🎨
                </span>{" "}
                does graphic design stuff
              </ListItem>
              <ListItem>
                <span role="img" aria-label="Arcade">
                  🕹️
                </span>{" "}
                has been to 10 hackathons
              </ListItem>
              <ListItem>
                <span role="img" aria-label="Metal">
                  🥈
                </span>{" "}
                placed 2nd at one
              </ListItem>
              <ListItem>
                <span role="img" aria-label="Snowboard">
                  🏂
                </span>{" "}
                loves snowboarding
              </ListItem>
            </List>
            <Heading
              id="map"
              pt="4em"
              mt="-4em"
              mb="3"
              size="lg"
              fontWeight="300"
            >
              My Map:
            </Heading>
            <Map style={mapStyle[colorMode]} />
            <Flex mb={5}> </Flex>
            <Heading
              id="contact"
              pt="4em"
              mt="-4em"
              mb="2"
              size="lg"
              fontWeight="300"
            >
              Around the web:
            </Heading>
            <List
              color={secondaryTextColor[colorMode]}
              styleType="disc"
              lineHeight="2em"
            >
              <ListItem>
                <Text display="inline" fontWeight="bold">
                  GitHub:
                </Text>
                &nbsp;
                <Link
                  href="https://github.com/Jonathannsegal"
                  color={linkColor[colorMode]}
                >
                  jonathannsegal
                </Link>
              </ListItem>
              <ListItem>
                <Text display="inline" fontWeight="bold">
                  Twitter:
                </Text>
                &nbsp;
                <Link
                  href="https://twitter.com/jonathannsegal"
                  color={linkColor[colorMode]}
                >
                  jonathannsegal
                </Link>
              </ListItem>
              <ListItem>
                <Text display="inline" fontWeight="bold">
                  Dribbble:
                </Text>
                &nbsp;
                <Link
                  href="https://dribbble.com/Jonathansegal"
                  color={linkColor[colorMode]}
                >
                  jonathannsegal
                </Link>
              </ListItem>
              <ListItem>
                <Text display="inline" fontWeight="bold">
                  Linkedin:
                </Text>
                &nbsp;
                <Link
                  href="https://www.linkedin.com/in/jonathannsegal/"
                  color={linkColor[colorMode]}
                >
                  jonathannsegal
                </Link>
              </ListItem>
              <ListItem>
                <Text display="inline" fontWeight="bold">
                  Facebook:
                </Text>
                &nbsp;
                <Link
                  href="https://www.facebook.com/jonathannsegal/"
                  color={linkColor[colorMode]}
                >
                  jonathannsegal
                </Link>
              </ListItem>
            </List>
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default About;
