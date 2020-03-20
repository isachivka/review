import pullRequestCreated from '../pullRequestCreated';

describe('PullRequestCreated events generator', () => {
  it('should detect pullRequest creating', (done) => {
    const pullRequest = {
      permalink: '123',
      title: '',
      baseRefName: '',
      headRefName: '',
      createdAt: '',
      updatedAt: '',
      reviews: { nodes: [] },
    };

    pullRequestCreated([], [pullRequest])
      .then(events => {
        expect(events).toEqual(
          [{ type: '[@pullRequestCreated]', data: { pullRequest } }],
        );
        done();
      });
  });
});
