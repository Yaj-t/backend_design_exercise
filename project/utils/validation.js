/**
 * Validate request data using Joi schema
 *
 * @param {Object} schema - Joi validation schema
 * @param {Object} data - Data to be validated (e.g., req.body)
 * @returns {Array|null} - Returns array of error messages if validation fails, otherwise null
 */
export const validateRequest = (schema, data) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
        return error.details.map(detail => detail.message);
    }
    return null; // No errors
};
