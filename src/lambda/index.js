import λ from 'apex.js';

import { verifyReleaseS3Event, getS3Params } from './events/release/s3';

export default λ((event, context, cb) => {
  return Promise.all(
    Array.from(event.Records).map(async (record) => {
      if (verifyReleaseS3Event(record)) {
        const s3Params = getS3Params(record);

        return s3Params;
      } else {
        return {};
      }
    })
  );
});

