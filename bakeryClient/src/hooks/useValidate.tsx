import * as formService from "../services/formService";

interface RegexValidator<F>{
    [inputName: string]:{
        regex: RegExp
        message: string
    }
}

export default function useValidate<T, F>
    (setValidationErrors: React.Dispatch<React.SetStateAction<T>>,
        regexValidator: RegexValidator<F>) {

    function validate<T extends formService.InputElement>
        (e: React.FocusEvent<T, Element>) {

        if (e.target.value.length < 1) {
            setValidationErrors(errors => ({
                ...errors,
                [e.target.name]: {
                    error: true,
                    message: "Полето е задължително."
                }
            }))
            return;
        }

        if (regexValidator[e.target.name]
            .regex
            .test(e.target.value)) {
            setValidationErrors(errors => ({
                ...errors,
                [e.target.name]: {
                    error: false,
                    message: ""
                }
            }))
        }
        else {
            setValidationErrors(errors => ({
                ...errors,
                [e.target.name]: {
                    error: true,
                    message: regexValidator[e.target.name].message
                }
            }))
        }
    }

    return validate;
}