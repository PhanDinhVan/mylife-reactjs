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
          name: 'Employees',
          url: '/employees',
          icon: 'fa fa-drivers-license-o',
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
          name: 'Booking Permissions',
          url: '/booking_managers',
          icon: 'fa fa-drivers-license-o',
        },
        {
          name: 'Companies',
          url: '/companies',
          icon: 'fa fa-fort-awesome',
        },
        {
          name: 'Menus My Life Coffee',
          url: '/menu_mylife_coffee',
          icon: 'icon-cup',
        },
        {
          name: 'Menus Sushi Yen',
          url: '/menus_sushi_yen',
          icon: 'fa fa-coffee',
        },
        {
          name: 'Restaurants',
          url: '/restaurants',
          icon: 'fa fa-cutlery',
        },
        {
          name: 'Review Permissions',
          url: '/review_bmanager',
          icon: 'icon-note',
        },
        {
          name: 'Roles',
          url: '/roles',
          icon: 'fa fa-id-badge',
        },
      ],
    },
  ]
};
