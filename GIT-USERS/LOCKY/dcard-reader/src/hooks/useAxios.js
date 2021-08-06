import { useCallback, useReducer } from 'react';
import axios from '../axios-instance';

const axiosReducer = (curState, action) => {
  switch (action.type) {
    case 'SEND':
      return { ...curState, isLoading: true, error: null, data: null };
    case 'RESPONSE':
      return {
        ...curState,
        isLoading: false,
        error: null,
        data: action.payload.data,
        hasMore: action.payload.hasMore,
      };
    case 'ERROR':
      return { ...curState, isLoading: false, error: action.payload };

    default:
      throw Error('should not be here');
  }
};

const useAxios = () => {
  const [axiosState, axiosDispatch] = useReducer(axiosReducer, {
    isLoading: true,
    error: null,
    hasMore: true,
    data: null,
  });

  const sendRequest = useCallback((url) => {
    axiosDispatch({ type: 'SEND' });
    axios
      .get(url)
      .then((res) => {
        const payload = {
          data: res.data,
          hasMore: res.data.length > 0,
        };

        axiosDispatch({ type: 'RESPONSE', payload });
      })
      .catch((err) => {
        axiosDispatch({ type: 'ERROR', payload: err.message });
      });
  }, []);

  return {
    isLoading: axiosState.isLoading,
    error: axiosState.error,
    hasMore: axiosState.hasMore,
    data: axiosState.data,
    sendRequest,
  };
};

export default useAxios;
