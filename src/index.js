import React from "react";
import ReactDOM from "react-dom";

class ClassComponent extends React.Component {
  render() {
    return <p>Class Component: {new Date().toISOString()}</p>;
  }
}

class PureClassComponent extends React.PureComponent {
  render() {
    return <p>Pure Class Component: {new Date().toISOString()}</p>;
  }
}

const FunctionComponent = () => {
  return <p>Function Component: {new Date().toISOString()}</p>;
};

const MemoizedFunctionComponent = React.memo(() => {
  return <p>Memoized Function Component: {new Date().toISOString()}</p>;
});

class App extends React.Component {
  state = {
    lastRender: new Date().toISOString()
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ lastRender: new Date().toISOString() });
    }, 200);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <p>App: {this.state.lastRender}</p>
        <ClassComponent />
        <PureClassComponent />
        <FunctionComponent />
        <MemoizedFunctionComponent />

        <p>
          The Class Component and the Function component are updated
          continuously. Whereas the Pure Class Component and Memoized Function
          component stay the same.
        </p>
        <p>
          This is because PureComponents or the memoized Function components are
          only re-rendered if their props or state (which isn't the case here).
        </p>
        <p>
          A pure component would only re-render if a new function identity is
          created. For exampple:
        </p>
        <p>
          {`class App extends React.Component {
  render() {
    return <MyComponent logger={(message) => console.log(message)} />;
  }
}`}
        </p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
