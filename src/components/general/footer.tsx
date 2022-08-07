import React from "react";
import { Box, Container, Typography } from "@mui/material";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <div>
        <Typography variant="caption">Made by ATTIC</Typography>
        <a style={{ marginLeft: 15 }} href="https://twitter.com/atticgismw1">
          {/* <TwitterIcon /> */}
        </a>
        <a
          style={{ marginLeft: 15 }}
          href="https://github.com/GISSIAH/blackout-check"
        >
          {/* <GitHubIcon /> */}
        </a>
        <a
          style={{ marginLeft: 15 }}
          href="https://linkedin.com/company/atticgismw"
        >
          {/* <LinkedIn /> */}
        </a>
      </div>
      <Box sx={{}}>
        <Typography variant="subtitle1">
          Disclaimer: The data used is not 100% accurate as we do not have ESCOM
          official grid data. All information presented on this site shall not
          be taken as an official statement from ESCOM. For official statements,
          visit ESCOM website.
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
