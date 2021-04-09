/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
 
import Backend from 'i18next-xhr-backend';
 
i18n
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // connect with React
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
 
    lng: 'fr',
    fallbackLng: 'en',
    whitelist: ['en', 'fr', 'pt'],
 
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
 
export default i18n;  