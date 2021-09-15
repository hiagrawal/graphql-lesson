import {gql} from 'apollo-boost';

import { addItemToCart } from './cart.utils';

//extend means it will extend (modify) in the existing type Mutation that might exist
//If if does not exist then will create a new Mutation
//Here we are creating a ToggleCartHidden mutation that will return a boolean value

//so here we are extendng Item type which is already there on backend graphql server and adding the quantity type also which is of Integer
export const typeDefs = gql`
    extend type Item {
        quantity : Int
    }

    extend type Mutation{
        ToggleCartHidden: Boolean!,
        AddItemToCart(item : Item!) : [Item]!
    }
`;

//we use client directive to indicate that value we are querying for, it has look into local cache an dnot in backend
//so this is to query the cartHidden that we defined in index js file in our local
const GET_CART_HIDDEN = gql`
{
    cartHidden @client
}
`

const GET_CART_ITEMS = gql`
{
    cartItems @client
}
`

//inside resolvers, we write all the mutations or queries or additional types we might have at client side cache that apollo has access to
//this toggleCartHidden is the actual mutation definition while TogglecartHidden above was a type definition and type definition we write in capital
//mutation function gets 4 arguments: _root, _args, _context, _info
//_root has data of the highest level of root it might have
//_args are the actual arguments that get passed to mutation/query
//_context has object which has cache and client so we can destructure it
//_info has information of the query or mutation 
export const resolvers = {
    Mutation: {
        // toggleCartHidden: (_root, _args, _context, _info) => {
        toggleCartHidden: (_root, _args, {cache}) => {
            //so query will return the cartHidden value as an object in data so we can destructure the same and get cartHidden
            // const data = cache.readQuery({
            const {cartHidden} = cache.readQuery({
                query: GET_CART_HIDDEN
                //variables: {}
                //can give variables like this also, in case we had variables to pass on while querying
            });

            //so now we are writing the query to modify the data 
            //so query is same GET_CART_HIDDEN where we have cartHidden data
            //and in the data, we will modify the same
            //so it will update the local state cache cartHidden value to false on toggleCartHidden
            cache.writeQuery({
                query:GET_CART_HIDDEN,
                data: {cartHidden: !cartHidden}
            });

            //and now this toggleCartHidden also needs to return a boolean value so it will return the updated cartHidden value
            return !cartHidden;
        },

        addItemToCart : (_root, {item}, {cache}) => {
            const {cartItems} = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems  = addItemToCart(cartItems, item);

            cache.writeQuery({
                query:GET_CART_ITEMS,
                data: {cartItems: newCartItems}
            });
            
            return newCartItems;
        }
        
    }
}