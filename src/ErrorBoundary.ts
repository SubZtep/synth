import React, { Component } from "react"
// import PropTypes from "prop-types"

export default class ErrorBoundary extends Component {
  state = {
    error: "",
    errorInfo: "",
    hasError: false,
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.log({ error, errorInfo })
    alert(error)
    this.setState({ errorInfo })
  }
  render() {
    // next code block goes here
    return this.props.children
  }
}
// ErrorBoundary.propTypes = {
//   children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
// }
