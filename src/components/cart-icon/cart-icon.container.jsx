
import React from 'react';
//import { Mutation, Query } from 'react-apollo';
import { graphql } from 'react-apollo';
import {gql} from 'apollo-boost';
import { flowRight } from 'lodash';

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

// const CartIconContainer = () => (
//     <Query query={GET_CART_ITEM_COUNT}>
//     {
//         ({ data : {itemCount}}) => (<Mutation mutation={TOGGLE_CART_HIDDEN}>
//         {
//             toggleCartHidden => <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
//         }
//         </Mutation>)
//     }
//     </Query>
// );

// export default CartIconContainer;

//we can do the same thing using higher order compoenenst using compose and graphql
//compose was earlier provided by react-apollo which has been removed now but we can achieve the same using floatRight from lodash
//it is same as we use in redux
//we call all our query and mutations using graphql 
//for query, it returns as it used to return earlier in data object and then paramter
//whereas for mutations, it returns as in mutate param
//to change it, we have second argument where we can give various configurations
//one such configuartion is name where we can give the specific name we want
//and then we will get the reponse of these calls as props like we used to get in redux

const CartIconContainer = ({ data : { itemCount }, toggleCartHidden }) => (
    <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
);

export default flowRight(
    graphql(GET_CART_ITEM_COUNT),
    graphql(TOGGLE_CART_HIDDEN, { name : 'toggleCartHidden' })
)(CartIconContainer);

