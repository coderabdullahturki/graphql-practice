const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { graphql } = require('@octokit/graphql');
const { request, gql } = require('graphql-request');

// Replace with your Shopify store's endpoint and storefront access token
const shopifyEndpoint = 'https://abostad.myshopify.com/api/2023-11/graphql.json';
const storefrontAccessToken = '670caf544b77d38eedae8180f2ca1a7c';

const query = gql`
  {
    shop {
      name
      primaryDomain {
        url
      }
      description
      currencyCode
    }
  }
`;

// Set up the GraphQL request headers
const headers = {
  'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
};

request(shopifyEndpoint, query, null, headers)
  .then(data => {
    const shop = data.shop;
    console.log('Shop Information:');
    console.log(`Name: ${shop.name}`);
    console.log(`Domain: ${shop.primaryDomain.url}`);
    console.log(`Description: ${shop.description}`);
    console.log(`Currency Code: ${shop.currencyCode}`);
  })
  .catch(error => {
    console.error('Error fetching data:', error.message || error);
  });