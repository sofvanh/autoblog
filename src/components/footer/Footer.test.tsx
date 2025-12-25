import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Footer from './Footer'

test('renders footer with links', () => {
  render(<Footer />)
  expect(screen.getByText('GitHub')).toBeDefined()
  expect(screen.getByText('Created by Sofia Vanhanen')).toBeDefined()
})

