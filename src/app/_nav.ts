export const navItems = [
  {
    title: true,
    name: 'Menu'
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Manage Users',
    url: '/customer',
    icon: 'fa fa-list',
    children: [
      {
        name: 'All Users',
        url: '/users',
        icon: 'fa fa-users'
      }
      // {
      //   name: 'Service Provider',
      //   url: '/service_provider',
      //   icon: 'fa fa-user-plus'
      // }
    ]
  },
  {
    name: 'Manage Category',
    url: '/category',
    icon: 'fa fa-list',
    children: [
      {
        name: 'Category',
        url: '/category',
        icon: 'icon-layers'
      }
    ]
  },
  {
    name: 'Manage Booking',
    url: '/booking',
    icon: 'fa fa-list',
    children: [
      {
        name: 'Booking',
        url: '/booking',
        icon: 'icon-layers'
      }
    ]
  }
  

];
