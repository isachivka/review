import { spawn } from 'child_process';

const timeout = 400000;

/**
 * TODO: Почему-тот этот тест фэйлится через раз. Он хороший, но его нужно исправить
 */
describe.skip('github-fetch integration test', () => {
  it('github-fetch should run with success message', async () => {
    jest.setTimeout(timeout);
    const promise = new Promise(((resolve, reject) => {
      const child = spawn('yarn', ['github-fetch']);

      setTimeout(() => {
        child.kill('SIGKILL');
        reject();
      }, timeout);

      child.stdout.on('data', (chunk) => {
        if (chunk.toString() === '[@review/github-fetch] Successfully started\n') {
          child.kill('SIGKILL');
          resolve('ok');
        }
      });

      child.on('close', () => {
        reject();
      });
    }));

    const result = await promise;
    expect(result).toBe('ok')
  });
});
