let defaultState = {
    user: null,
    isPreloader: false
}

 const userReducer = (state=defaultState , action) => {
    switch (action.type) {
        case "ADD_USER": {
            return {
                ...state,
                user: action.user,
            };
        }
        case "SET_PRELOADER": {
            return {
                ...state,
                isPreloader: action.isPreloader
            }
        }
        default:
            return {
                ...state
            }
    }
}

export const addUser = (user) => {
    return {
        type: 'ADD_USER',
        user: user
    }
}
export const setPreloader = (isPreloader) => {
    return {
        type: 'SET_PRELOADER',
        isPreloader: isPreloader
    }
}

export default userReducer;
