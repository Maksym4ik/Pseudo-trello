import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import ApiReducer from "./api-reducer";
import {reducer as formReducer } from 'redux-form'

//подключение редьюсеров
let reducers = combineReducers({
	api: ApiReducer,
	form: formReducer
});

//создание *STORE*
let store = createStore(reducers,applyMiddleware(thunkMiddleware));

export default store;
