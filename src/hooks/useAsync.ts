import {SetStateAction, useCallback, useEffect, useState} from "react"

type Func = (...params: any) => Promise<SetStateAction<any>>

export function useAsync(func: Func, dependencies:any[] = []) {
    const { execute, ...state } = useAsyncInternal(func, dependencies, true)

    useEffect(() => {
        execute()
    }, [execute])

    return state
}

export function useAsyncFn(func: Func, dependencies = []) {
    return useAsyncInternal(func, dependencies, false)
}

function useAsyncInternal(func: Func, dependencies: any[], initialLoading = false) {
    const [loading, setLoading] = useState(initialLoading)
    const [error, setError] = useState()
    const [value, setValue] = useState()

    const execute = useCallback((...params: any) => {
        setLoading(true)
        return func(...params)
            .then(data => {
                setValue(data)
                setError(undefined)
                return data
            })
            .catch(error => {
                setError(error)
                setValue(undefined)
                return Promise.reject(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, dependencies)

    return { loading, error, value, execute }
}