import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { FaProductHunt } from "react-icons/fa";
import { AiOutlineDown } from "react-icons/ai";
import { Link } from 'react-router-dom';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

// Lista do menu
const menu = [
  {
    name: 'Profile',
    icon: <CgProfile />,
    route: '/dashboard/profile'
  },
  {
    name: 'Settings',
    icon: <CiSettings />,
    route: '',
    subMenu: [
      {
        name: 'General',
        icon: <CgProfile />,
        route: '/dashboard/settings/general'
      },
      {
        name: 'Security',
        icon: <CgProfile />,
        route: '/dashboard/settings/security'
      }
    ]
  },
  {
    name: 'Products',
    icon: <FaProductHunt />,
    route: '',
    subMenu: [
      {
        name: 'Detail',
        icon: <FaProductHunt />,
        route: '/dashboard/products/detail'
      },
      {
        name: 'View',
        icon: <FaProductHunt />,
        route: '/dashboard/products/view'
      }
    ]
  }
];

// Função para mapear a primeira letra para uma cor
const getAvatarBackgroundColor = (initial) => {
  const colors = [
    'bg-red-300', 'bg-green-300', 'bg-blue-300', 'bg-yellow-300',
    'bg-purple-300', 'bg-pink-300', 'bg-teal-300', 'bg-indigo-300'
  ];
  const index = initial.charCodeAt(0) % colors.length;
  return `${colors[index]} border-2`;
};

// Função para obter as iniciais do nome e sobrenome
const getInitials = (name) => {
  if (!name) return 'NN'; // Se não tiver nome, retorna "NN"
  const { firstName, lastName } = name;
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();
};

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [openSubMenus, setOpenSubMenus] = useState([]); // Lista de submenus abertos

  const initials = getInitials(user);
  const avatarBgColor = getAvatarBackgroundColor(initials.charAt(0));

  // Verifica se a rota atual corresponde a um item do submenu e mantém aberto
  // useEffect(() => {
  //   setOpenSubMenus((prev) => {
  //     const newOpenSubMenus = [...prev];
  //     menu.forEach((menuItem, index) => {
  //       if (menuItem.subMenu) {
  //         menuItem.subMenu.forEach((subItem) => {
  //           if (location.pathname.startsWith(subItem.route) && !newOpenSubMenus.includes(index)) {
  //             newOpenSubMenus.push(index);
  //           }
  //         });
  //       }
  //     });
  //     return newOpenSubMenus;
  //   });
  // }, [location]);

  const toggleSubMenu = (menuIndex) => {

    console.log(openSubMenus.includes(menuIndex))
    if (openSubMenus.includes(menuIndex)) {
      setOpenSubMenus(openSubMenus.filter((index) => index !== menuIndex)); // Fecha o submenu
    } else {
      setOpenSubMenus([...openSubMenus, menuIndex]); // Abre o submenu
    }
    // setOpenSubMenus((prev) => {
    //   if (prev.includes(menuIndex)) {
    //     return prev.filter((index) => index !== menuIndex); // Fecha o submenu
    //   } else {
    //     return [...prev, menuIndex]; // Abre o submenu
    //   }
    // });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-900">Meu Dashboard</div>

        {/* Avatar e Menu de Usuário */}
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className={avatarBgColor}>
                <AvatarImage
                  src={user?.avatarUrl || ''}
                  alt="Avatar"
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mt-2 bg-white shadow-lg border rounded-md">
              <DropdownMenuItem asChild>
                <NavLink to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700">
                  Perfil
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700">
                  Configurações
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700">
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white text-gray-600 flex flex-col">
          <div className="px-6 py-4">
            <div className="text-2xl font-bold">Dashboard</div>
          </div>
          <nav className="mt-6 flex-1 mx-4">
            <ul>
              {menu.map((menuItem, index) => (
                <li key={index}>
                  {menuItem.subMenu ? (
                    <div>
                      <button
                        className={`flex justify-between items-center block py-2.5 px-4 rounded-md w-full text-left transition-all hover:bg-gray-100`}
                        onClick={() => toggleSubMenu(index)}
                      >
                        <span className="flex gap-2 items-center">
                          {menuItem.icon}
                          {menuItem.name}
                        </span>
                        {/* Seta para baixo */}
                        <AiOutlineDown className={`transition-transform duration-200 ${openSubMenus.includes(index) ? 'rotate-180' : 'rotate-0'}`} />
                      </button>
                      <div className={`transition-all duration-200 ease-in-out ${openSubMenus.includes(index) ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                        <ul className="pl-4">
                          {menuItem.subMenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link to={subItem.route} className="flex gap-2 items-center block py-2.5 px-4 rounded-md hover:bg-gray-100">{subItem.icon}
                                {subItem.name}</Link>
                              {/* <NavLink
                                to={subItem.route}
                                className={({ isActive }) =>
                                  isActive
                                    ? 'flex gap-2 items-center block py-2.5 px-4 rounded-md bg-gray-200 text-gray-900'
                                    : 'flex gap-2 items-center block py-2.5 px-4 rounded-md hover:bg-gray-100'
                                }
                                onClick={(e) => e.stopPropagation()}
                                replace
                              >
                                {subItem.icon}
                                {subItem.name}
                              </NavLink> */}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={menuItem.route}
                      className={({ isActive }) =>
                        isActive
                          ? 'flex gap-2 justify-start items-center block py-2.5 px-4 rounded-md bg-gray-200 text-gray-900'
                          : 'flex gap-2 justify-start items-center block py-2.5 px-4 rounded-md hover:bg-gray-100'
                      }
                      replace
                    >
                      {menuItem.icon}
                      {menuItem.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
            <NavigationMenu orientation="vertical">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Item one</NavigationMenuTrigger>
                  <NavigationMenuContent>Item one content</NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Item two</NavigationMenuTrigger>
                  <NavigationMenuContent>Item Two content</NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          <div className="p-4">
            <Button onClick={logout} className="w-full">
              Logout
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Bem-vindo ao Dashboard, {user?.firstName}!
          </h1>
          <Outlet /> {/* Outlet renderiza as páginas internas */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;