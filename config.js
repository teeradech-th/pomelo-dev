import Confidence from 'confidence';

const criteria = {
  env: process.env.NODE_ENV,
};

const config = {
  $meta: 'Pomelo Technical Challenge',
  projectName: 'pomelo',
  port: {
    web: {
      $filter: 'env',
      test: 9090,
      $default: 3000,
    },
  },
};

const store = new Confidence.Store(config);

const get = (key) => {
  return store.get(key, criteria);
};

const meta = (key) => {
  return store.meta(key, criteria);
};

export default { get, meta };
