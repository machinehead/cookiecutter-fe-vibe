import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '{{ cookiecutter.project_name }}',
  description: 'The wonderful {{ cookiecutter.project_name }}!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
