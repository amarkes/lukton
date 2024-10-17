import React, { createContext, useState, useEffect } from 'react';
import api from '../common/utils/axios';
import { toast } from 'react-toastify';
import store from 'store';
import { useNavigate } from 'react-router-dom';
import Model from './model';

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const get = (id) => {
        try {
            return api.get(`${Model.api}/?${id}`);
        } catch (error) {
            toast.error(error);
            return;
        }
    }

    const getAll = (filters) => {
        try {
            const params = new URLSearchParams(filters).toString();
            return api.get(`${Model.api}?${params}`);
        } catch (error) {
            toast.error(error);
            return;
        }
    };

    return (
        <UsersContext.Provider value={{ users, setUsers, loading, setLoading, get, getAll }}>
            {children}
        </UsersContext.Provider>
    );
};

export default UsersContext;
