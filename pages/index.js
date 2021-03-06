import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { LinkedIn } from '@mui/icons-material';
import axios from 'axios';

import { QueryClient, QueryClientProvider } from 'react-query';

import HomeCard from '../components/home/homeCard';
const queryClient = new QueryClient()
export default function Home() {
  const Map = dynamic(() => import("../components/map"), { ssr: false });


  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <Head>
          <title>Black Out Check</title>
          <meta name="description" content="Check load shedding status for areas within malawi" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container sx={{ display: 'flex', py: 1, px: 0, justifyContent: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>Load Shedding Status</Typography>
        </Container>
        <Container sx={{
          py: 1,
          px: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}>
          <HomeCard />
          <Map />
        </Container>
        <footer className={styles.footer}>
          <div>
            <Typography variant="caption">Made by ATTIC</Typography>
            <a style={{ marginLeft: 15 }} href='https://twitter.com/atticgismw1'><TwitterIcon /></a>
            <a style={{ marginLeft: 15 }} href="https://github.com/GISSIAH/blackout-check"><GitHubIcon /></a>
            <a style={{ marginLeft: 15 }} href="https://linkedin.com/company/atticgismw"><LinkedIn /></a>
          </div>
          <Box sx={{}}>
            <Typography variant='subtitle1'>
              Disclaimer:  The data used is not 100% accurate as we do not have ESCOM official grid data. All information presented on this site shall not be taken as an official statement from ESCOM. For official statements, visit ESCOM website.  
            </Typography>
          </Box>

        </footer>
      </div>
    </QueryClientProvider>

  )
}