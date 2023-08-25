import {useCallback, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)
  const [isStreaming, setIsStreaming] = useState(false)
  const handleStream = useCallback(() => {
    setIsStreaming(true)
    fetchStream().then(() => setIsStreaming(false))
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <button onClick={handleStream} disabled={isStreaming}>
          Fetch stream
        </button>
      </div>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

function fetchStream(): Promise<void> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/stream')
      .then(response => {
        if (!response.body) throw new Error('no response.body')
        const reader = response.body.getReader()

        function read(): Promise<void> {
          return reader.read().then(({done, value}) => {
            if (done) {
              console.log('Stream complete')
              resolve()
              return
            }

            const chunk = new TextDecoder('utf-8').decode(value)
            console.log('Received data:', chunk)

            // Continue reading the stream
            return read()
          })
        }

        return read()
      })
      .catch(error => {
        console.error('Error occurred:', error)
        reject(error)
      })
  })
}
