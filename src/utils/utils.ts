export const Utils = {
  parseRequestURL: () => {
    const url = location.hash.slice(1).toLowerCase() || '/';

    const r = url.split('/');

    const request: { resource: string | null; id: string | null; verb: string | null } = {
      resource: null,
      id: null,
      verb: null,
    };

    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];

    return request;
  },

  sleep: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
};

export default Utils;
