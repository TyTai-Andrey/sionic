import React from 'react';
import { Snackbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAlertText,
  setIsAlertOpen,
} from '../../redux/reduxCollection/common';

export const Alert = () => {
  const { alertText, isAlertOpen } = useSelector(
    (state: AppState) => state.commonReducer
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setAlertText([]));
    dispatch(setIsAlertOpen(false));
  };

  return (
    <>
      {alertText.map((text: string, idx) => (
        <Snackbar
          open={isAlertOpen}
          onClose={handleClose}
          //   TransitionComponent={state.Transition}
          message={text}
          key={text + idx}
          sx={{
            bottom: 24 + idx * 60 + 'px !important',
          }}
        />
      ))}
    </>
  );
};
