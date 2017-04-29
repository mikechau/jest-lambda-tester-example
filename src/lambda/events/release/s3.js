const DEFAULT_S3_PARAMS = {
  s3: {
    bucket: {},
    object: {}
  }
};

export function verifyReleaseS3Event(record) {
  return (
    !!record.awsRegion &&
    !!record.s3 &&
    !!record.s3.bucket &&
    !!record.s3.bucket.name &&
    !!record.s3.object &&
    !!record.s3.object.key
  );
}

export function getProjectName(key) {
  return PROJECT_NAMES[key.split('/')[1]];
}

export function getFullVersion(key) {
  return key.split('/')[2].match(/_v(.*)-/)[1];
}

export function getVersionNumber(fullVersion) {
  return fullVersion.split('.').slice(0, 3).join('.');
}

export function getCommitHash(fullVersion) {
  return fullVersion.split('.').pop();
}

export function getReleaseName(key) {
  return key.split('/')[2].split('-').pop().split('.').shift();
}

export function getS3Url(region, bucket, key) {
  return `https://s3.dualstack.${region}.amazonaws.com/${bucket}/${key}`;
}

export function getS3Params(
  {
    awsRegion: region,
    s3: { bucket: { name: bucket }, object: { key } }
  } = DEFAULT_S3_PARAMS
) {
  const fullVersion = getFullVersion(key);
  const versionNumber = getVersionNumber(fullVersion);
  const commitHash = getCommitHash(fullVersion);
  const releaseName = getReleaseName(key);
  const s3Url = getS3Url(region, bucket, key);

  return {
    fullVersion,
    versionNumber,
    commitHash,
    releaseName,
    s3Url
  };
}

export default {
  verifyReleaseS3Event,
  getFullVersion,
  getVersionNumber,
  getCommitHash,
  getReleaseName,
  getS3Url,
  getS3Params
};
