'use strict';

exports.index = {
  description: 'Challenge part 2',
  handler: (_request, h) => {
    return h.view('part2', {}, {});
  },
};
