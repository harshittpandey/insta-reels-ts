import {useState, useRef, useEffect} from 'react'

interface IntersectHandlerProps {
    root?: HTMLElement | null
    rootMargin?: string
    threshold?: number | number[]
}

interface IntersectHandlerReturns {
    entries: IntersectionObserverEntry[]
    entry: IntersectionObserverEntry
    setNode: Function
}

// not suitable for multiple nodes
export const IntersectHandler = (
        {root = null, rootMargin, threshold = 0}: IntersectHandlerProps
    ): IntersectHandlerReturns => {
    const [entries, updateEntry] = useState<IntersectionObserverEntry[]>([])
    const [node, setNode] = useState<HTMLElement | null>(null)

    const observer = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new window.IntersectionObserver(
            (entries) => updateEntry(entries),
            {
                root,
                rootMargin,
                threshold
            }
        )
        const {current: currentObserver} = observer
        
        if (node) currentObserver.observe(node)
        
        return () => currentObserver.disconnect()
    }, [node])

    return {
        entry: entries[0], entries, setNode
    }
}