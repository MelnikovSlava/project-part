import * as React from 'react';

import './ErrorBoundary.less';


interface IErrorBoundaryProps {
  children: any;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component
  <IErrorBoundaryProps, IErrorBoundaryState> {

  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  public componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  public render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return (
      <>
        {children}
      </>
    );
  }
}

