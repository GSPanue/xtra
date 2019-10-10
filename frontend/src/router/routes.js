import Route from './Route';
import Home from '@/views/Home/Index';
import FourOhFour from '@/views/FourOhFour/Index';

const routes = [
  Route.set('/', Home, 'home').get(),
  Route.set('*', FourOhFour, 'fourOhFour').get()
];

export default routes;
