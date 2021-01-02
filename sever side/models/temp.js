{
   
    "todo_name" : "todos shopping list",
    "items" : [ 
        {
            "id" : "389",
            "item_name" : "homework",
            "created_at" : "26/12/2020",
            "completed" : "false"
        }, 
        {
            "id" : "123",
            "item_name" : "computer programing",
            "created_at" : "26/12/2020",
            "completed" : "true"
        }
    ],
    "created_at" : "26/12/2020",
    "updated_at" : "27/12/2020"
}


const validTask = (_task) => {

    let JoiSchema = Joi.object({
      id:Joi.string(),
      name:Joi.string().min(2).max(99).required(),
      category:Joi.string().min(2).max(99).required()
     
    })
  
    return JoiSchema.validate(_task);
  }
  
  exports.validTask = validTask;

  const Joi = require('joi');

let schema = Joi.object().keys({
            items: Joi.array().items(
                Joi.object({
                    item_id: Joi.number().required(),
                    item_qty: Joi.number().required(),
                    item_type_id: Joi.number().required(),
                    item_qty: Joi.number().required(),
                    base_price: Joi.number().required(),
                    actual_price: Joi.number().required(),
                })
            ).required(),
        });

        let errors = Joi.validate(req.body, schema);