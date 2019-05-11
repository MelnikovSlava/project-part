import * as urlParse from 'url-parse';


interface IDataFetch {
    baseURL: string;
    data: any;
    method: string;
    url: string;
}

export default function subscribeMockRequests(mockApi) {
    mockApi
        // .onGet(/\/store\/dapps\?page=\d+/).reply(getDappList)
        // .onGet(/\/store\/dapps\?str=/).reply(getSearchDapp)
        // .onGet(/\/store\/dapps\//).reply(getDapp)
        // .onGet(/\/store\/collections\/games/).reply(getCollection)
        // .onGet(/\/search\?q=/).reply(getSearchGlobal)
        // .onGet(/\/store\/dapps\?page=\d+&category=1/).reply(getDappList)
        // // .onAny('/dapps').reply(200, dapps.dappList)
        // .onGet(/\/dapps\/.{24}\/requests/).reply(getRequests)
        // .onPost(/\/dapps\/.{24}\/requests/).reply(getRequests)
        // .onAny(/\/dapps\/.{24}/).reply(200, currentDapp)
        // // .onAny('/dapps').reply(200, dappList)
        // .onAny('/dapps/add-to-dashboard').reply(addToDashboard)
        // .onAny('/store/references').reply(getRefs)
        // .onAny('/search').reply(searchNoAbi)
        // .onAny(/\/contracts_uis\/.{1}\/add-to-dashboard/).reply(searchResponseError)
        // .onAny('/dapps/create-from-abi').reply(searchResponseError)
        .onAny()
        .passThrough();
}

const getSearchDapp = (info: IDataFetch) => {
    const pageNumber: number = +info.url.slice(18, info.url.length);

    const response = {

    };

    return [200, response];
};

const getSearchGlobal = (info: IDataFetch) => {
    const response = {
        projects: projectListArr,
        dapps: dappListArr,
    };

    return [200, response];
};

const getRefs = () => {
    const response = {
        categories: [{
            id: 0,
            slug: 'games',
            name: 'Games',
        },
        {
            id: 1,
            slug: 'wallets',
            name: 'Wallets',
        }],
        platforms: [{
            id: 0,
            slug: 'web',
            name: 'Web',
        }, {
            id: 1,
            slug: 'android',
            name: 'Android',
        }],
        blockchains: [{
            id: 0,
            slug: 'eos',
            name: 'EOS',
        }, {
            id: 1,
            slug: 'ethereum',
            name: 'Ethereum',
        }],
    };

    return [200, response];
};
