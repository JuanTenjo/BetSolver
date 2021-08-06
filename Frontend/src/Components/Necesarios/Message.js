import React from 'react';

const Message = ({msg,bgColor}) => {
    let styles = {
        padding: "1rem",
        marginBotton: "1rem",
        textAling: "center",
        color: "#fff",
        fontWeight: "bold",
        backgroundColor: bgColor
    }
    return (
        <div style={styles}>
            {/* <p>{msg}</p> */}
            <p dangerouslySetInnerHTML={{__html:msg}} />
        </div>
    );
}

export default Message;
