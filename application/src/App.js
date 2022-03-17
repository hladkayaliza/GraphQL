import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './components/theme';
import  { ApolloProvider, InMemoryCache } from '@apollo/client';
import Tabs from './components/tabs/tabs';
import { ApolloClient } from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:3005/graphql',
    cache: new InMemoryCache()
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
            <ThemeProvider theme={theme} >
            <Tabs />
            </ThemeProvider>
            </ApolloProvider>
    );
    }
}

export default App;
