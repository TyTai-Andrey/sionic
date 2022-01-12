import React from 'react';
import { Dialog } from '@mui/material';

import './PureModal.scss';

type PureModalProps = {
  header: JSX.Element | null;
  body: JSX.Element | null;
  footer: JSX.Element | null;
  open: boolean;
  onClose: () => void;
};

export const PureModal: React.FC<PureModalProps> = ({
  header,
  body,
  footer,
  open,
  onClose,
}) => (
  <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
    {header}
    {body}
    {footer}
  </Dialog>
);
