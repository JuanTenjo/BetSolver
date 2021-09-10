import { useState } from "react";
import { helpHttpAxios } from "../Helpers/helpHttpsAxios";
import Axios from 'axios';

const UseForm = (initialForm, validateForm) => {


  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [color, setColor] = useState(null);
  const [success, setSuccess] = useState(false);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,  //IMPORTATE: Esto hace: Coge lo que tenga inicial mente form, luego e.target.name hace referencia al name del imput que es igual a la llave del objeto form y le pasa el target.value dentro del setform para que lo actualice
    });
  };

  const handleBlur = (e) => {
    handleChange(e); //Lama a handleChange para guardar los cambios de form
    setError(validateForm(form));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    handleChange(e);

    setError(validateForm(form));

    //Se valida que el objeto error venga vacio
    if (Object.keys(error).length === 0) {

      setLoading(true);

      let config = {
        'data': form
      };

      const res = await helpHttpAxios().post(URL, config)

      setLoading(false);

      if (!res.err) {
        setResponse(res.message)
        setTimeout(() => {
          setResponse(false);
        }, 5000)
      } else {
        let errores = { 'errores': res.message }
        setError(errores);
        setTimeout(() => {
          setError(false);
        }, 9000)
      }

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

        const { data } = await Axios.post(BaseUrl, form);

        setLoading(false)

        if (data) {
          if (data.rol === 3) {

            window.localStorage.setItem("LoggedAppUser", JSON.stringify(data.token))

            setResponse(data.msg)
            setColor("#0CA842")
            setTimeout(() => {
              setResponse(false)
              setSuccess(true)
            }, 1000)



          } else {
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
      if (err.response) {
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
    setForm,
    error,
    setError,
    loading,
    response,
    color,
    success,
    handleChange,
    handleBlur,
    handleSubmit,
    handleSubmitLogin
  };
};

export default UseForm;
