export default  interface IUseCopy {
            isCopied : boolean,
            copyState ?: number
            countOfCopy : number,
            copyInner : string,
            copyOnClipboard : (text: string) => Promise<void>
            onMouseLeaveCopyState : () => void,
}