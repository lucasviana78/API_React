import { useState, useEffect } from 'react'


export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [itemId, setItemId] = useState(null)

    // Config HTTP
    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            setMethod(method)
        } else if (method === "DELETE") {
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json"
                }
            });

            setMethod(method)
            setItemId(data)
        }
    }

    // Load data, refresh
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await fetch(url)
                const json = await res.json()
                setData(json)
            } catch (error) {
                setError("Houve erro no carregamento de dados!")
            }

            setLoading(false)
        }

        fetchData()
    }, [callFetch, method])


    // POST data
    useEffect(() => {

        const httpRequest = async () => {

            let json

            if (method === "POST") {
                let fetchOptions = [url, config]
                const res = await fetch(...fetchOptions)
                const json = await res.json()
            }
            else if (method === "DELETE") {

                const deleteUrl = `${url}/${itemId}`
                const res = await fetch(deleteUrl, config)
                const json = await res.json()
            }
            setCallFetch(json)
        };

        httpRequest()
    }, [config])

    return { data, httpConfig, loading, error };
}