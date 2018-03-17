/**
 * Constructs an http error object.
 * @param code
 * @param message
 */
exports.HTTPError = function(code, message){
    this.status  = code;
    this.message = message;
};