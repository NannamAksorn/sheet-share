import { combineReducers } from "redux";
import {
    SET_IS_MOBILE,
    FETCH_USER,
    FETCH_COURSE,
    SET_COURSE,
    SET_PROGRAM,
    SET_SEARCH
} from './actions';

function fetchUser(state = [], action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || null;
        default:
            return state;
    }
}
function fetchCourse(state = [], action) {
    switch (action.type) {
        case FETCH_COURSE:
            console.log('fetching courses')
            localStorage.setItem('courses', JSON.stringify(action.payload))
            return action.payload;
        case SET_COURSE:
            return action.payload
        default:
            return state;
    }
}
function isMobile(state = [], action) {
    switch (action.type) {
        case SET_IS_MOBILE:
            return action.isMobile
        default:
            return state
    }
}
function setProgram(state = [], action) {
    switch (action.type) {
        case SET_PROGRAM:
            return action.program
        default:
            return state
    }
}
function setSearch(state = [], action) {
    switch (action.type) {
        case SET_SEARCH:
            return action.search
        default:
            return state
    }
}
const myApp = combineReducers({
    isMobile,
    fetchUser,
    fetchCourse,
    setProgram,
    setSearch
})

export default myApp