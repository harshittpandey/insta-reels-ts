import { useState } from "react"

type ObserverConfig = {
    rootElement?: HTMLElement
    rootMargin?: string
    threshold?: number | number[]
}

type ObserverCallback = (inView: IntersectionObserverEntry) => void

type ObserverProps = ObserverConfig & {
    notifyInview: ObserverCallback
}

export class IntersectionObserverHandler {
    rootElement?: ObserverConfig["rootElement"]
    rootMargin?: ObserverConfig["rootMargin"]
    threshold?: ObserverConfig["threshold"]
    inView: IntersectionObserverEntry | null
    observer: IntersectionObserver
    notifyInview: ObserverCallback
    
    constructor ({rootElement, rootMargin, threshold, notifyInview}: ObserverProps) {
        this.threshold = threshold
        this.rootElement = rootElement
        this.rootMargin = rootMargin
        this.observer = this.integrateIntersectionObserver()

        this.inView = null
        this.notifyInview = notifyInview
    }

    getConfig (): ObserverConfig {
        return {
            threshold: this.threshold,
            rootElement: this.rootElement,
            rootMargin: this.rootMargin
        }
    }

    integrateIntersectionObserver (): IntersectionObserver {
        return new window.IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => this.filterIntersectingEntry(entries),
            {  ...this.getConfig()  }
        )
    }

    filterIntersectingEntry (entries: IntersectionObserverEntry[] = []): void {
        const entry = entries.find(entry => entry.isIntersecting)
        if (entry) {
            this.inView = entry
            this.notifyInview(this.inView)
        }
    }

    observeNode (node: HTMLElement | null): void {
        node && this.observer.observe(node)
    }

    disconnectObserver (): void {
        this.observer.disconnect()
    }
}
