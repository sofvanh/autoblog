import { useEffect, useState } from 'react'
import { MarkdownRenderer } from './components/MarkdownRenderer'
import TopBar from './components/TopBar'
import { UserProvider } from './components/UserContext'

export default function App() {
  const [content, setContent] = useState('')

  useEffect(() => {
    // In a real app, you might want to use dynamic imports or fetch
    fetch('/src/content/hello.md')
      .then(res => res.text())
      .then(text => setContent(text))
  }, [])

  return (
    <UserProvider>
      <div className="min-h-screen w-full">
        <TopBar />
        <div className="container mx-auto px-4 mt-8">
          <MarkdownRenderer markdown={content} />
        </div>
      </div>
    </UserProvider>
  )
}