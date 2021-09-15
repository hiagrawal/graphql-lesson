
import React from 'react';
import { Mutation } from 'react-apollo';
import {gql} from 'apollo-boost';

import CollectionItem from './collection-item.component'

const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item: Item!) {
        addItemToCart(item: $item) @client
    } 
`;

//Here since we want both mutation and query, we can just wrap inside both.. order does not matter
//can wrap query inside mutation like we did or mutation inside query
const CollectionItemContainer = (props) => (
    <Mutation mutation={ADD_ITEM_TO_CART}>
       {
            addItemToCart => <CollectionItem  {...props} addItem= {item => addItemToCart({variables: {item}})}/>
       } 
    </Mutation>
)

export default CollectionItemContainer;