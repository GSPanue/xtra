<h1 align="center">Xtra</h1>

<div align="center">
A web application for looking for after school classes and activities
</div>

## Installation

1. Clone the repository: ``git clone https://github.com/GSPanue/xtra.git``
2. Install the dependencies: ``npm install``

## Demo
1. Generate the frontend and backend bundles: ``npm run build``
2. Add the following code to ``service-worker.js``, located in ``frontend/dist``:

    ```
    workbox.routing.registerNavigationRoute(
      workbox.precaching.getCacheKeyForURL('/index.html')
    );
    ```
3. Start your MongoDB server
4. Start the local server: ``npm start``
5. Go to ``http://localhost:3000``

## Version

1.0.0

## Author

Gurdev S. Panue
