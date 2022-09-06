import { useMemo } from 'react'

const patterns = {
  email:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i // eslint-disable-line no-useless-escape
}

// Create a test function based on a Regex Pattern
const createTestFromRegex = (pattern, required) => {
  return value => {
    if (required && !value) return false
    if (pattern) return pattern.test(value)

    // Return true if neight of the other conditions are met
    return true
  }
}

const formatRuleObject = ({ test, required, error, success, parentError }) => {
  const rule = {
    // Default Test case is a function that simply checks for validity
    test: value => (required ? !!value : true),
    required,
    error,
    success,
    parentError
  }

  // Check if a test function is provided
  if (test && typeof test === 'function') rule.test = test

  // Do a basic string test for common regex patterns
  if (typeof test === 'string')
    rule.test = createTestFromRegex(patterns[test], required)

  // Check if test is a regular expression
  if (test instanceof RegExp) rule.test = createTestFromRegex(test, required)

  // Once we have formed the test function return the formed object
  return rule
}

// Create Validation Rules Object
const createRules = rules => {
  let formattedRules = []

  // Check if rules is an array
  if (Array.isArray(rules))
    formattedRules = rules.map(rule => formatRuleObject(rule))
  // Check if rules is an object
  else if (typeof rules === 'object') formattedRules = [formatRuleObject(rules)]
  // Return Validation Object
  return {
    rules: formattedRules,
    test: value => {
      let valid = true
      const messages = formattedRules.map(rule => {
        valid = rule.test(value)

        // Callback for sending error data to parent component
        if (rule.parentError && typeof rule.parentError === 'function')
          rule.parentError(!valid)

        return valid
          ? rule.success && { type: 'success', message: rule.success }
          : { type: 'error', message: rule.error }
      })

      return { valid, messages }
    }
  }
}

export const useInputValidation = validation => {
  return useMemo(() => createRules(validation), [validation])
}
