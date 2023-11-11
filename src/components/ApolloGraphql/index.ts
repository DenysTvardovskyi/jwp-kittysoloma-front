import {ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink, ApolloLink} from '@apollo/client';

const httpLink = new HttpLink({
    uri: "https://p2gzwutmec.eu-central-1.awsapprunner.com/graphql/",
});

export const client = new ApolloClient({
    link: ApolloLink.from([httpLink]),
    cache: new InMemoryCache(),

});