import pkg from 'validator';
const {isEmpty} = pkg;

const validateArticle = (params) => {

    let validateTitle = isEmpty(params.title);
    let validateContent = isEmpty(params.content);

    if(validateTitle || validateContent){
        throw new Error("wrong data!");
    }
}


export default validateArticle;