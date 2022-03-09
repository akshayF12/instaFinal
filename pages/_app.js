import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "next/app";
import React,{useEffect} from 'react'
import { AppProvider } from "@shopify/polaris";
import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import { authenticatedFetch, getSessionToken } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../pages/Appstyle.css"
import NoteState from "./context/NoteState";
import { TitleBar, Button, Loading } from '@shopify/app-bridge/actions';
let loading = null;
function userLoggedInFetch(app) {
  loading = Loading.create(app);
  loading.dispatch(Loading.Action.START);
  const installationguide = Button.create(app, { label: 'Installation Guide' });
  const faq = Button.create(app, { label: 'Faq & Support' });
  const fetchFunction = authenticatedFetch(app);
  const redirect = Redirect.create(app);
  installationguide.subscribe('click', () => {
    redirect.dispatch(Redirect.Action.APP,  `/InstallationGuid`);
  });
  faq.subscribe('click', () => {
    redirect.dispatch(Redirect.Action.APP,  `/Faq`);
  });

  const titleBarOptions = {
    buttons: {
      secondary: [installationguide,faq],
    },
  };

  useEffect(() => {
    loading.dispatch(Loading.Action.STOP);
  }, []);
  
  const myTitleBar = TitleBar.create(app, titleBarOptions);
  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}

function MyProvider(props) {
  const app = useAppBridge();

  const client = new ApolloClient({
    fetch: userLoggedInFetch(app),
    fetchOptions: {
      credentials: "include",
    },
  });


  const axios_instance = axios.create();
  // Intercept all requests on this Axios instance
  axios_instance.interceptors.request.use(function (config) {
    return getSessionToken(app) // requires a Shopify App Bridge instance
      .then((token) => {
        // Append your request headers with an authenticated token
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      });
  });


  const Component = props.Component;

  return (
    <ApolloProvider client={client}>
      <Component {...props} axios_instance={axios_instance} />
    </ApolloProvider>
  );
}

class MyApp extends App {
  render() {
    const { Component, pageProps, host } = this.props;
    return (
      <AppProvider i18n={translations}>
        <Provider
          config={{
            apiKey: API_KEY,
            host: host,
            forceRedirect: true,
          }}
        >
          <NoteState>
            <MyProvider Component={Component} {...pageProps} />
          </NoteState>
         
        </Provider>
      </AppProvider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    host: ctx.query.host,
  };
};

export default MyApp;
