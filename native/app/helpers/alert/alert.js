const sendAlert = (message) => (
  alert({
    title: 'Xtra',
    okButtonText: 'OK',
    message
  })
);

export {
  sendAlert
};
