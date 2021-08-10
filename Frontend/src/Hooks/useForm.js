import { useState } from "react";
import { helpHttp } from "../Helpers/helpHttps";
// import Axios from "axios";
import { useHistory } from "react-router-dom";

const UseForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [color, setColor] = useState(null);
  let history = useHistory();

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
      setLoading(true);
      helpHttp()
        .post("http://localhost:4000/auth/login", {
          body: form,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setLoading(false);

          setTimeout(() => {        
            if (res.user.idRol === 3) {
                setResponse(false);
                history.push("/home");
              }
          }, 1000);
          
          setResponse(res.mensaje);
          res.user ? setColor("#198754") : setColor("#BA1D1D");
          setForm(initialForm);
          

        });
    } else {
      return;
    }
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     setError(validateForm(form));
  //     //Se valida que el objeto error venga vacio
  //     if (Object.keys(error).length === 0) {
  //       setLoading(true);

  //       Axios({
  //         method: "POST",
  //         data: form,
  //         withCredentials: true,
  //         url: "http://localhost:4000/auth/login",
  //       }).then((res) => {
  //         setLoading(false);
  //         setResponse(res.data);
  //         res.data.user ? setColor('#198754') : setColor('#BA1D1D');
  //         setForm(initialForm)
  //         setTimeout(() => {
  //           setResponse(false);
  //         }, 3000);
  //         history.push("/home");

  //       });
  //     }
  //   };

  return {
    form,
    error,
    loading,
    response,
    color,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export default UseForm;
