import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import AuthContext from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Sidebar from '@/components/sidebar/Sidebar';
import ThemeSwitcher from '@/components/theme/theme';
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';

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
  const initials = getInitials(user);
  const avatarBgColor = getAvatarBackgroundColor(initials.charAt(0));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 shadow dark:shadow-white p-4 flex justify-between items-center dark:border-4 dark:border-b-indigo-500  border-4 border-b-indigo-500">
        <button
          className="lg:hidden text-gray-900 dark:text-gray-400 focus:outline-none mr-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <HiMenu size={24} />
        </button>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-400">LUKTON</div>

        {/* Avatar e Menu de Usuário */}
        <div className="relative flex items-center gap-4">
          <ThemeSwitcher />
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

            <DropdownMenuContent className="mt-2 bg-white darkbg-zinc-900 shadow-lg border rounded-md">
              <DropdownMenuItem asChild>
                <NavLink to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400">
                  Perfil
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400">
                  Configurações
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400">
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`lg:block ${sidebarOpen ? 'block' : 'hidden'} lg:w-64 w-full fixed lg:relative z-50`}>
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 dark:bg-black ml-0 transition-all duration-300 ease-in-out">
          <div className='bg-white p-4 rounded-xl dark:bg-zinc-900'>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-6">
              Bem-vindo ao Dashboard, {user?.firstName}!
            </h1>
            <Outlet /> {/* Outlet renderiza as páginas internas */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
