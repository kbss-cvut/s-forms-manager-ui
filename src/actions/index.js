import { ADD_FETCHED_DATA, ADD_FAVORITE_TERM, REMOVE_FAVORITE_TERM } from './types.js';
import API from '../api'

export const addFavoriteTerm = (data) => {
    return {
      type: ADD_FAVORITE_TERM,
      payload: {
        name: data.name,
        description: data.description
      }
    }
};

export const removeFavoriteTerm = (name) => {
     return {
       type: REMOVE_FAVORITE_TERM,
       payload: {
         name
       }
     }
 }

export const fetchData = () => {
    return (dispatch) => {
        return API.get("/api/data.json")
            .then(response => {
            console.log(response)
                return response.data
            })
            .then(data => {
                dispatch({
                    type: ADD_FETCHED_DATA,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
