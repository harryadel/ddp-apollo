import { Meteor } from 'meteor/meteor';
import {
  DEFAULT_METHOD,
} from 'meteor-apollo-link-ddp';
import { initSchema } from './initSchema';
import { createExecutor } from './createExecutor';
import { createGraphQLMethod } from './createGraphQLMethod';
import { createGraphQLPublication } from './createGraphQLPublication';
import { setupHttpEndpoint } from './setupHttpEndpoint';

export async function setup({
  schema,
  gateway,
  method = DEFAULT_METHOD,
  publication,
  context,
  graphqlExecute,      // Optional: allows passing execute from app
  graphqlSubscribe,    // Optional: allows passing subscribe from app
} = {}) {
  const {
    schema: initializedSchema,
    executor: gatewayExecutor,
  } = await initSchema({
    schema,
    gateway,
  });

  Meteor.methods({
    [method]: createGraphQLMethod({
      schema: initializedSchema,
      execute: createExecutor(gatewayExecutor, graphqlExecute),
      context,
    }),
  });

  if (!gateway) {
    createGraphQLPublication({
      schema: initializedSchema,
      publication,
      context,
      graphqlSubscribe,
    });
  }
}

export {
  createGraphQLPublication,
  setupHttpEndpoint,
};
