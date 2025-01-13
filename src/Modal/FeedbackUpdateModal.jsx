import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { toast } from "react-toastify"; 
import { getFeedbackById ,updateFeedback  } from "../apiServices/service";

const FeedbackUpdateModal = ({ feedbackId, isOpen, toggle, onUpdateSuccess }) => {
  const [feedback, setFeedback] = useState({
    feedbackType: "",
    message: "",
    status: "",
    images: [],
  });
  const [updatedStatus, setUpdatedStatus] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      if (feedbackId) {
        try {
          const response = await getFeedbackById(feedbackId);
          setFeedback(response.data);  
          setUpdatedStatus(response.data.status);  
        } catch (error) {
          console.error("Error fetching feedback", error);
          toast.error("Error fetching feedback");
        }
      }
    };
    fetchFeedback();
  }, [feedbackId]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedFeedbackData = { 
      ...feedback, 
      status: updatedStatus || feedback.status,
    };

    try {
      const response = await updateFeedback(feedbackId, updatedFeedbackData);
      if (response.message === "FeedBack updated successfully") {
        toast.success("Feedback updated successfully!");
        onUpdateSuccess();
        toggle(); 
      }
    } catch (error) {
      console.error("Error updating feedback", error);
      toast.error("Error updating feedback");
    }
  };


  
  const handleStatusChange = (e) => {
    setUpdatedStatus(e.target.value);
  };


  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Feedback</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="feedbackType">Feedback Type</Label>
            <Input
              type="text"
              name="feedbackType"
              id="feedbackType"
              value={feedback.feedbackType}
              disabled
            />
          </FormGroup>

          <FormGroup>
            <Label for="message">Feedback Message</Label>
            <Input
              type="textarea"
              name="message"
              id="message"
              rows="5"
              value={feedback.message}
            />
          </FormGroup>

          <FormGroup>
            <Label for="status">Status</Label>
            <Input
              type="select"
              name="status"
            //   id="status"
              value={updatedStatus || feedback.status}
              onChange={handleStatusChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="images">Attached Images</Label>
            <div className="d-flex flex-wrap">
              {feedback.feedbackImage?.map((image, index) => (
                <img
                  key={index}
                  src={image}  
                  alt={`feedback-image-${index}`}
                  style={{ width: "100px", height: "100px", margin: "5px" }}
                />
              ))}
            </div>
          </FormGroup>

          <ModalFooter>
            <Button color="primary" type="submit">Update</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default FeedbackUpdateModal;
