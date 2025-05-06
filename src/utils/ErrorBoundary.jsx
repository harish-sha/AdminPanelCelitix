import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error captured:", error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  renderDevErrorDetails() {
    if (process.env.NODE_ENV !== "development") {
      return null; 
    }

    return (
      <div className="text-left bg-gray-50 p-4 rounded-md mt-4 w-full overflow-x-auto">
        <h3 className="font-semibold text-lg mb-2">Error Details:</h3>
        <pre className="text-sm text-red-600">
          {this.state.error && this.state.error.toString()}
        </pre>
        <h3 className="font-semibold text-lg mt-4 mb-2">Stack Trace:</h3>
        <pre className="text-sm text-gray-700">
          {this.state.errorInfo && this.state.errorInfo.componentStack}
        </pre>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen overflow-scroll flex justify-center items-center bg-gray-100 text-gray-800 p-8 box-border text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full flex flex-col items-center h-[80vh]">
            <h1 className="text-4xl font-bold mb-4 text-red-500">
              Oops! Something went wrong.
            </h1>
            <p className="text-lg mb-6 text-gray-600">
              We encountered an issue while loading this page. Please try again
              later or contact support.
            </p>

            {this.renderDevErrorDetails()}

            <button
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg text-lg transition-all"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
