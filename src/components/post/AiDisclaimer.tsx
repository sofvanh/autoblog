import { useState } from 'react'
import CloseButton from '../buttons/CloseButton'

export const AiDisclaimer = () => {
  const [isVisible, setIsVisible] = useState(() => {
    return localStorage.getItem('aiDisclaimerDismissed') !== 'true'
  })

  if (!isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('aiDisclaimerDismissed', 'true')
  }

  return (
    <div className="relative border border-rose-300 bg-rose-50 text-rose-700 p-4 pr-12 my-4 rounded flex justify-between items-center">
      <span>Please note that this text has been personalized by AI and might contain mistakes.</span>
      <CloseButton onClose={handleClose} className="btn-close-rose" />
    </div>
  )
}