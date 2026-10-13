import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('UI error boundary caught an error', error, info?.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div role="alert" className="container-x py-24 text-center">
            <p className="font-display text-2xl font-semibold">Something went wrong.</p>
            <p className="mt-2 text-ink-2">Please refresh the page. If the problem continues, email rasheed@jixora.space.</p>
          </div>
        )
      )
    }
    return this.props.children
  }
}
