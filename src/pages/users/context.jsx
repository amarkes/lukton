import React, { createContext, useState, useEffect } from 'react';
import api from '@/common/utils/axios';
import { toast } from 'react-toastify';
import store from 'store';
import { useNavigate } from 'react-router-dom';
import Model from './model';
import Paginator from '@/common/services/paginator';



const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const get = async (id) => {
        if (!id) {
            toast.error('ID é obrigatório.');
            return null;
        }
        try {
            return await api.get(`${Model.api}/${id}`);
        } catch (error) {
            toast.error(error.message);
            return null;
        }
    }


    const getAll = (config) => {
        try {
            config = config || {};
            return new Paginator({
                url: `${Model.api}`,
                config: config,
                useCache: typeof config.useCache === 'boolean' ? config.useCache : true,
            });

        } catch (error) {
            toast.error(error);
            return;
        }
    };

    const postServices = (data, config) => {
        return api.post(`${Model.apiAdd}`, data, config);
    };


    const putServices = (id, data, config) => {
        return api.put(`${Model.api}/${id}/`, data, config);
    };

    const patchServices = (id, data, config) => {
        return api.patch(`${Model.api}/${id}`, data, config);
    };

    const deleteServices = (id, config) => {
        return api.delete(`${Model.api}/${id}`, config);
    };

    return (
        <ServicesContext.Provider value={{ list, setList, loading, setLoading, get, getAll, postServices, putServices, patchServices, deleteServices }}>
            {children}
        </ServicesContext.Provider>
    );
};

export default ServicesContext;
