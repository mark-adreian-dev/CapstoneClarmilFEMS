import { useEffect } from "react"
import { api } from "./utils/api"

function App() {

  const sendRequest = async () => {
    const response = await api.get("")
    const data = response.data

    console.log(data)
  }

  useEffect(() => {
    sendRequest()
  }, [])

  return (
    <>
      Hello World
    </>
  )
}

export default App
