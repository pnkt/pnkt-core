import { makeExecutableSchema } from 'graphql-tools';
import gql from 'graphql-tag';
import * as graphql from "graphql";

function sleep(t: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t);
  });
}

const typeDefs = gql`
type Query {
  primeNumber: Int,
}

type Subscription {
  twoTwice: Int,
}
`;

const resolvers = {
  Query: {
    primeNumber: () => 17,
  },

  Subscription: {
    twoTwice: {
      subscribe: async function* twoTwice() {
        yield { twoTwice: 2 };
        await sleep(1000);
        yield { twoTwice: 2 };
      },
    },
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

/**
 * Dummy test
 */
describe("Demo", () => {
  it("Can query locally", async () => {
    const query = gql`query getPrimeNumber {
      primeNumber
    }`;
    // const queryDocument = graphql.parse(query);
    const result: graphql.ExecutionResult = await graphql.execute({
      schema,
      document: query,
    });

    const primeNumber = result.data!.primeNumber;
    expect(primeNumber).toEqual(17);
  });

  it("Can handle subscriptions", async () => {
    const subscription = gql`subscription twoSub {
      twoTwice
    }`;
    // const subscriptionDocument = graphql.parse(subscription);
    const result = await graphql.subscribe({
      schema,
      document: subscription,
    });

    let timings = [];
    for await (let x of result) {
      timings.push(Date.now());
    }

    expect(timings.length).toEqual(2);
    expect(timings[1] - timings[0]).toBeGreaterThan(1000);
  });
})
