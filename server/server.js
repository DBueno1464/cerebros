const express = require("express");
const path = require("path");
// require our token authentication
const { authMiddleware } = require("./utils/auth");
// Import the ApolloServer class
const { ApolloServer } = require("apollo-server-express");
const db = require("./config/connection");

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require("./schemas");

const PORT = process.env.PORT || 3001;
const app = express();

// Create a new instance of an Apollo server with the GraphQL schema
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
});

// Update Express.js to use Apollo server features
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// render our main html page
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
});
