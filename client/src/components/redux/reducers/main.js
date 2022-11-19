import { getProductsReducers } from "./productreducer";

import {combineReducers} from "redux";

const rootreducers = combineReducers({
    getproductsdata : getProductsReducers
});

export default rootreducers;