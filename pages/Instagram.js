import React, { Component } from "react";
import PropTypes from "prop-types"; // eslint-disable-line import/no-extraneous-dependencies
import openPopup from "./Popup";

function getQueryVariable(context, variable) {
  const query = context.location.search.substring(1);
  const vars = query.split("&");
  const code = vars
    .map((i) => {
      const pair = i.split("=");
      if (pair[0] === variable) {
        return pair[1];
      }

      return null;
    })
    .filter((d) => {
      if (d) {
        return true;
      }

      return false;
    });
    // console.log(code[0])
  return code[0];
}

class InstagramLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  componentDidMount() {
    this.checkInstagramAuthentication(window);
  }

  onBtnClick() {
    const { clientId, scope } = this.props;
    const redirectUri = this.props.redirectUri || window.location.href;
    const responseType = this.props.implicitAuth ? "code" : "token";
    const url = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    if (this.props.useRedirect) {
      window.location.href = url;
    } else {
      this.oAuthSignIn({ url });
    }
  }

  // eslint-disable-next-line consistent-return
  onCredentialsChanged(popup, resolve, reject) {
    if (!resolve) {
      return new Promise((res, rej) =>
        this.onCredentialsChanged(popup, res, rej)
      );
    }
    let isFinished;
    try {
      isFinished = this.checkInstagramAuthentication(popup);
    } catch (err) {
      // An exception is thrown when we try to access to another website's url
    }

    if (isFinished) {
      popup.close();
    } else if (popup.closed) {
      this.props.onFailure({
        error: "closed",
        error_reason: "oauth_canceled",
        error_description: "User canceled the authentication",
      });
    } else {
      setTimeout(() => this.onCredentialsChanged(popup, resolve, reject), 0);
    }
  }

  oAuthSignIn({ url, tab = false }) {
    const name = tab ? "_blank" : "instagram";
    const { width, height } = this.props;
    const popup = openPopup({ url, name, width, height });
    this.onCredentialsChanged(popup);
  }

  checkInstagramAuthentication(context) {
    if (!this.props.implicitAuth) {
      const matches = context.location.hash.match(/=(.*)/);
      if (matches) {
        this.props.onSuccess(matches[1]);
        return true;
      }
    } else if (context.location.search.includes("code")) {
      this.props.onSuccess(getQueryVariable(context, "code"));

      return true;
    } else if (context.location.search.includes("error")) {
      this.props.onFailure({
        error: getQueryVariable(context, "error"),
        error_reason: getQueryVariable(context, "error_reason"),
        error_description: getQueryVariable(context, "error_description"),
      });

      return true;
    }

    return false;
  }

  render() {
    const style = {
      display: "block",
      border: ".1rem solid transparent",
      borderRadius: 4,
      boxShadow: "inset 0 1px 0 0 transparent, 0 1px 0 0 rgb(22 29 37 / 5%), 0 0 0 0 transparent",
      color: "#ffffff",
      cursor: "pointer",
      fontSize: "1.5rem",
      overflow: "hidden",
      padding: ".7rem 1.6rem",
      userSelect: "none",
      fontWeight: 400,
  
      background:
        "rgb(0 128 96)",
      hover: {
        background: "rgb(0 110 82)",
      },
    };
    const { hover } = this.state;
    const { cssClass, buttonText, children, tag, type, render } = this.props;
    if (render) {
      return render({ onClick: this.onBtnClick });
    }
    const instagramLoginButton = React.createElement(
      tag,
      {
        className: cssClass,
        onClick: this.onBtnClick,
        onMouseEnter: () => {
          this.setState({ hover: true });
        },
        onMouseLeave: () => {
          this.setState({ hover: false });
        },
        style: cssClass ? {} : { ...style, ...(hover ? style.hover : null) },
        type,
      },
      children || buttonText
    );
    return instagramLoginButton;
  }
}
InstagramLogin.defaultProps = {
  buttonText: "Login with Instagram",
  scope: "instagram_graph_user_media",
  tag: "button",
  type: "button",
  implicitAuth: true,
  useRedirect: false,
  width: 400,
  height: 800,
};

InstagramLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  scope: PropTypes.string,
  cssClass: PropTypes.string,
  children: PropTypes.node,
  tag: PropTypes.string,
  redirectUri: PropTypes.string,
  type: PropTypes.string,
  implicitAuth: PropTypes.bool,
  useRedirect: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  render: PropTypes.func,
};

export default InstagramLogin;
