import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { useSelector } from "react-redux";

const FeedbackModal = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const userRole =JSON.parse(localStorage.getItem("authUser"))?.response?.role || "super_admin";
  const [images, setImages] = useState([]);
  console.log(userRole);

  if (userRole === "super_admin") return null;

  return (
    <>
      <Button
        color="primary"
        className="position-fixed"
        style={{ right: "20px", bottom: "20px", zIndex: 1050 }}
        onClick={toggle}
      >
        Feedback
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Submit Feedback</ModalHeader>
        <ModalBody>
          <Form>

            <FormGroup>
                <Label for="feedbackType">Feedback Type</Label>
                <Input type="select" name="feedbackType" id="feedbackType">
                  <option>Feature Request</option>
                  <option>Bug Report</option>
                  <option>General Feedback</option>
                  <option>Other</option>
                </Input>
            </FormGroup>
            
            {/* snapshots and screenshots multiple */}
            <FormGroup>
                <Label for="file">Attach File</Label>
                {/* <Input type="file" name="file" id="file" multiple /> */}
                {/* apply type jpeg png and jpg */}
                {/* preview the images */}
                <Input type="file" name="file" id="file" multiple onChange={(e) => setImages([...e.target.files])} />

                <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mt-2 bg-info p-2">
                    {images.map((image, index) => (
                        <img key={index} src={URL.createObjectURL(image)} alt="preview" style={{ width: "auto", height: "200px" }} />
                    ))}
                </div>    

            </FormGroup>
            
            <FormGroup>
              <Label for="feedback">Your Feedback</Label>
              <Input
                type="textarea"
                name="feedback"
                id="feedback"
                rows="5"
                placeholder="Write your feedback here..."
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Submit
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default FeedbackModal;
