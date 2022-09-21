import * as actionTypes from '../consts/actionTypes';
import store from '../store';

export const loadCloudProviderActions = () => {
    const cloudProviderAPI = `https://api.aiven.io/v1/clouds`;
    return fetch(cloudProviderAPI)
    .then(async (response: any) => {
        const data = await response.json();
            store.dispatch({
                type: actionTypes.loadCloudProviderData,
                payload: data.clouds,
            });
        })
        .catch((error: string) => {
            store.dispatch({ type: actionTypes.loadCloudProviderData, payload: [] });
        });
};

