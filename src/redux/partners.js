import * as ActionTypes from './ActionTypes';

export const Partners = (state = {isLoading: true, 
                                            errMess: null, 
                                            partners: [] }, action) => {
    switch (action.type) {

        case ActionTypes.ADD_PARTNERS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.PARTNERS_LOADING:
            return {...state, errMess: action.payload};

        case ActionTypes.PARTNERS_FAILED:
            const comment = action.payload;
            return {...state, comments: state.comments.concat(comment)};


        default:
          return state;
      }
};