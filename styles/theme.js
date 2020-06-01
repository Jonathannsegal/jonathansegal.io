import React from "react";
import { theme as chakraTheme } from "@chakra-ui/core";

const theme = {
  ...chakraTheme,
  fonts: {
    body: "Lexend Deca, sans-serif",
    heading: "Lexend Deca, sans-serif",
  },
  fontWeights: {
    light: 200,
    normal: 400,
    medium: 600,
    bold: 700,
  },
  breakpoints: ["400px", "620px", "62em", "80em"],
  icons: {
    ...chakraTheme.icons,
    dwolla: {
      path: (
        <g fill="url(#a)">
          <linearGradient
            id="a"
            gradientUnits="userSpaceOnUse"
            x1="6.16"
            y1="21.56"
            x2="18"
            y2="2.172"
          >
            <stop offset="0" stop-color="#f3904a" />
            <stop offset="1" stop-color="#aa437f" />
          </linearGradient>
          <path d="M21.9 5.5L12.7.2c-.4-.2-1-.2-1.4 0L2.1 5.5c-.4.2-.7.7-.7 1.2v10.6c0 .5.3 1 .7 1.2l9.2 5.3c.4.3 1 .3 1.4 0l9.2-5.3c.4-.2.7-.7.7-1.2V6.7c0-.5-.3-1-.7-1.2zM6 9.4v6.1l-3.2 1.8V6.7L12 1.4v3.7l-5.3 3c-.4.3-.7.8-.7 1.3zm5.3 1.4c-.4.3-.7.7-.7 1.2v6.1l-3.2 1.8V9.4l9.2-5.3v3.7l-5.3 3zm9.9 6.5L12 22.6V12l9.2-5.3v10.6z" />
        </g>
      ),
    },
    corteva: {
      path: (
        <g fill="#0072CE">
          <path d="M.05,11.35,11.32,0A12,12,0,0,0,.05,11.35M23.92,12v-.16H14.31l-2.17-2.2H23.72a12.06,12.06,0,0,0-1-3.08H12.36l2.17-2.19h6.69a11.77,11.77,0,0,0-3.69-3s-.06,0-.08,0A11.82,11.82,0,0,0,14.35.2L.25,14.4a10.8,10.8,0,0,0,.47,1.66A10,10,0,0,0,1.4,17.6,12,12,0,0,0,11.15,24l-8-8.12,1.64-1.66,9.51,9.57a11.5,11.5,0,0,0,3.2-1.12L6.89,12l1.64-1.66,10.9,11a11.39,11.39,0,0,0,2.11-2.22l-4.22-4.26h6.21A9.87,9.87,0,0,0,23.92,12" />
        </g>
      ),
    },
    github: {
      path: (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </g>
      ),
    },
    dribbble: {
      path: (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22.3,12c0,5.6-4.5,10.2-10.2,10.2S2,17.6,2,12S6.5,1.8,12.2,1.8S22.3,6.4,22.3,12z M16.5,21.2 c0,0-1.6-11-8.3-18.5 M22.3,12.5c0,0-11.3-3.1-17.3,6.7 M2.1,10.8c13.4,0.3,17.1-6.1,17.1-6.1" />
        </g>
      ),
    },
    linkedin: {
      path: (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </g>
      ),
    },
    mail: {
      path: (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </g>
      ),
    },
  },
};

export default theme;
