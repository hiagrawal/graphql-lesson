
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
`
const CollectionsOverviewContainer = () => (
    <Query query={GET_COLLECTIONS}>
       {
           ({loading, error, data}) => {
               console.log({loading});
               console.log({error});
               console.log({data});
               if(loading) return <Spinner></Spinner>
               return <CollectionsOverview collections = {data.collections}></CollectionsOverview>

           }
       } 
    </Query>
)

export default CollectionsOverviewContainer;