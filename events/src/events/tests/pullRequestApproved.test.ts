import { pullRequestMock, pullRequestApprovedMock, pullRequestCommentedMock } from './pullRequestMock';
import pullRequestApproved from '../pullRequestApproved';

describe('PullRequestApproved events generator', () => {
  it('should detect create approved pr', (done) => {
    pullRequestApproved([], [pullRequestApprovedMock])
      .then((events) => {
        expect(events).toEqual(
          [{ type: '[@pullRequestApproved]', data: { pullRequest: pullRequestApprovedMock, by: 'login' } }],
        );
        done()
      })
  });

  it('should detect approve existing', (done) => {
    pullRequestApproved([pullRequestMock], [pullRequestApprovedMock])
      .then((events) => {
        expect(events).toEqual(
          [{ type: '[@pullRequestApproved]', data: { pullRequest: pullRequestApprovedMock, by: 'login' } }],
        );
        done()
      })
  });

  it('should not detect already approved pr', (done) => {
    pullRequestApproved([pullRequestApprovedMock], [pullRequestApprovedMock])
      .then((events) => {
        expect(events).toEqual(
          [],
        );
        done()
      })
  });

  it('should ', (done) => {
    pullRequestApproved([pullRequestCommentedMock], [pullRequestApprovedMock])
      .then((events) => {
        expect(events).toEqual(
          [{ type: '[@pullRequestApproved]', data: { pullRequest: pullRequestApprovedMock, by: 'login' } }],
        );
        done()
      })
  });
});
