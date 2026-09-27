export default  interface HistoryItem {
    text: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: number;
}