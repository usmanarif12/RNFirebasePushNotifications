import React from 'react';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

const user = ( state = [] , action ) => {
    switch(action.type) {
        case 'ADD_USER_DETAIL':
            return[
                    ...state,
                    {
                    userId: action.userId,
                    fullname: action.fullname,
                    email: action.email,
                    password: action.password
                    }
                ]
            
        default:
            return state;
    }
};


const reducers = combineReducers({
    user: user,
    form: formReducer
});

export default reducers;