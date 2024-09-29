export const routes = {
  home: {
    id: "1",
    name: "Home",
    path: `/`,
    transKey: "navigationTabHome",
    authRequired: true,
    hideMenu: false,
    cookieRequired: false,
    event_name: "homepage",
  },
  login: {
    id: "2",
    name: "login",
    path: `login`,
    transKey: "navigationTablogin",
    authRequired: true,
    hideMenu: false,
    cookieRequired: false,
    event_name: "loginpage",
  },
};

Object.freeze(routes);
