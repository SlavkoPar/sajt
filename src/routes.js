import React from 'react';
import Loadable from 'react-loadable'


function Loading() {
  return <div>Loading...</div>;
}

const Home = Loadable({
  loader: () => import('./home/Home'),
  loading: Loading,
});

const CardGame = Loadable({
  loader: () => import('./cardgame/CardGame'),
  loading: Loading,
});

const LiveQuotes = Loadable({
  loader: () => import('./livequotes/LiveQuotes'),
  loading: Loading,
});


const routes = [
  { id: 1, path: '/', exact: true, name: 'Home', breadcrumb:'Home', component: Home, profile_pic:'assets/img/Home.jpg', status:'enabled' },
  { id: 2, path: '/cardgame', breadcrumb:'Card Game', name: 'Card Game', component: CardGame, profile_pic:'assets/img/CardGame.png', status:'enabled' },
  { id: 3, path: '/livequotes', breadcrumb:'Live Quotes', name: 'Live Quotes', component: LiveQuotes, profile_pic:'assets/img/LiveQuotes.png', status:'enabled' },
];

export default routes;
