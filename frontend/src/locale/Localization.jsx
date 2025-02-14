import { useState, useEffect } from 'react';

import { ConfigProvider, theme } from 'antd';

import { useSelector } from 'react-redux';

import { selectLangState } from '@/redux/translate/selectors';

import antdLocale from './antdLocale';

export default function Localization({ children }) {
  const { langCode, langDirection } = useSelector(selectLangState);

  const [locale, setLocal] = useState();
  const [direction, setDirection] = useState();

  useEffect(() => {
    const lang = antdLocale[langCode];
    setDirection(langDirection);
    setLocal(lang);
  }, [langCode]);

  return (
    <ConfigProvider
      direction={direction}
      locale={locale}
      theme={{
        // algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#7f9f9f',
          colorLink: '#7f9f9f',

          // borderRadius: 8,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
