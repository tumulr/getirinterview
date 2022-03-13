import ExampleServer from './ExampleServer';

const exampleServer = new ExampleServer();
exampleServer.connect_to_DB();


exampleServer.start(3000);
