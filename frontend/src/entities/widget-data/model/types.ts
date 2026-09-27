export interface TActivities {
    name : string
    type : number
    url: string
    details: any,
    state : any
    applicationId: string,
      timestamps: {
        start: Date,
        end: any | null
      },
      party: any,
      syncId: any,
      assets: any,
      flags: number,
      emoji: string | null,
      buttons: [],
      createdTimestamp: Date
}

export interface ICopyContext {
            subname: string,
    
            src: string ,
    
            id: string,
    
            name: string
    
            href: string,
    
            time: string,
    
            status : string ,
            activities :  | TActivities[]
}
export type CopyContextType = ICopyContext