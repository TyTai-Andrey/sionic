import React from 'react';

import { Box, ImageList, ImageListItem, Typography } from '@mui/material';

import { sidebarBlocksData } from '../../constants/constants';

import './Sidebar.scss';
import { PromoBlock } from './components/PromoBlock';

export const Sidebar: React.FC = () => {
  return (
    <Box className="Sidebar">
      <PromoBlock />
      <Box>
        <ImageList sx={{ width: 351, height: '100%', p: 2 }} cols={1}>
          {sidebarBlocksData.map((item: IBlockData, idx: number) => (
            <ImageListItem
              // Не бейте по жопе, я знаю что индексы *типо нельзя* использовать
              // и знаю почему, !НО! это статичный массив и url тут не уникальные,
              // да и в общем-то тут и не нужен этот key
              key={item.img + idx}
              sx={{
                m: '10px 0',
                borderRadius: '10px',
                overflow: 'hidden',
                height: '157px !important',
                position: 'relative',

                '&:first-of-type': { mt: 0 },
                '&:last-child': { mb: 0 },
              }}
            >
              <img src={`${item.img}`} alt={item.title} loading="lazy" />
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
