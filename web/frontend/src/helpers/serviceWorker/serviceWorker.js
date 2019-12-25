const shouldRegisterServiceWorker = () => {
  const isProductionMode = process.env.NODE_ENV === 'production';
  const hasServiceWorker = 'serviceWorker' in navigator;

  return isProductionMode && hasServiceWorker;
};

const registerServiceWorker = () => {
  const shouldRegister = shouldRegisterServiceWorker();

  if (shouldRegister) {
    const { serviceWorker } = navigator;

    serviceWorker.register('/service-worker.js');
  }
};

export {
  shouldRegisterServiceWorker,
  registerServiceWorker
};
