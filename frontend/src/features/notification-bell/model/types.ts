import { SessionResponse } from "@/entities/session/api/getAnswerData";
import HistoryItem from "@/entities/notification/model/types";

export type State = {
    data: SessionResponse | null;
    loading: boolean;
    error: string | null;
    fatalError: boolean;
    history: HistoryItem[];
};

export type Action =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: SessionResponse }
    | { type: 'FETCH_ERROR'; payload: string }
    | { type: 'FATAL_ERROR'; payload: string }
    | { type: 'CLEAR_ALL' };