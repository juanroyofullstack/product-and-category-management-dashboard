import { mockData } from './utils/mockData';

function isCode200() {
    return true;
}

export function getDashboardData() {
    return fetchMockData()
        .then((data: any) => { return data; })
        .catch(error => error.message);
}

function fetchMockData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isCode200()) {
                resolve(mockData);
            } else {
                reject('There was a problem with the server, please try again.');
            }
        }, 2000);
    });
}
