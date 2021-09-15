import React from 'react';
import { Route } from 'react-router-dom';

//import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import {default as CollectionsOverview} from '../../components/collections-overview/collections-overview.container';
//importing CollectionsOverviewContainer only as CollectionsOverview so we don't have to change our code

// import CollectionPage from '../collection/collection.component';
import {default as CollectionPage} from '../collection/collection.container';
//importing CollectionPageContainer only as CollectionPage so we don't have to change our code

const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;
