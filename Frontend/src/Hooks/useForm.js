import { useState } from "react";
// import Axios from "axios";
import Axios from 'axios';

const UseForm = (initialForm, validateForm) => {


  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [color, setColor] = useState(null);
  const [success, setSuccess] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target; //Es otra forma de hacerlo
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleBlur = (e) => {
    handleChange(e);
    setError(validateForm(form));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validateForm(form));

    //Se valida que el objeto error venga vacio
    if (Object.keys(error).length === 0) {

      

    } else {
      return;
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {

      setError(validateForm(form));

      if (Object.keys(error).length === 0) {
  
          const BaseUrl = "http://localhost:4000/auth/login";
  
          setLoading(true)
  
          const {data} = await Axios.post(BaseUrl,form);
              
          setLoading(false)
  
          if(data){
            if(data.rol === 3){

              window.localStorage.setItem("LoggedAppUser", JSON.stringify(data.token))
              
              setResponse(data.msg)
              setColor("#0CA842")
              setTimeout(() => {           
                setResponse(false)
                setSuccess(true)
              },1000)

              

            }else{
              setResponse("Lo siento pero no tiene permisos de administrador");
              setColor("#BF1010");
              setTimeout(() => {
                setResponse(false);
              }, 3000);
            }   
          }
        
      } else {
        return;
      }

    } catch (err) {
      if(err.response){
        window.localStorage.removeItem('LoggedAppUser')
        setResponse(err.response.data);
        setColor("#BF1010");
        setTimeout(() => {
          setResponse(false);
        }, 3000);
      }
    }


  };


  return {
    form,
    error,
    loading,
    response,
    color,
    success,
    handleChange,
    handleBlur,
    handleSubmit,
    handleSubmitLogin,   
  };
};

export default UseForm;
