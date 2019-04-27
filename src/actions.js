import { db, authRef, provider } from "./components/Firebase"

export const SET_IS_MOBILE = 'SET_IS_MOBILE';
export const SIGN_IN = 'SIGN_IN'
export const FETCH_USER = 'FETCH_USER'
export const FETCH_COURSE = 'FETCH_COURSE'
export const SET_COURSE = 'SET_COURSE'
export const SET_PROGRAM = 'SET_PROGRAM'
export const SET_SEARCH = 'SET_SEARCH'

export const fetchUser = () => dispatch => {
    authRef.onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: FETCH_USER,
                payload: user
            });
        } else {
            dispatch({
                type: FETCH_USER,
                payload: null
            });
        }
    });
};
export function setProgram(program) {
    return { type: SET_PROGRAM, program}
}
export function setSearch(search) {
    return { type: SET_SEARCH, search}
}
export const setCourse = (courses) => dispatch => {
    if (courses) {
        dispatch({
            type: SET_COURSE,
            payload: courses
        })
    }
}

export const fetchCourse = () => dispatch => {
    db.collection("courses")
        .get()
        .then(querySnapshot => {
            let courses = []
            querySnapshot.forEach(function (docs) {
                courses.push(docs.data())
            });
            dispatch({
                type: FETCH_COURSE,
                payload: courses
            });
        })
        .catch(function (error) {
            console.log("error", error)
        })
};

export function setIsMobile(isMobile) {
    return { type: SET_IS_MOBILE, isMobile }
}

export const signIn = () => dispatch => {
    authRef
        .signInWithPopup(provider)
        .then(result => { console.log('signin suceed') })
        .catch(error => {
            console.log(error);
        });
};

export const signOut = () => dispatch => {
    authRef
        .signOut()
        .then(() => {
            console.log('signout sucee')
        })
        .catch(error => {
            console.log(error);
        });
};