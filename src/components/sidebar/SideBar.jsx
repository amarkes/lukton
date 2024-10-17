import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '@/context/AuthContext';
import { Link } from 'react-router-dom';

import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { FaProductHunt } from "react-icons/fa";
import { AiOutlineDown } from "react-icons/ai";

import { Button } from '@/components/ui/button';

import { NavLink, useLocation } from 'react-router-dom';
// Lista do menu
const menu = [
  {
    name: 'Profile',
    icon: <CgProfile />,
    route: '/dashboard/profile'
  },
  {
    name: 'Users',
    icon: <CgProfile />,
    route: '/dashboard/users/list'
  },
 
  // {
  //   name: 'Settings',
  //   icon: <CiSettings />,
  //   route: '',
  //   subMenu: [
  //     {
  //       name: 'General',
  //       icon: <CgProfile />,
  //       route: '/dashboard/settings/general'
  //     },
  //     {
  //       name: 'Security',
  //       icon: <CgProfile />,
  //       route: '/dashboard/settings/security'
  //     }
  //   ]
  // },
  // {
  //   name: 'Products',
  //   icon: <FaProductHunt />,
  //   route: '',
  //   subMenu: [
  //     {
  //       name: 'Detail',
  //       icon: <FaProductHunt />,
  //       route: '/dashboard/products/detail'
  //     },
  //     {
  //       name: 'View',
  //       icon: <FaProductHunt />,
  //       route: '/dashboard/products/view'
  //     }
  //   ]
  // }
];

const DashboardMenu = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [openSubMenus, setOpenSubMenus] = useState(() => {
    // Recupera o estado do localStorage
    const savedState = localStorage.getItem('openSubMenus');
    return savedState ? JSON.parse(savedState) : [];
  });

  const toggleSubMenu = (menuIndex) => {
    setOpenSubMenus((prev) => {
      const updatedMenus = prev.includes(menuIndex)
        ? prev.filter((index) => index !== menuIndex) // Fecha o submenu
        : [...prev, menuIndex]; // Abre o submenu

      // Salva o estado atualizado no localStorage
      localStorage.setItem('openSubMenus', JSON.stringify(updatedMenus));
      return updatedMenus;
    });
  };

  // Verifica se a rota atual corresponde a um item do submenu e mantém aberto
  useEffect(() => {
    setOpenSubMenus((prev) => {
      const newOpenSubMenus = [...prev];
      menu.forEach((menuItem, index) => {
        if (menuItem.subMenu) {
          menuItem.subMenu.forEach((subItem) => {
            if (location.pathname.startsWith(subItem.route) && !newOpenSubMenus.includes(index)) {
              newOpenSubMenus.push(index);
            }
          });
        }
      });
      return newOpenSubMenus;
    });
  }, [location]);

  const isSubMenuActive = (subMenu) => {
    return subMenu.some((subItem) => location.pathname.startsWith(subItem.route));
  };

  return (
    <aside className="h-full w-64 bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-400 flex flex-col">
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
                    className={`${isSubMenuActive(menuItem.subMenu) ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-300' : ''} flex justify-between items-center block py-2.5 px-4 rounded-md w-full text-left transition-all hover:bg-gray-100`}
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
                          {/* <Link to={subItem.route} className={
                            location.pathname.startsWith(subItem.route)
                            ? 'flex gap-2 items-center block py-2.5 px-4 rounded-md bg-gray-200 text-gray-900'
                            : 'flex gap-2 items-center block py-2.5 px-4 rounded-md hover:bg-gray-100'
                          }>{subItem.icon}
                                {subItem.name}</Link> */}
                          <NavLink
                            to={subItem.route}
                            className={({ isActive }) =>
                              isActive
                                ? 'flex gap-2 items-center block py-2.5 px-4 rounded-md bg-gray-200 text-gray-900 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300'
                                : 'flex gap-2 items-center block py-2.5 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-gray-400 dark:hover:text-gray-200'
                            }
                            onClick={(e) => e.stopPropagation()}
                            replace
                          >
                            {subItem.icon}
                            {subItem.name}
                          </NavLink>
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
                      ? 'flex gap-2 justify-start items-center block py-2.5 px-4 rounded-md bg-gray-200 text-gray-900 dark:text-gray-400'
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

      </nav>
      <div className="p-4">
        <Button onClick={logout} className="w-full">
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default DashboardMenu;
