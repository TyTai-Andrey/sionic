import React from 'react';
import { useSelector } from 'react-redux';

import { DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import { PureModal } from '../..';

import './PureModalLocation.scss';
import { citys } from '../../../../constants/constants';

type PureModalLocationProps = {
  open: boolean;
  onClose: () => void;
  setSity: (sity: string) => void;
};

export const PureModalLocation: React.FC<PureModalLocationProps> = ({
  open,
  onClose,
  setSity,
}) => {
  const { selectedSity } = useSelector(
    (state: AppState) => state.commonReducer
  );

  const header = (
    <DialogTitle sx={{ textAlign: 'center', fontSize: '2em' }}>
      Selected sity: {selectedSity}
    </DialogTitle>
  );

  const body = (
    <List>
      {citys.map((sity: string) => (
        <ListItem
          key={sity}
          sx={{ textAlign: 'center', cursor: 'pointer' }}
          onClick={() => setSity(sity)}
        >
          <ListItemText primary={sity} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <PureModal
      header={header}
      body={body}
      footer={null}
      open={open}
      onClose={onClose}
    />
  );
};
