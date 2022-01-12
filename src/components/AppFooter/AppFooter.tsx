import * as React from 'react';
import {
  socialNetworksIconsData,
  installAppIconsData,
} from '../../constants/constants';

import './AppFooter.scss';

export const AppFooter = () => {
  const createIconsBlock = (
    mainClass: string,
    iconsData: IBlockData[],
    textTitle: string
  ) => {
    return (
      <div className={`${mainClass} IconsBlock`}>
        <div className={`${mainClass}-title IconsBlock-title`}>{textTitle}</div>
        <div className={`${mainClass}-icons IconsBlock-icons`}>
          {iconsData.map((iconData: IBlockData) => {
            return (
              <div
                className={`${mainClass}-icon IconsBlock-icon`}
                key={iconData.img}
              >
                <img
                  src={`${iconData.img}`}
                  alt={iconData.title}
                  loading="lazy"
                  className={`${mainClass}--icon IconsBlock--icon`}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="AppFooter">
      <div className="AppFooter-top">
        <div className="AppFooter-top-left">React</div>
        <div className="AppFooter-top-right">
          {createIconsBlock(
            'SocialNetworks',
            socialNetworksIconsData,
            'Присоединяйтесь к нам'
          )}
          {createIconsBlock(
            'InstallApp',
            installAppIconsData,
            'Устанавливайте приложение'
          )}
        </div>
      </div>
      <div className="AppFooter-documents">
        <div className="AppFooter-companyName AppFooter-documents-item">
          © Sionic
        </div>
        <div className="AppFooter-legalInformation AppFooter-documents-item">
          Правовая информация
        </div>
        <div className="AppFooter-privacyPolicy AppFooter-documents-item">
          Политика конфиденциальности
        </div>
      </div>
    </div>
  );
};
