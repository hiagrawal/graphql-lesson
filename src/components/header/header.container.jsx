
import React from 'react';
import { Query } from 'react-apollo';
import {gql} from 'apollo-boost';

import Header from './header.component';

const GET_CART_HIDDEN = gql`
{
    cartHidden @client
}
`
//since now data is not fetching from backend, we do not need spinner or loading concept here
const HeaderContainer = () => (
    <Query query={GET_CART_HIDDEN}>
       {
           ({data}) => <Header hidden = {data.cartHidden} />
       } 
    </Query>
)

export default HeaderContainer;