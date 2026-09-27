declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module '*.wav' {
  const src: string;
  export default src;
}

declare module '*.ogg' {
  const src: string;
  export default src;
}
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.img' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}

/// <reference types="next/client" />

interface ImportMetaEnv {
  readonly NEXT_MAIN_API_URL: string;
  readonly NEXT_BOT_API_URL: ImportMetaEnv;
  readonly NEXT_HISTORY_KEY: string
  readonly NEXT_HISTORY_LIMIT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
   readonly BASE_URL: string
}

declare namespace NodeJS {
   interface ProcessEnv {
    NEXT_MAIN_API_URL : string 
     NEXT_USER_ID :  string
     NEXT_HISTORY_KEY: string
     NEXT_HISTORY_LIMIT: string
}
}