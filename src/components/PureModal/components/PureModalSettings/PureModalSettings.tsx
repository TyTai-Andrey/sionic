import {
  Checkbox,
  DialogTitle,
  FormControlLabel,
  List,
  ListItem,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PureModal } from '../..';
import {
  setIsAlertOpen,
  setAlertText,
} from '../../../../redux/reduxCollection/common';

import './PureModalSettings.scss';

type PureModalSettingsProps = {
  open: boolean;
  onClose: () => void;
  categorys: ICategory[] | null;
};

export const PureModalSettings: React.FC<PureModalSettingsProps> = ({
  open,
  onClose,
  categorys,
}) => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(
    () => setChecked(new Array(categorys?.length).fill(false)),
    [categorys, open]
  );

  const header = (
    <DialogTitle className="PureModalSettings-header">Настройки</DialogTitle>
  );

  const body = (
    <List className="PureModalSettings-body">
      {categorys?.map((category: ICategory, idx: number) => (
        <ListItem key={category.id} className="PureModalSettings-body-item">
          <FormControlLabel
            className="PureModalSettings-body-item-label"
            label={category.name}
            control={
              <Checkbox
                checked={checked[idx]}
                onChange={(event) =>
                  setChecked(
                    checked.map((check, idxCheck) =>
                      idxCheck === idx ? event.target.checked : check
                    )
                  )
                }
              />
            }
          />
        </ListItem>
      ))}
    </List>
  );

  const applySettings = () => {
    const categorysNames = checked
      .filter((item: boolean) => item)
      .map(
        (item: boolean, idx: number) =>
          item && (categorys as ICategory[])?.[idx].name
      );

    if (categorysNames.length) {
      dispatch(setIsAlertOpen(true));
      dispatch(setAlertText([...categorysNames, 'Были выбраны:']));
    }
    onClose();
  };

  const footer = (
    <div className="PureModalSettings-footer">
      <button
        className="PureModalSettings-footer-button"
        onClick={applySettings}
      >
        Выбрать
      </button>
    </div>
  );

  return (
    <PureModal
      header={header}
      body={body}
      footer={footer}
      open={open}
      onClose={onClose}
    />
  );
};
