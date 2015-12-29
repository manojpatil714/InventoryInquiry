/**
 * Define utility functions here
 *
 * **/

/**
 * Util method to handle HTTP request error
 * @param req - HTTP request object.
 * @param res - HTTP response object.
 * @param err - Error object.

 */
function handleRequest(req, res, err)
{
	res.end("Error been thrown from " + req.url + " and "+ err);
}

module.exports.handleRequest = handleRequest;