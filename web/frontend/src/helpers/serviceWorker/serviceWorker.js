import { Workbox } from 'workbox-window';

const shouldRegisterServiceWorker = () => {
  const isProductionMode = process.env.NODE_ENV === 'production';
  const hasServiceWorker = 'serviceWorker' in navigator;

  return isProductionMode && hasServiceWorker;
};

const registerServiceWorker = () => {
  const shouldRegister = shouldRegisterServiceWorker();

  if (shouldRegister) {
    Notification.requestPermission((status) => {
      const { serviceWorker } = navigator;

      if (status === 'granted') {
        const wb = new Workbox('/service-worker.js');

        wb.addEventListener('installed', () => {
          new Notification('Xtra', {
            body: 'Created Cache'
          });
        });

        wb.register();
      }

      serviceWorker.register('/service-worker.js');
    });
  }
};

export {
  shouldRegisterServiceWorker,
  registerServiceWorker
};
