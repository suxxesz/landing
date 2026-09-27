const ApiData: { 
    API_URL: string, 
    USER_ID: string,
    HISTORY_KEY: string , 
    HISTORY_LIMIT: string , 
} = {   
    API_URL: (import.meta as any).env.NEXT_MAIN_API_URL || '', 
    USER_ID: (import.meta as any).env.NEXT_USER_ID || '', 
    HISTORY_KEY: (import.meta as any).env.NEXT_HISTORY_KEY || '', 
    HISTORY_LIMIT: (import.meta as any).env.NEXT_HISTORY_LIMIT || '', 

} as const 

export default ApiData