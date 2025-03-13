import pkg from 'validator';
const {isEmpty} = pkg;

const validateUser = (params) => {

    let validateName = isEmpty(params.name);
    let validateLastname = isEmpty(params.lastname);
    let validateEmail = isEmpty(params.email);
    let validatePassword = isEmpty(params.password);

    if(validateName || validateLastname || validateEmail || validatePassword){
        throw new Error("wrong data");
    }
}


export default validateUser;