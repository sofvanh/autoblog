import { Outlet } from 'react-router-dom'
import TopBar from './components/TopBar'
import { UserProvider } from './components/UserContext'

export default function App() {
  return (
    <UserProvider>
      <div className="min-h-screen w-full">
        <TopBar />
        <div className="container mx-auto px-4 mt-8">
          <Outlet />
        </div>
      </div>
    </UserProvider>
  )
}