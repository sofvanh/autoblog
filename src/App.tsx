import TopBar from './components/TopBar'
import { UserProvider } from './components/UserContext'
import MarkdownCustomizer from './components/MarkdownCustomizer'

export default function App() {
  return (
    <UserProvider>
      <div className="min-h-screen w-full">
        <TopBar />
        <div className="container mx-auto px-4 mt-8">
          <MarkdownCustomizer />
        </div>
      </div>
    </UserProvider>
  )
}