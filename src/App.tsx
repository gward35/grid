import './App.css'
import { useState } from 'react'

const config = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
]
export interface ButtonProps {
  filled: boolean
  isDeactivating: boolean
  onClick: (x: any) => void
}

export const Button = ({ filled, isDeactivating, onClick }: ButtonProps) => {
  return (
    <button
      disabled={filled || isDeactivating}
      style={{
        backgroundColor: filled ? 'green' : 'white',
        border: '1px solid',
        borderRadius: 0,
        borderColor: '#fff',
        width: 'auto',
        height: 'auto',
        padding: '50px',
      }}
      onClick={onClick}
    />
  )
}

function App() {
  const [order, setOrder] = useState<number[]>([])
  const [isDeactivating, setIsDeactivating] = useState<boolean>(false)

  const deactivate = () => {
    setIsDeactivating(true)
    const timer = setInterval(() => {
      setOrder(prevState => {
        const newOrder = [...prevState]
        newOrder.pop()

        if (newOrder.length === 0) {
          clearInterval(timer)
          setIsDeactivating(false)
        }

        return newOrder
      })
    }, 500)
  }

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridGap: '15px',
        }}
      >
        {config.flat(1).map((c, i) =>
          c ? (
            <Button
              key={crypto.randomUUID()}
              isDeactivating={isDeactivating}
              filled={order.includes(i)}
              onClick={() => {
                const newOrder = [...order, i]
                setOrder(newOrder)

                if (newOrder.length === config.flat(1).filter(Boolean).length) {
                  deactivate()
                }
              }}
            />
          ) : (
            <span key={crypto.randomUUID()} />
          )
        )}
      </div>
      <p>{order.join(', ')}</p>
    </>
  )
}

export default App
