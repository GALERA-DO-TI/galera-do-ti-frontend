import { InitialStateProps } from "./interfaces";
import * as t from "./types";

type IReducer = {
  type: string;
  payload: any;
};

export const initialState: InitialStateProps = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  application: null,
};

// eslint-disable-next-line default-param-last
export function reducer(state = initialState, { type, payload }: IReducer) {
  switch (type) {
    case t.LOADING:
      return { ...state, isLoading: payload };
    case t.ERROR:
      return { ...state, isError: payload };
    case t.SUCCESS:
      return { ...state, isSuccess: payload };
    case t.APPLICATION:
      return { ...state, application: payload };
    default:
      return state;
  }
}
