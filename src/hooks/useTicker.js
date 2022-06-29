import { useEffect, useState } from "react"

function useTicker() {
    const [ticker, setTicker] = useState(0)

   //  this.setState({ ticker: 1 }) ---> setTicker(1)
    
    useEffect(() => {
      const intervalId = setInterval(() => {
        setTicker((t) => t + 1)
      }, 40)

      return () => clearInterval(intervalId)
    }, []) // onMount
  
    return ticker
  }

  export default useTicker