import Button from '@/shared/ui/Button'
import IUseCopy from '../model/types'
import  useCopySubname   from '../model/useCopySubname'
import {clsx} from 'clsx'

export function Subname(props : {
    subname : string
}) {

    const { subname } = props

    const {  copyOnClipboard , isCopied , copyInner , copyState , onMouseLeaveCopyState , countOfCopy} : IUseCopy = useCopySubname()

    return (
    <Button className={isCopied ? clsx("widget__subname" , countOfCopy > 9 ? 'shake' : 'is_copied') : "widget__subname"} 
    onClick={() => {copyOnClipboard(subname) ;  copyState }} 
    onPointerLeave={onMouseLeaveCopyState}>
            {subname}
            <div className="widget__subname__hint">{copyInner}</div>
    </Button>
    )
}