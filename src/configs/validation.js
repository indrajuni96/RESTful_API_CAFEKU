// Import 
const Joi = require('@hapi/joi')

// Schemas
module.exports = {
    user_register: Joi.object({
        username: Joi.string()
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .alphanum()
            .min(8)
            .required()
    }),
    user_login: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .alphanum()
            .min(8)
            .required()
    }),
    categories_add: Joi.object({
        name: Joi.string()
            .min(5)
            .required()
    }),
    categories_edit: Joi.object({
        name: Joi.string()
            .min(5)
            .required()
    }),
    product_add: Joi.object({
        name: Joi.string()
            .min(5)
            .required(),
        description: Joi.string()
            .min(5)
            .required(),
        category_id: Joi.number()
            .required(),
        price: Joi.number()
            .required(),
        qty: Joi.number()
            .required()
    }),
    product_edit: Joi.object({
        name: Joi.string()
            .min(5)
            .required(),
        description: Joi.string()
            .min(5)
            .required(),
        category_id: Joi.number()
            .required(),
        price: Joi.number()
            .required(),
        qty: Joi.number()
            .required()
    }),
    addQtyProduct: Joi.object({
        qty: Joi.number()
            .required()
    }),
    reduceQtyProduct: Joi.object({
        qty: Joi.number()
            .required()
    }),
    history_add: Joi.object({
        invoice: Joi.string()
            .alphanum()
            .required(),
        user: Joi.string()
            .required(),
        orders: Joi.string()
            .required(),
        price: Joi.number()
            .required(),
    })
}