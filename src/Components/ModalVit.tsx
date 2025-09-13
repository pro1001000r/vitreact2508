import React, { FC, ReactNode, useState } from "react";
//import { Children } from "react";
import { Modal } from "react-bootstrap";

interface IProps {
  children:ReactNode
  show:boolean
  setShow(i:boolean):void
}

export default function ModalVit ({children, show, setShow}:IProps) {
  //const [show1, setShow1] = useState(false);

  //const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  //console.log('>>>>',new Date(),' >>>>:', props); //консоль
  //console.log(">>>>", new Date(), " >>>>:", props); //консоль
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Body>{children} </Modal.Body>
    </Modal>
  );
};

 
