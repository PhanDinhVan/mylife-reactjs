export default {
  items: [
    {
      name: 'APP',
      url: '/app',
      icon: 'icon-globe',
      children: [
        {
          name: 'Users',
          url: '/users',
          icon: 'icon-people',
        }, 
        {
          name: 'Bookings',
          url: '/bookings',
          icon: 'cui-clipboard',
        }, 
        {
          name: 'Reviews',
          url: '/reviews',
          icon: 'icon-note',
        },
      ],
    }, {
      name: 'MARKETING',
      url: '/marketing',
      icon: 'cui-bullhorn',
      children: [
        {
          name: 'News',
          url: '/news',
          icon: 'fa fa-newspaper-o',
        },
        {
          name: 'Promotions',
          url: '/promotions',
          icon: 'icon-present',
        },
      ],
    }, {
      name: 'SETTINGS',
      url: '/pages',
      icon: 'icon-settings',
      children: [
        {
          name: 'Companies',
          url: '/companies',
          icon: 'fa fa-fort-awesome',
        },
        {
          name: 'Restaurants',
          url: '/restaurants',
          icon: 'fa fa-cutlery',
        },
        {
          name: 'Menus Sushi Yen',
          url: '/menus_sushi_yen',
          icon: 'fa fa-coffee',
        },
        {
          name: 'Menu My Life Coffee',
          url: '/menu_mylife_coffee',
          icon: 'icon-cup',
        },
      ],
    },
  ]
};
