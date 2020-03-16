import { spawn } from 'child_process';

const timeout = 40000000;

/**
 * TODO: Почему-тот этот тест фэйлится через раз. Он хороший, но его нужно исправить
 */
describe.skip('events integration run test', () => {
  it('events should run with success message', async () => {
    jest.setTimeout(timeout);
    const promise = new Promise(((resolve, reject) => {
      const child = spawn('yarn', ['events']);

      setTimeout(() => {
        child.kill('SIGKILL');
        reject();
      }, timeout);

      child.stdout.on('data', (chunk) => {
        console.log(chunk.toString());
        if (chunk.toString() === '[@review/events] Listen port 3000\n') {
          child.kill('SIGKILL');
          resolve('ok');
        }
      });

      child.stdout.on('error', (chunk) => {
        console.log(chunk.toString());
      });

      child.on('close', (code) => {
        console.log(code);
      });
    }));

    const result = await promise;
    expect(result).toBe('ok')
  });
});
