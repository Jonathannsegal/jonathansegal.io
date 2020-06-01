import React from "react";
import { Flex, Link, IconButton } from "@chakra-ui/core";

const Footer = () => (
  <Flex justify="center">
    <Link href="https://github.com/jonathannsegal" title="Dribbble" isExternal>
      <IconButton
        aria-label="GitHub"
        icon="github"
        size="lg"
        color="gray.500"
        variant="ghost"
      />
    </Link>
    <Link href="https://dribbble.com/Jonathansegal" title="GitHub" isExternal>
      <IconButton
        aria-label="Dribbble"
        icon="dribbble"
        size="lg"
        color="gray.500"
        variant="ghost"
      />
    </Link>
    <Link
      href="https://www.linkedin.com/in/jonathannsegal/"
      title="LinkedIn"
      isExternal
    >
      <IconButton
        aria-label="LinkedIn"
        icon="linkedin"
        size="lg"
        color="gray.500"
        variant="ghost"
      />
    </Link>
    <Link href="mailto:jonathannsegal@gmail.com" title="Email" isExternal>
      <IconButton
        aria-label="Email"
        icon="mail"
        size="lg"
        color="gray.500"
        variant="ghost"
      />
    </Link>
  </Flex>
);

export default Footer;
