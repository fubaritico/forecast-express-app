import { exitHandler } from './ExitHandler';
process.on('SIGTERM', () => {
    console.log(`Process ${process.pid} received SIGTERM: Exiting with code 0`);
    exitHandler.handleExit(0);
});

process.on('SIGINT', () => {
    console.log(`Process ${process.pid} received SIGINT: Exiting with code 0`);
    exitHandler.handleExit(0);
});
