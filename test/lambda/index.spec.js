import LambdaTester from 'lambda-tester';
import handler from 'src/lambda';
import mockS3PutEvent from '../fixtures/events/s3.put.json';

describe('lambda', () => {
  test('it returns s3 params', () => {
    return LambdaTester(handler)
      .event(mockS3PutEvent)
      .expectResult((result) => {
        expect(result).toEqual([{}]);
      });
  });
});

