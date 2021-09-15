
import React from 'react';
import { Query, Mutation } from 'react-apollo';
import {gql} from 'apollo-boost';

import CartDropdown from './cart-dropdown.component'

const TOGGLE_CART_HIDDEN = gql`
 mutation ToggleCartHidden {
    toggleCartHidden @client
 }
`;

const GET_CART_ITEMS = gql`
{
    cartItems @client
}
`;

//Here since we want both mutation and query, we can just wrap inside both.. order does not matter
//can wrap query inside mutation like we did or mutation inside query
const CartDropdownContainer = () => (
    <Mutation mutation={TOGGLE_CART_HIDDEN}>
       {
            toggleHidden => (
                <Query query={GET_CART_ITEMS}> 
                {
                    ({data}) => <CartDropdown toggleCartHidden = {toggleHidden} cartItems = {data.cartItems}/>
                }
                </Query>
            )
       } 
    </Mutation>
)

export default CartDropdownContainer;