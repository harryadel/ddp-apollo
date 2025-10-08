/* eslint-disable no-var, prefer-arrow-callback */
var packages = [
  'ecmascript',
  'promise',
  'webapp',
  'random',
];

Package.describe({
  name: 'orderlion:ddp-apollo',
  version: '5.0.0',
  summary: 'DDP link and server for Apollo',
  git: 'https://github.com/swydo/ddp-apollo',
  documentation: 'README.md',
});

Npm.depends({
  'meteor-apollo-link-ddp': '4.0.3',
});

// GraphQL and @graphql-tools packages are provided as peer dependencies
// from the main package.json to avoid "Cannot use GraphQLSchema from another module or realm" errors

Package.onUse(function use(api) {
  api.versionsFrom(['2.8.2', '3.0']);
  api.use(packages);
  api.mainModule('client.js', 'client', { lazy: true });
  api.mainModule('server.js', 'server');
});

Package.onTest(function test(api) {
  api.use(packages);

  api.use([
    'meteortesting:mocha',
    'accounts-base',
  ]);

  api.mainModule('specs/client.js', 'client');
  api.mainModule('specs/server.js', 'server');
});
