import React from "react";

const Message = ({ msg, bgColor }) => {
  let styles = {
    padding: "0.1rem",
    marginBotton: "0.3rem",
    color: "#fff",
    borderRadius: 8,
    fontWeight: "bold",
    backgroundColor: bgColor,
    textAling: "center",
  };

  return (
    <div style={styles}>
      <center>
        <p>{msg}</p>
      </center>
      {/*Esta linea de abajo es para aplicar diseño desde donde se llama el componente*/}
      {/* <p dangerouslySetInnerHTML={{__html:msg}} /> */}
    </div>
  );
};

export default Message;
