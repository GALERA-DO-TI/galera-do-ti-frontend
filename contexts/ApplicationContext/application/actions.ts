import { IApplication } from "./interfaces";

import * as t from './types';

export const setSuccess = (success: boolean) => ({
    type: t.SUCCESS,
    payload: success,
});

export const setLoading = (loading: boolean) => ({
    type: t.LOADING,
    payload: loading,
});

export const setError = (error: boolean) => ({
    type: t.ERROR,
    payload: error,
});

export const setApplication = (application: IApplication) => ({
    type: t.APPLICATION,
    payload: application,
});