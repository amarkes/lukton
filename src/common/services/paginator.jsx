import http from '@/common/utils/axios';

const memoryCache = new Map();

class RequestMade {
    constructor({ useCache } = {}) {
        this.requestsMade = new Map();
        this.useCache = useCache;
    }

    set(url, params, response) {
        const key = this._createKey(url, params);
        this.requestsMade.set(key, response);
        memoryCache.set(key, response);
    }

    get(url, params) {
        const key = this._createKey(url, params);
        return this.useCache && memoryCache.has(key) 
            ? memoryCache.get(key) 
            : this.requestsMade.get(key);
    }

    has(url, params) {
        const key = this._createKey(url, params);
        return this.useCache && memoryCache.has(key) || this.requestsMade.has(key);
    }

    _createKey(url, params) {
        return `${url} ${JSON.stringify(params)}`;
    }
}

export default class Paginator {
    constructor(config) {
        if (!config || !config.url) {
            throw new Error('É necessário especificar uma URL!');
        }

        this.config = {
            ...config,
            useCache: config.useCache === true,
            serializer: config.serializer || (data => Promise.resolve(data)),
            config: {
                params: { page: 1, ...config.config?.params },
                ...config.config
            }
        };

        this.requestsMade = new RequestMade({ useCache: this.config.useCache });
    }

    /**
     * Obtém a página atual.
     * @returns {Promise}
     */
    async getPage() {
        return await this._doRequest();
    }

    /**
     * Busca todas as páginas sequencialmente.
     * @param {Function} onPageLoad Callback para cada página carregada
     * @param {Function} onError Callback em caso de erro
     */
    async getAllPages(onPageLoad, onError = () => {}) {
        try {
            const res = await this.getPage();
            onPageLoad(res);

            while (this.hasNextPage()) {
                this.nextPage();
                const nextRes = await this.getPage();
                onPageLoad(nextRes);
            }
        } catch (error) {
            onError(error);
        }
    }

    /**
     * Busca todas as páginas sequencialmente e chama o callback ao final.
     * @param {Function} onComplete Callback com todos os dados carregados
     * @param {Function} onError Callback em caso de erro
     * @param {boolean} waitAll Se true, só chama o callback após todas as páginas
     */
    async getAllPagesWaitingAll(onComplete, onError = () => {}, waitAll = false) {
        const allData = [];

        try {
            let res = await this.getPage();
            allData.push(...res);

            while (this.hasNextPage()) {
                this.nextPage();
                res = await this.getPage();
                allData.push(...res);

                if (!waitAll) {
                    onComplete([...allData]);
                }
            }

            onComplete([...allData]);
        } catch (error) {
            onError(error);
        }
    }

    nextPage() {
        this.config.config.params.page += 1;
    }

    previousPage() {
        if (this.config.config.params.page > 1) {
            this.config.config.params.page -= 1;
        }
    }

    hasNextPage() {
        const res = this.requestsMade.get(this.config.url, this.config.config.params);
        return res ? Boolean(res.data.hasNextPage) : false;
    }

    async _doRequest() {
        const cachedResponse = this.requestsMade.get(this.config.url, this.config.config.params);
        if (cachedResponse) {
            return cachedResponse;
        }

        try {
            const res = await http.get(this.config.url, this.config.config);
            const serializedData = await this.config.serializer(res);
            this.requestsMade.set(this.config.url, this.config.config.params, serializedData);
            return serializedData;
        } catch (error) {
            throw new Error('Erro ao realizar a requisição: ' + error.message);
        }
    }
}
