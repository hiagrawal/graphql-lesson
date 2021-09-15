
import React from 'react';
import { Query } from 'react-apollo';
import {gql} from 'apollo-boost';

import CollectionsOverview from './collections-overview.component';
import Spinner from '../spinner/spinner.component';

//Now to make a query to graphql, we had client in index.js so we did client.query
//but here we do not have client
//so we will use Query component to query the data and it gives us back a function with the object 
//main properties in that object is loading, error, data so we have destructured it
//and using these properties, we can call our specific components

const GET_COLLECTIONS = gql`
{
    collections{
        id
        title
        items{
            id
            name
            price
            imageUrl
        }
    }
}
`;

const CollectionsOverviewContainer = () => (
    <Query query={GET_COLLECTIONS}>
       {
           ({loading, error, data}) => {
               console.log({loading});
               console.log({error});
               console.log({data});
               if(loading) return <Spinner />
               return <CollectionsOverview collections = {data.collections} />

           }
       } 
    </Query>
)

export default CollectionsOverviewContainer;

//created new collections container to fetch the data from graphql using apollo 
//and passing that data to collections component instaed of fetching from redux 
//and calling collections container in shop page to load collections container first which in turn call collections overview