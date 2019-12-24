<h1 align="center">Xtra</h1>

<div align="center">
A web application for looking for after school classes and activities
</div>

## Installation

1. Clone the repository: ``git clone https://github.com/GSPanue/xtra.git``
2. Install the dependencies: ``npm install``

## Demo (Web)
1. Generate the frontend and backend bundles: ``npm run build:web``
2. Add the following code to ``service-worker.js`` located in ``frontend/dist``:

    ```
    workbox.routing.registerNavigationRoute(
      workbox.precaching.getCacheKeyForURL('/index.html')
    );
    ```
3. Start your MongoDB server
4. Start the local server: ``npm start:web``
5. Go to ``http://localhost:3000``

## Demo (Native)
To demo the Native application, you will need to follow the [NativeScript-Vue Installation Guide](https://nativescript-vue.org/en/docs/getting-started/installation). In addition to this, you will also need to setup and configure an Android Virtual Device (AVD).

1. Generate the frontend and backend bundles: ``npm run build:web``
2. Start your MongoDB server
3. Start the local server: ``npm start:web``
4. Change the API address in ``native/app/helpers/api/api.js`` to your own:

    ```
    const getAPIURL = () => (
      // Change IP address
      // Do not change port, protocol or path
      `http://192.168.1.233:3000/api/v1`
    );
    ```
5. Start the Android emulator: ``npm run start:native``

## Version

1.0.0

## Author

Gurdev S. Panue
