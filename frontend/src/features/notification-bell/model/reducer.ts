import {type State } from './types'
import HistoryItem from '@/entities/notification/model/types';
import { Action } from './types';
import { ApiData } from '@/shared/config';

const {HISTORY_KEY ,  HISTORY_LIMIT } = ApiData


export const loadHistory = (): HistoryItem[] => {
    try {
        const raw = localStorage.getItem(HISTORY_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};
export const initialState: State = {
    data: null,
    loading: false,
    error: null,
    fatalError: false,
    history: loadHistory(),
};



export function notificationReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: state.data === null, error: null }; // Loading true только если нет старых данных (чтобы не моргало)

        case 'FETCH_SUCCESS': {
            const { session } = action.payload;
            const notification = session?.notification;
            let newHistory = state.history;

            // Защита от дубляжа: добавляем в историю, только если есть уведомление
            if (notification && session.status) {
                const alreadyExists = state.history.some(
                    (item) => item.createdAt === notification.createdAt
                );

                if (!alreadyExists) {
                    newHistory = [
                        {
                            text: notification.text,
                            status: session.status,
                            createdAt: notification.createdAt,
                        },
                        ...state.history,
                    ].slice(0, (Number(HISTORY_LIMIT)));
                }
            }

            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
                history: newHistory,
            };
        }

        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };

        case 'FATAL_ERROR':
            return { ...state, loading: false, error: action.payload, fatalError: true };

        case 'CLEAR_ALL':
            return { ...initialState, history: [] }; // Сбрасываем всё

        default:
            return state;
    }
}