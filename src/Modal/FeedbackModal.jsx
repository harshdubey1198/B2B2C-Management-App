import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { createFeedback } from "../apiServices/service";
import { toast } from "react-toastify";  // Assuming react-toastify is installed

const FeedbackModal = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const userRole = JSON.parse(localStorage.getItem("authUser"))?.response?.role || "super_admin";
  const [images, setImages] = useState([]);
  const [feedbackType, setFeedbackType] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");

  const userTypeLogic = () => {
    if (userRole === "client_admin" || userRole === "firm_admin" || userRole === "accountant" || userRole === "employee") {
      setUser("user");
      return true;
    }
    if (userRole === "ASM" || userRole === "SM" || userRole === "Telecaller") {
      setUser("crmuser");
      return true;
    }
  };

  useEffect(() => {
    userTypeLogic();
  }, []);

  if (userRole === "super_admin") return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("feedbackType", feedbackType);
    formData.append("message", message);
    formData.append("userId", JSON.parse(localStorage.getItem("authUser")).response._id);
    formData.append("userType", user); 

    images.forEach((image) => {
      formData.append("feedbackImage", image);
    });

    try {
      const response = await createFeedback(formData);
      if (response.message === "FeedBack created successfully") {
        toast.success("Feedback submitted successfully!");
        setModal(false);
        setImages([]);
        setMessage("");
      }

    } catch (error) {
      console.error("Error submitting feedback", error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    
    if (selectedImages.length + images.length > 5) {
      toast.error("You can only upload up to 5 images! The 6th one will be removed.");
      setImages([...images, ...selectedImages.slice(0, 5 - images.length)]);
    } else {
      setImages([...images, ...selectedImages]);
    }
  };

  const handleImageDelete = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

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
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="feedbackType">Feedback Type</Label>
              <Input
                type="select"
                name="feedbackType"
                id="feedbackType"
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
              >
                <option value="">Select Feedback Type</option>
                <option>Suggestion</option>
                <option>General</option>
                <option>Bug</option>
                <option>Complaint</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="file">Attach File</Label>
              <Input
                type="file"
                name="file"
                id="file"
                multiple
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleImageChange}
              />
              <h3 className="mt-2">Image Previews</h3>
              <span className="text-primary">Max 5 images allowed</span>

              <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mt-2 bg-info p-2">
                {/* Only five images please */}
                {images.map((image, index) => (
                  <div key={index} className="position-relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      style={{ width: "auto", height: "160px" }}
                    />
                   
                   <i className="bx bx-x-circle position-absolute top-0 end-0 text-danger" style={{ cursor: "pointer" , fontSize:"28px" , backdropFilter:"blur(5px)" }} onClick={() => handleImageDelete(index)}>
                    </i>

                  </div>
                ))}
              </div>
            </FormGroup>

            <FormGroup>
              <Label for="message">Your Feedback</Label>
              <Input
                type="textarea"
                name="message"
                id="message"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your feedback here..."
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
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
