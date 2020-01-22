import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';

const getDataSuccess = (data) => {
    return {
        type: actionTypes.GET_DATA_SUCCESS,
        data: data
    }
}

export const getData = (url, props) => {
    return (dispatch) => {
        axios.get(url)
        .then(response => {
            dispatch(getDataSuccess(response.data));
        })
        .catch(error => {
            //TODO: handle the error when implemented
        })
    }
}

const postDataSuccess = (response) => {
    return {
        type: actionTypes.POST_DATA_SUCCESS,
        response: response
    }
}

export const postData = (url, obj, props) => {
    return (dispatch) => {
        axios.post(url, obj)
        .then(response => {
            dispatch(postDataSuccess(response));
        })
        .catch(error => {
            //TODO: handle the error when implemented
        })
    }
}

const putDataSuccess = (response) => {
    return {
        type: actionTypes.PUT_DATA_SUCCESS,
        response: response
    }
}

export const putData = (url, obj, props) => {
    return (dispatch) => {
        axios.put(url, obj)
        .then(response => {
            dispatch(putDataSuccess(response));
        })
        .catch(error => {
            //TODO: handle the error when implemented
        })
    }
}

const deleteDataSuccess = (response) => {
    return {
        type: actionTypes.DELETE_DATA_SUCCESS,
        response: response
    }
}

export const deleteData = (url, props) => {
    return (dispatch) => {
        axios.delete(url)
        .then(response => {
            dispatch(deleteDataSuccess(response));
        })
        .catch(error => {
            //TODO: handle the error when implemented
        })
    }
}