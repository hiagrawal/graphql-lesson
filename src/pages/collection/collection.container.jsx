
import React from 'react';
import { Query } from 'react-apollo';
import {gql} from 'apollo-boost';

import CollectionPage from './collection.component';
import Spinner from '../../components/spinner/spinner.component';

//querying the data to graphql where it has a variable title whose value is $title 
//which is a string and this $title will hold the value that is being passed from Query variables object
const GET_COLLECTION_BY_TITLE = gql`
   query getCollectionsByTitle($title:String!){
        getCollectionsByTitle(title:$title){
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

//since it gets called from shop page where routing is defined, so it will have access to match, location, history as a prop
const CollectionPageContainer = ({match}) => (
    <Query query={GET_COLLECTION_BY_TITLE} variables={{title: match.params.collectionId}}>
       {
           ({loading, error, data}) => {
               console.log({error});
               console.log({data});
               if(loading) return <Spinner />
               return <CollectionPage collection = {data.getCollectionsByTitle} />
           }
       } 
    </Query>
)

export default CollectionPageContainer;

//created new collection page container to fetch the data from graphql using apollo 
//and passing that data to collection page instead of fetching from redux 
//and calling collection page container in shop page to load collection page first 
//which in turn call collection page component with the collection data