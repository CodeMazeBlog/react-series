import * as actionTypes from './actionTypes';

const execute404Handler = (props) => {
    return {
        type: actionTypes.HTTP_404_ERROR,
        props: props
    }
}

const execute500Handler = (props) => {
    return {
        type: actionTypes.HTTP_500_ERROR,
        props: props
    }
}

const executeOtherErrorHandler = (error) => {
    return {
        type: actionTypes.HTTP_OTHER_ERROR,
        error: error
    }
}

export const handleHTTPError = (error, props) => {
    if (error.response.status === 404) {
        return execute404Handler(props);
    }
    else if (error.response.status === 500) {
        return execute500Handler(props);
    }
    else {
        return executeOtherErrorHandler(error);
    }
}

export const closeErrorModal = () => {
    return {
        type: actionTypes.CLOSE_ERROR_MODAL
    }
}