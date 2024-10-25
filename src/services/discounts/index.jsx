import http from '@/common/utils/axios';
import Paginator from '@/common/services/paginator';

export default {

    get(id, config) {
        return http.get(`/discounts/${id}`, config);
    },

    getAll(config) {
        config = config || {};
        return new Paginator({
            url: '/discounts',
            config: config,
            useCache:  typeof config.useCache === 'boolean' ? config.useCache : true,
        });
    },

    post(data, config) {
        return http.post('/discounts', data, config);
    },


    put(id, data, config) {
        return http.put(`/discounts/${id}/`, data, config);
    },

    patch(id, data, config) {
        return http.patch(`/discounts/${id}`, data, config);
    },

    delete(id, config) {
        return http.delete(`/discounts/${id}`, config);
    }

}
