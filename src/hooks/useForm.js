import { useRef, useState } from 'react'
import { validate, submitForm, FormConfigError } from '../lib/forms.js'

/**
 * Shared form state machine: idle → submitting → success | error | unconfigured.
 * `honeypot` is a hidden field; bots that fill it are silently dropped client-side
 * and rejected server-side as well.
 */
export function useForm({ formType, initial, rules }) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const formRef = useRef(null)

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting') return
    const found = validate(values, rules)
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus('idle')
      const first = Object.keys(found)[0]
      formRef.current?.querySelector(`[name="${first}"]`)?.focus()
      return
    }
    if (values.company_website) {
      setStatus('error')
      setMessage('Your submission could not be processed.')
      return
    }
    setStatus('submitting')
    setMessage('')
    try {
      const { company_website, ...payload } = values // eslint-disable-line no-unused-vars
      await submitForm(formType, payload)
      setStatus('success')
    } catch (err) {
      setStatus(err instanceof FormConfigError ? 'unconfigured' : 'error')
      setMessage(err.message)
    }
  }

  const reset = () => {
    setValues(initial)
    setErrors({})
    setStatus('idle')
    setMessage('')
  }

  return { values, setValues, errors, status, message, onChange, onSubmit, reset, formRef }
}
