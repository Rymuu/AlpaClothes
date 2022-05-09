import React from "react";

const Modal = (props) => {
  return (
    <>
      {props.isActive ? (
        <>
          <div className="overlay" onClick={props.closefunction}></div>
          <div className="modal">
            <div className="modal__header">
              <div className="close__cross" onClick={props.closefunction}>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="modal__title">
              <h2>{props.title}</h2>
            </div>
            <div className="modal__content">{props.children}</div>
            <div className="modal__actions">
                {props.isInfo ? (
                    <>
                    <button
                className="btn btn__color-white"
                onClick={props.closefunction}
              >
                Annuler
              </button>
              <button
                className="btn btn__color-black"
                onClick={props.validateFunction}
              >
                Valider
              </button>
                    </>
                ) : ("")}
              
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Modal;