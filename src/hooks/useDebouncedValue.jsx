import { useState, useEffect } from 'react'

function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    // cada vez que `value` cambie, configuramos un timeout
    const handler = setTimeout(() => {
      setDebounced(value)
    }, delay)

    // si `value` cambia antes de que termine el timeout, lo limpiamos
    return () => clearTimeout(handler)
  }, [value, delay])

  return debounced
}

export default useDebouncedValue