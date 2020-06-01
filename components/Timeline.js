import React, { useState } from "react";
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Button,
  List,
  ListItem,
  Icon,
  Stack,
  Divider,
} from "@chakra-ui/core";

const YearDivider = () => {
  const { colorMode } = useColorMode();
  const borderColor = {
    light: "gray.200",
    dark: "gray.600",
  };

  return <Divider borderColor={borderColor[colorMode]} my={8} w="100%" />;
};

const TimelineStep = ({ title, children }) => {
  const { colorMode } = useColorMode();
  const color = {
    light: "gray.600",
    dark: "gray.400",
  };

  return (
    <ListItem>
      <Stack ml={2} mb={4}>
        <Flex align="center">
          <Icon name="check-circle" mr={2} color="whatsapp.500" />
          <Text letterSpacing="tight" fontWeight="medium">
            {title}
          </Text>
        </Flex>
        <Text color={color[colorMode]} ml={6}>
          {children}
        </Text>
      </Stack>
    </ListItem>
  );
};

const FullTimeline = () => (
  <>
    <YearDivider />
    <Heading as="h3" size="lg" fontWeight="bold" mb={4} letterSpacing="tighter">
      2017
    </Heading>
    <List>
      <TimelineStep title="Transfered to the University of Iowa 🦅">
        I always wanted to be a computer programer and the university of iowa
        was close to home.
      </TimelineStep>
      <TimelineStep title="Started at a small Christian College">
        My initial plan was to study Theology. That only lasted a month.
      </TimelineStep>
      <TimelineStep title="Graduated High School">
        I graduated from Cedar Valley Christian School in Cedar Rapids, IA
      </TimelineStep>
    </List>
    <YearDivider />
    <Heading as="h3" size="lg" fontWeight="bold" mb={4} letterSpacing="tighter">
      2009
    </Heading>
    <List>
      <TimelineStep title="Moved to Cedar Rapids, IA">
        The city of five smells.
      </TimelineStep>
    </List>
    <YearDivider />
    <Heading as="h3" size="lg" fontWeight="bold" mb={4} letterSpacing="tighter">
      2007
    </Heading>
    <List>
      <TimelineStep title="Moved to Dover, DE">
        It was great being 30 minutes from the beach{" "}
        <span role="img" aria-label="Beach">
          🏖️
        </span>
      </TimelineStep>
    </List>
    <YearDivider />
    <Heading as="h3" size="lg" fontWeight="bold" mb={4} letterSpacing="tighter">
      1999
    </Heading>
    <List>
      <TimelineStep title="Born 👶🏼🍼" />
    </List>
  </>
);

const Timeline = () => {
  const [isShowingFullTimeline, showFullTimeline] = useState(false);

  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      maxWidth="700px"
      // mt={5}
    >
      <Heading
        id="timeline"
        // pt="3.5em"
        // mt="-3.5em"
        letterSpacing="tight"
        mb={4}
        size="xl"
        fontWeight="300"
      >
        Timeline
      </Heading>
      <Heading
        as="h3"
        size="lg"
        fontWeight="bold"
        mb={4}
        letterSpacing="tighter"
      >
        2020
      </Heading>
      <List>
        <TimelineStep title="Second Internship">
          Super excited to land an internship at Dwolla working in fintech in
          Des Moines, IA.
        </TimelineStep>
        <TimelineStep title="Study Abroad 🦘🇦🇺">
          G'day, studying in Australia was incredible even though my time was
          cut short due to Covid-19.
        </TimelineStep>
      </List>
      <YearDivider />
      <Heading
        as="h3"
        size="lg"
        fontWeight="bold"
        mb={4}
        letterSpacing="tighter"
      >
        2019
      </Heading>
      <List>
        <TimelineStep title="Started my first Internship">
          Spoke to some cool guys at HackISU and they offered me an internship!
        </TimelineStep>
        <TimelineStep title="Second place at PickHacks 🏆">
          First time placing at a Hackathon!
        </TimelineStep>
      </List>
      <YearDivider />
      <Heading
        as="h3"
        size="lg"
        fontWeight="bold"
        mb={4}
        letterSpacing="tighter"
      >
        2018
      </Heading>
      <List>
        <TimelineStep title="First Hackathon">
          Had a great time at HackUIowa. This was the first of many.
        </TimelineStep>
        <TimelineStep title="Transfered to Iowa State University 🌪️">
          Realized that ISU was a much better school for my major.{" "}
          <span role="img" aria-label="Programer">
            👨‍💻
          </span>
        </TimelineStep>
        <TimelineStep title="Geek Squad 🤓🤵">
          Did you try turning it off and back on again?
        </TimelineStep>
      </List>
      {isShowingFullTimeline ? (
        <>
          <FullTimeline />
          <Button
            my={4}
            mx="auto"
            fontWeight="medium"
            rightIcon="chevron-up"
            variant="ghost"
            onClick={() => showFullTimeline(false)}
          >
            See Less
          </Button>
        </>
      ) : (
        <Button
          mt={4}
          mx="auto"
          mb={4}
          fontWeight="medium"
          rightIcon="chevron-down"
          variant="ghost"
          onClick={() => showFullTimeline(true)}
        >
          See More
        </Button>
      )}
    </Flex>
  );
};

export default Timeline;
