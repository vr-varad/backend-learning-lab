const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync("todo.proto");

const todosProto = grpc.loadPackageDefinition(packageDefinition);

const client = new todosProto.TodoService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.getAllTodos({}, (err, response) => {
  if (!err) {
    console.log("Received from server: ", response);
    client.addTodo(
      {
        id: 4,
        title: "Learn gRPC",
        description: "Learn gRPC, the modern RPC framework",
      },
      (err, todos) => {
        if (!err) {
          console.log("Todo created successfully: ");
          client.getAllTodos({}, (err, response) => {
            if (!err) {
              console.log(response);
            } else {
              console.error(err);
            }
          });
        } else {
          console.error(err);
        }
      }
    );
  } else {
    console.error(err);
  }
});
