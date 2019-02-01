# PNKT
## Micro GraphQL endpoints

### Motivation

User Interface presents and manipulates data. Data can come from a backend,
a local database, a peer, a third-party service. It can come from a
thousand different places, but it's nature is always the same – it's just zeroes and ones. One special case is *structured data*: maps, lists, tuples etc.

PNKT is a thin layer of abstraction on top of GraphQL that unifies the way
applications work with structured data.

Two main principles behind PNKT:

1. Every data source is a GraphQL instance.

    * Backend server;
    * In-memory cache;
    * Local or remote database;
    * A peer in a p2p network;
    * Platform APIs e.g. Location API or Push Notifications API;
    * etc.

2. Instances are composable. One instance can query, subscribe and mutate
   data on other instances.

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!
