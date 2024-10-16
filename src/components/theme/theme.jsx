import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import store from 'store';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(store.get('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        store.set('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (

        <Button onClick={toggleTheme} variant="outline" size="icon" className="mr-2 bg-white dark:bg-slate-900">
            {theme === 'dark' ?
                <CiDark className="h-4 w-4" />
                : <MdDarkMode className="h-4 w-4" />}
        </Button>

    );
};

export default ThemeSwitcher;
