import { useState, useEffect } from 'react';
import { Question } from '@prisma/client'

export default function Home() {
  const [data, setData] = useState<Question[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/question/9`)
      const json = await res.json()
      setData(json)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Question 9</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <div>{item.id}</div>
            <div>{item.text}</div>
          </li>

        ))}
      </ul>
    </div>
  )
}