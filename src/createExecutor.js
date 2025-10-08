import { execute as defaultExecute } from 'graphql';

export function createExecutor(gatewayExecutor, graphqlExecute) {
  // Use provided execute or fall back to imported one
  const executeFunction = graphqlExecute || defaultExecute;
  
  return function executor({
    schema,
    query,
    context,
    operationName,
    variables,
  }) {
    if (gatewayExecutor) {
      return gatewayExecutor({
        document: query,
        operationName,
        context,
        request: {
          query,
          operationName,
          variables,
        },
      });
    }

    return executeFunction({
      schema,
      document: query,
      rootValue: {},
      contextValue: context,
      variableValues: variables,
      operationName,
    });
  };
}
