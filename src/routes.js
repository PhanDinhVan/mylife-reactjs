import React from 'react';
import Loadable from 'react-loadable'

// import Layout from './components/Layout';

function Loading() {
  return <div>Loading...</div>;
}

const Restaurants = Loadable({
  loader: () => import('./containers/restaurants/restaurants'),
  loading: Loading,
});

const Companies = Loadable({
  loader: () => import('./containers/companies/companies'),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import('./containers/users/users'),
  loading: Loading,
});

const Bookings = Loadable({
  loader: () => import('./containers/booking/booking'),
  loading: Loading,
});

const Promotions = Loadable({
  loader: () => import('./containers/promotion/promotions'),
  loading: Loading,
});

const MenuSushiYen = Loadable({
  loader: () => import('./containers/menus_sushi_yen/menus_sushi'),
  loading: Loading,
})

const News = Loadable({
  loader: () => import('./containers/news/news'),
  loading: Loading,
})

const Roles = Loadable({
  loader: () => import('./containers/roles/roles'),
  loading: Loading,
})


const routes = [
  // { path: '/', exact: true, name: 'Users', component: Users },
  { path: '/restaurants', exact: true, name: 'Restaurants', component: Restaurants },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/companies', exact: true, name: 'Companies', component: Companies },
  { path: '/bookings', exact: true, name: 'Bookings', component: Bookings },
  { path: '/promotions', exact: true, name: 'Promotions', component: Promotions },
  { path: '/menus_sushi_yen', exact: true, name: 'MenuSushiYen', component: MenuSushiYen },
  { path: '/news', exact: true, name: 'News', component: News },
  { path: '/roles', exact: true, name: 'Roles', component: Roles },
];

export default routes;
