import Joi, { ValidationError } from "joi";

class MessageCustom{
    validate(error: ValidationError  ): string{
        return error.details.map(x => (x.message.replace(/['"]+/g, ''))).join(", ");
    }
}

export default new MessageCustom();