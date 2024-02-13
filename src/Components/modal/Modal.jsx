import React from 'react'

const  Modal =  ({isOpen, onClose, children}) =>{
    if(!isOpen) return null;

    return(
        <div
        style={{
            position: "fixed",
                top: 0,
                left: 0,
                width: "120%",
                height: "100vh",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex:1000
        }}
        >
            <div
             style={{
                background: "white",
                overflowY:"auto",
                height:"90%",
                margin: "auto",
                marginTop:"2%",
                marginBottom:"10%",
                padding: "5%",
                paddingTop: "8%",
                border: "2px solid #000",
                borderRadius: "5px",
                boxShadow: "2px solid black",
                
            }}
            
        >  
              {children}
            </div>

        </div>
    );
};
  

export default Modal;