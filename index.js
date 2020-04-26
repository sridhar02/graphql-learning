const { GraphQLServer } = require("graphql-yoga");

const dinnerOptions = ["🍕", "🌭", "🍔", "🥗", "🍣"];

let count = 2;
let todos = [
  {
    id: "0",
    content: "Buy milk",
    isCompleted: true,
  },
  {
    id: "1",
    content: "Cook some lobster",
    isCompleted: false,
  },
];

// const typeDefs = `
//   type Query {
//   }
// hello(name: String): String!
// `
const typeDefs = `
  type Todo {
    id: ID!,
    content:String!
    isCompleted:String!
  }
  type Query {
    allTodos:[Todo]!
    Todo(id:ID):Todo!
    whatsForDinner: String!
  }
  type Mutation {
    createTodo(content: String!, isCompleted: Boolean!): Todo!
    updateTodo(id: ID!, content: String, isCompleted: Boolean): Todo!
    deleteTodo(id: ID!): Todo!
  }
`;

const resolvers = {
  // Query: {
  // hello: (_, { name }) => `Hello ${name || 'World'}`,
  // },
  Query: {
    Todo: (_, { id }) => {
      const todo = todos.find((X) => X.id === id);
      if (!todo) {
        throw new Error("Cannot find your todo");
      }
      return todo;
    },
    allTodos: () => {
      return todos;
    },
    Mutation: {
      createTodo: (_, { content, isCompleted }) => {
        const newTodo = {
          id: count++,
          content,
          isCompleted,
        };
        todos = [...todos, newTodo];
        return newTodo;
      },
      updateTodo: (_, { id, content, isCompleted }) => {
        let updateTodo;
        todos = todos.map((todo) => {
          if (todo.id === id) {
            updatedTodo = {
              id: todo.id,
              // for content and isCompleted, we first check if values are provided
              content: content !== undefined ? content : todo.content,
              isCompleted:
                isCompleted !== undefined ? isCompleted : todo.isCompleted,
            };
            return updateTodo;
          } else {
            return todo;
          }
        });
      },
      deleteTodo: (_, { id }) => {
        const todoToDelete = todos.find((x) => x.id === id);

        todos = todos.filter((todo) => {
          return todo.id !== todoToDelete.id;
        });

        return todoToDelete;
      },
    }, 
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log("Server is running on localhost:4000"));
