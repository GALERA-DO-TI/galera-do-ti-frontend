import { useContext } from 'react';

import { ApplicationContext, ApplicationDispatchContext } from './Contexts';

export const useApplicationState = () => {
  const state = useContext(ApplicationContext);

  if (state === undefined) {
    throw new Error('useApplicationState must be used within a ApplicationProvider');
  }
  return state;
};

export const useApplicationDispatch = () => {
  const dispatch = useContext(ApplicationDispatchContext);

  if (dispatch === undefined) {
    throw new Error(
      'useApplicationDispatch must be used within a ApplicationDispatchProvider'
    );
  }
  return dispatch;
};