import React, { ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  shouldHandleError: boolean;
}

// @see https://codepen.io/gaearon/pen/wqvxGa?editors=0110
// @see https://fe-developers.kakaoent.com/2022/221110-error-boundary/
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null, shouldHandleError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태 업데이트
    return {
      error,
      shouldHandleError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (!this.state.shouldHandleError) {
      return this.props.children;
    }

    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <button
            onClick={() => {
              this.setState({ shouldHandleError: false });
            }}
          >
            retry
          </button>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
