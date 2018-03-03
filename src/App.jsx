import React        from 'react';
import ReactDOM     from 'react-dom';
import RouterConfig from '~/routing/RouterConfig';

/* REACT-A11Y SETUP */
const predicateFunc = (componentName, elementId, failureMsg) => {
  console.info(`\
    • Component/React Element:\t${componentName}\n\
    • Element ID:\t${elementId}\n\
    • Failure Report:\t${failureMsg}\n\
  `);
  return true;
};

const a11yConfig = {
  ReactDOM,     // Necessary for compatibility with React >= 0.14
  device: [],   // OPTIONS: 'mobile'
  exclude: ['REDUNDANT_ALT'],
  filterFn: predicateFunc,
  includeSrcNode: true,
  throw: false,
};

// if (process.env.NODE_ENV === 'dev') a11y(React, a11yConfig);


/* SERVICEWORKER SETUP */
// First, verify the existence of the `serviceWorker` object inside the Window's `navigator` entity:
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker') // { scope: '/' }
    .then(() => console.info('ServiceWorker registered!'));
}

let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (evt) => {
  console.info('beforeInstallPrompt fired!', evt);
  evt.preventDefault();
  deferredPrompt = evt;

  return ('localStorage' in window)
    ? localStorage.set('hasAppBannerRevealed', true)
    : console.info('App Banner was displayed.');
});

// if (module.hot) {
//   module.hot.accept();
// }

// Inject router configuration into HTML insertion <div>:
ReactDOM.render(
  RouterConfig,
  document.getElementById('root'),
);
