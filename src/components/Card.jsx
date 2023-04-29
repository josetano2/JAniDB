
export default function Card({children, ...attr}){


    return <div {...attr}>{children}</div>
}

export function CardImage({src, ...attr}){
    return <img src={src} {...attr}/>
}

export function CardDetail({children, ...attr}){
    return <div>{children}</div>
}

export function CardBanner({src, ...attr}){
    return <img src={src} {...attr} />
}