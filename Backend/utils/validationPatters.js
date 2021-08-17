module.exports = {

    validarNulo : async function (campo) {
        if (campo == '' || campo == null) {
            return true;
        } else {
            return false;
        }
    },

    patternString : async function (campo) {
        const patter = new RegExp(/^[A-Za-z\s]+$/); //Letras y espacios en blanco
        let estado = patter.test(campo) ? true : false;
        return estado
    },

    patternPassword : async function (campo) {
        const patter = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/); //Mayuscula, Minuscula y Numero
        let estado = patter.test(campo) ? true : false;
        return estado
    }


}


