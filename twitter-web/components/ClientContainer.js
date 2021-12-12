import { useEffect, useState } from "react"

export default function ClientContainer({ children, ...delegated }) {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if (!hasMounted) {
        return null
    }

    return <div {...delegated}>{children}</div>
}