import { useReducer, useEffect } from 'react';
import axios from 'axios';

// CORS issue: add before URL
// https://cors-anywhere.herokuapp.com/ 

const URL_API = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'; 

export default function useFetchData(params, page) {
  const [state, dispatch] = useReducer(reducer, {data: [], loading: true})

  useEffect(()=> {

    const cancelToken = axios.CancelToken.source();

    dispatch({type: actions.req})
    axios.get(URL_API, {
      cancelToken: cancelToken.token,
      params: { markdown: true, page: page, ...params }
    }).then(res => {
      dispatch({type: actions.get, payload: {data: res.data} }) 
    }).catch(e => {
      if (axios.isCancel(e)) return
      dispatch({type: actions.err, payload: {error: e} }) 
    })

    return () => {
      cancelToken.cancel();
    }
  }, [params, page])

  return state
}

const actions = {
  req: "Request Data",
  get: 'Get Data',
  err: 'Error'
}

function reducer(state, action) {
  switch (action.type) {
    case actions.req:
      return {loading: true, data:[] }
    case actions.get:
      return { ...state, loading: false, data: action.payload.data}
    case actions.err:
      return { ...state, loading: false, error: action.payload.error }
    default:
      return state
  }
}