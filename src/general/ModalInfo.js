import { useState } from "react";
import { Modal } from "react-bootstrap";
// font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalInfo = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <Modal show={props.show} onHide={props.modalState}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{props.modalMsg}</p>
        {props.dateInfo === true ? (
          <div>
            Ημερομηνία καταχώρησης:
            <p>
              {props.modalDate || null}/{props.modalMonth || null}/
              {props.modalYear || null}
            </p>
          </div>
        ) : null}
      </Modal.Body>

      <Modal.Footer>
        <button
          type="button"
          className={props.className}
          onClick={() => {
            props.modalState();
          }}
        >
          <FontAwesomeIcon icon={props.icon} /> Συνέχεια
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInfo;
