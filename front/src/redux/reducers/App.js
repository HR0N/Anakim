import {TEMPLATE_01, TEMPLATE_02, TEMPLATE_03} from "../actions/actionTypes";

const initialState = {
    data: [],
    loading: false,
    counter: 0,
    error: null,
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case TEMPLATE_01: return {...state, loading: true, counter: state.counter + 1};
        case TEMPLATE_02: return {...state, loading: false, data: action.data};
        case TEMPLATE_03: return {...state, loading: false, error: action.error};
        default: return state;
    }
}