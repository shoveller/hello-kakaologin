import {useEffect, useState} from "react";

export default function Home() {
  const [version, setVersion] = useState('')
  useEffect(() => {
    setVersion(globalThis?.Kakao?.VERSION)
  }, [])

  return <span>isInitialized: {version}</span>
}
