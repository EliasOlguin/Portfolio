import { screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { renderIn } from '../test/render'
import { Contact } from './Contact'

test('the email address is visible as text, so it can be copied without a mail client', () => {
  renderIn(<Contact />)
  expect(screen.getByText('eliasolguinde@gmail.com')).toBeVisible()
})

test('states location and openness to remote work and relocation', () => {
  renderIn(<Contact />)
  expect(
    screen.getByText(
      'Currently in Cologne, Germany. Open to full-stack opportunities, remote work and relocation.',
    ),
  ).toBeInTheDocument()
})

test('the Rhine drawing behind the contact is decorative', () => {
  const { container } = renderIn(<Contact />)
  const river = container.querySelector('.contact__river')
  expect(river).toHaveAttribute('aria-hidden', 'true')
})
