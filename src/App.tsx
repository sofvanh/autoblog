import { useEffect, useState } from 'react'
import { MarkdownRenderer } from './components/MarkdownRenderer'

function App() {
  const [content, setContent] = useState('')

  useEffect(() => {
    // In a real app, you might want to use dynamic imports or fetch
    fetch('/src/content/hello.md')
      .then(res => res.text())
      .then(text => setContent(text))
  }, [])

  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto px-4">
        <MarkdownRenderer markdown={content} />
      </div>
    </div>
  )
}

export default App