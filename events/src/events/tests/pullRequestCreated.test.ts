import pullRequestCreated from '../pullRequestCreated';
import { pullRequestMock } from './pullRequestMock';

describe('PullRequestCreated events generator', () => {
  it('should detect pullRequest creating', (done) => {
    pullRequestCreated([], [pullRequestMock])
      .then(events => {
        expect(events).toEqual(
          [{ type: '[@pullRequestCreated]', data: { pullRequest: pullRequestMock } }],
        );
        done();
      });
  });
});
