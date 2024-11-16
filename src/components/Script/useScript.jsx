import { useEffect } from 'react'

const useScript = (url, selector = 'body', async = true, id = null) => {
    useEffect(() => {
        const element = document.querySelector(selector)
        const script = document.createElement('script')
        script.id = id
        script.src = url
        script.async = async
        element.appendChild(script)

        return () => {
            element.removeChild(script)
        }
    }, [url])
}

export default useScript