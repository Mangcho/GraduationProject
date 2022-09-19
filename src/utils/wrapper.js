/*
Function to make router func to async style route func

*/

function wrapper(asyncFn){
    return (async (req, res, next) => {
      try {
        return await asyncFn(req, res, next);
      } catch (error) {
        return next(error);
      }
    });
  };

module.exports = wrapper;