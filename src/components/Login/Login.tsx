import React, { Component, FormEvent } from 'react';
import { Event } from '../../types';
import './Login.css';

type LoginProps = {
  setGiphyApiKey: (giphyApiKey: string) => void,
};

type LoginState = {
  giphyApiKey: string,
};

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      giphyApiKey: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e: Event) {
    return this.setState({ giphyApiKey: e.target.value })
  }

  handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { setGiphyApiKey } = this.props;
    const { giphyApiKey } = this.state;
    return setGiphyApiKey(giphyApiKey);
  }

  render() {
    const { giphyApiKey } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="login-bar"
          type="input"
          name="giphy-api-key"
          placeholder="Enter your Giphy API key..."
          value={giphyApiKey}
          onChange={this.onChange}
        />
        <input
          className="login-bar"
          type="submit"
          value="Set API key"
        />
      </form>
    );
  }
}

export default Login;
