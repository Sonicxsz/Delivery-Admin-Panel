import { useEffect } from "react"

export class EventEmitter<T extends string> {
    events:Partial<Record<T, Function[]>> = {}

    emit (event:T, data?: any) {
        this.events[event]?.forEach(fn => fn(data))
    }

    private on (event: T, fn: Function){
        if (!this.events[event]) {
            this.events[event] = []
        }

        this.events[event].push(fn)

        return () => {
            this.events[event]!.filter(el => el !== fn)
        }
    }


    useEvent(event: T, fn: Function) {
        useEffect(() => {
            return this.on(event, fn)
        }, [])
    }
}


