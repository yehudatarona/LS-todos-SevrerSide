const mongoose = require('mongoose');
const Joi = require("@hapi/joi")

let todosSchema = new mongoose.Schema({
    todo_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 99
    },
    items: [
        {
            item_name: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 99
            },
            created_at: { type: Date, required: true, default: Date.now },
            updated_at: { type: Date, required: true, default: Date.now },
            completed: { type: Boolean,required:true,default:false}
            // completed: { type: Boolean}
        }
    ],
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
})

exports.todosModel = mongoose.model("listodos", todosSchema);

const validTodo = (_todo) => {

    let JoiSchema = Joi.object({
        id: Joi.string(),
        todo_name: Joi.string().min(2).max(99).required(),
        items: Joi.array().items(Joi.object({
            item_name: Joi.string().min(2).max(99),
            completed: Joi.boolean(),
        }))
    })

    return JoiSchema.validate(_todo);
}

exports.validTodo = validTodo;


