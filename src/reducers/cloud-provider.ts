import * as actionTypes from '../consts/actionTypes';
import { ICloudList } from "../interfaces/ICloudLists";

interface ICloudData {
    clouds: ICloudList[];
}

export const initialState: ICloudData = {
    clouds: []
};

const companyOverviewPage = (
    state: ICloudData = initialState,
    action: { type: string; payload: ICloudList; },
) => {
    switch (action.type) {
        case actionTypes.loadCloudProviderData:
            return { ...state, clouds: action.payload };
        default:
            return state;
    }
}

export default companyOverviewPage;
