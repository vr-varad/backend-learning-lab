const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync("todo.proto");

const todosProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const todos = [
  {
    id: 1,
    title: "Buy some milk",
    description: "Go to the store and buy some milk",
  },
  {
    id: 2,
    title: "Pick up the kids",
    description: "Pick up the kids from school at 3pm",
  },
  {
    id: 3,
    title: "Feed the dog",
    description: "Feed the dog at 7pm",
  },
];

server.addService(todosProto.TodoService.service, {
  getAllTodos: (call, callback) => {
    callback(null, {
        todos: todos,
    });
  },
  addTodo: (call, callback) => {
    const todo = call.request;
    todos.push(todo);
    callback(null, todo);
  },
  getTodo: (call, callback) => {
    const todo = todos.find((n) => n.id == call.request.id);
    if (todo) {
      callback(null, todo);
    } else {
      callback(
        {
          code: grpc.status.NOT_FOUND,
          details: "Not found",
        },
        null
      );
    }
  },
});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Server runninng");
    server.start(); 
  }
);
