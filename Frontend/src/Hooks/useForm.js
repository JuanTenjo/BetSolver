import { useState } from 'react';
import { helpHttp } from '../Helpers/helpHttps';

const UseForm = (initialForm,validateForm) => {


    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    
    const handleChange = (e) => {
        const {name,value} = e.target; //Es otra forma de hacerlo
        setForm({
            ...form,
            [name]: value
        });
    }
    const handleBlur = (e) => {
        handleChange(e);
        setError(validateForm(form));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validateForm(form))


        //Se valida que el objeto error venga vacio
        if(Object.keys(error).length === 0){
            setLoading(true);
            helpHttp()
            .post("http://localhost:4000/login",{
                body: form,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
            .then((res) => {

                console.log(res);   
                setLoading(false);
                // setLoading(false);
                // setResponse(true);
                // setForm(initialForm);
                // setTimeout(() => {
                //     setResponse(false)
                // }, 3000);

             });

        }else{

            return;
        }


    }



    return { form, error, loading, response, handleChange,handleBlur,handleSubmit };
}
 
export default UseForm;