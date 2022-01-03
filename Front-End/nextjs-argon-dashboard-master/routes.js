// import { userSession } from "./components/auth";

import { userSession } from "./pages/_app";

var routesGuest = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    layout: "/admin",
  },
  
  {
    path: "/tables",
    name: "Stats",
    icon: "ni ni-bullet-list-67 text-red",
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    layout: "/auth",
  },
];

var routesUser = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    layout: "/admin",
  },
  {
    path: "/home-reg",
    name: "Home Registration",
    icon: "ni ni-circle-08 text-pink",
    layout: "/admin",
  },
  {
    path: "/equity-info",
    name: "Equity Information",
    icon: "ni ni-circle-08 text-pink",
    layout: "/admin",
  },
  {
    path: "/agent-select",
    name: "Agent Ownership",
    icon: "ni ni-circle-08 text-pink",
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Stats",
    icon: "ni ni-bullet-list-67 text-red",
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    layout: "/auth",
  },
  
];

// const getRoutes = () =>
// {
//   if (userSession != null || userSession != undefined)
//   {
//     if (userSession.isUserSignedIn())
//     {
//       return routesUser;
//     }
//     else
//     {
//       return routesGuest;
//     }
//   }
  
// };

const getRoutes = () =>
{
  if (userSession !== undefined)
  {
    if (userSession.isUserSignedIn())
    {
      return routesUser;
    }
    else
    {
      return routesGuest;
    }
  }

  return routesGuest;
  
};

export default getRoutes;
