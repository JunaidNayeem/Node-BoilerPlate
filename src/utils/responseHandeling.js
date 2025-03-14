/***
 * Reponse Handler 
 * It helps in handeling success and failure responses with standardised response management
 * 
 * @param {boolean} success     - The first parameter handles if it's a success response or a failure
 * @param {string} message      - The second parameter is a response message managed in constant files for string management
 * @param {response} response   - The third parameter is a response to send json response of API
 * @param {json} data           - The forth parameter contains the json data which will be send in response
 */

module.exports = responseHandeling = (success, message, response, data) => {
    try {
        if(success) return response.json({success, ...data, message})
        else return response.json({success, message})
    } catch (error) {
        return response.json({success, error})
    }
}