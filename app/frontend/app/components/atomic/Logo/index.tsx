import React from 'react'
import Image from 'next/image'
export default function Logo() {
  return (
    <Image
      src={'/logo/Logo_512w.png'}
      alt="Logo_512w"
      width={189}
      height={48}
    />
  )
}
