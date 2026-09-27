'use client'

import { useEffect, useReducer, useCallback, useRef } from 'react';
import { useSetAtom } from 'jotai';

import {
    getSessionData,
    SessionNotFoundError,
} from '@/entities/session/api/getAnswerData';
import { sessionIdAtom } from '@/entities/session/model//atom';
import HistoryItem from '@/entities/notification/model/types';
import { notificationReducer , initialState  } from './reducer';
import { ApiData } from '@/shared/config';

const {HISTORY_KEY} = ApiData


const saveHistory = (items: HistoryItem[]) => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
};


export const useNotification = (sessionId: string | null) => {
    const [state, dispatch] = useReducer(notificationReducer, initialState);
    const setSessionId = useSetAtom(sessionIdAtom);
    

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    useEffect(() => {
        saveHistory(state.history);
    }, [state.history]);

    const fetchData = useCallback(async () => {
        if (!sessionId) return;

        dispatch({ type: 'FETCH_START' });

        try {
            const result = await getSessionData(sessionId);
            dispatch({ type: 'FETCH_SUCCESS', payload: result });
        } catch (err) {
            if (err instanceof SessionNotFoundError) {
                dispatch({ type: 'FATAL_ERROR', payload: err.message });
                setSessionId(null); 
            } else {
                dispatch({
                    type: 'FETCH_ERROR',
                    payload: err instanceof Error ? err.message : 'Unknown error',
                });
            }
        }
    }, [sessionId, setSessionId]);

    // Эффект поллинга
    useEffect(() => {
        if (!sessionId || state.fatalError) {
            return;
        }

        fetchData();

        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [sessionId, fetchData, state.fatalError]);

    const clearHistory = useCallback(() => {
        dispatch({ type: 'CLEAR_ALL' });
        setSessionId(null);
    }, [setSessionId]);

    return {
        data: state.data,
        loading: state.loading,
        error: state.error,
        history: state.history,
        refresh: fetchData,
        clearHistory,
        setSessionId,
    };
};