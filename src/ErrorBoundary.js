import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props); // we must run the base class's constructor first
    this.state = {
      hasError: false
    };
  }

  // This "magic" method is called when an error happens
  static getDerivedStateFromError(error) {
    // What I return here becomes the new state
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // We could call a logging service here
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops! Something broke. :(</h1>;
    }
    // Render the usual nested elements if there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;
