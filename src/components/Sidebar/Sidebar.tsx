import React from 'react';

import { Box, ImageList, ImageListItem, Typography } from '@mui/material';

import './Sidebar.scss';

export const Sidebar: React.FC = () => {
  return (
    <Box className="Sidebar">
      <Box>
        <ImageList
          sx={{ width: 351, height: '100%', p: 2 }}
          cols={1}
          //   rowHeight={164}
        >
          {[
            {
              img: 'https://www.live24.am/sites/default/files/styles/wide_r/public/2019-10/a31b95ced13e2605da3786f972d2e4a3.jpg?itok=nhpKORXA',
              title: 'Новая коллекция',
            },
            {
              img: 'https://live.staticflickr.com/5174/5533804841_a20806f88d_b.jpg',
              title: 'Новая коллекция',
            },
            {
              img: 'https://www.live24.am/sites/default/files/styles/wide_r/public/2019-10/a31b95ced13e2605da3786f972d2e4a3.jpg?itok=nhpKORXA',
              title: 'Новая коллекция',
            },
          ].map((item) => (
            <ImageListItem
              key={item.img}
              sx={{
                m: '10px 0',
                borderRadius: '10px',
                overflow: 'hidden',
                height: '157px !important',
                position: 'relative',

                '&:first-child': { mt: 0 },
                '&:last-child': { mb: 0 },
              }}
            >
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  background: 'rgba(45, 45, 45, .3)',
                  position: 'absolute',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: 'block', color: '#fff' }}
                >
                  {item.title}
                </Typography>
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
};
