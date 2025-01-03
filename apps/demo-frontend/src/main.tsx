import { createRoot } from 'react-dom/client';
import './index.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './global/i18n.ts';
import i18n from './global/i18n.ts'; //ignoring TS for now. To use TS see https://www.i18next.com/overview/typescript
import { I18nextProvider } from 'react-i18next';
// import { hydrateRoot } from 'react-dom/client';

// Use below in dev mode
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Suspense loading={<Loading />}> */}

    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </Suspense> */}
    </I18nextProvider>

  </React.StrictMode>

)

//use below only for production where you have ssr setup
//@ts-ignore
// hydrateRoot(document, <React.StrictMode><I18nextProvider i18n={i18n}><BrowserRouter><App assetMap={window.assetMap} /></BrowserRouter></I18nextProvider></React.StrictMode>);
