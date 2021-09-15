
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import {gql} from 'apollo-boost';

import CartIcon from './cart-icon.component';

//this is a mutation query which is of type ToogleCartHidden and need to call toggleCartHidden mutation which is at client side
const TOGGLE_CART_HIDDEN = gql`
 mutation ToggleCartHidden {
    toggleCartHidden @client
 }
`;

const GET_CART_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`;

//calling the mutation query returns a function with the output that we can get in any paramter
//here we are giving toggleHidden so whatever toggleCartHidden mutation is returning, will get toggleHidden taht we are passing to CartIcon
// const CartIconContainer = () => (
//     <Mutation mutation={TOGGLE_CART_HIDDEN}>
//        {
//             toggleHidden => <CartIcon toggleCartHidden = {toggleHidden} />
//        } 
//     </Mutation>
// )

const CartIconContainer = () => (
    <Query query={GET_CART_ITEM_COUNT}>
    {
        ({ data : {itemCount}}) => (<Mutation mutation={TOGGLE_CART_HIDDEN}>
        {
            toggleCartHidden => <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
        }
        </Mutation>)
    }
    </Query>
);

export default CartIconContainer;