import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { deleteFeedbackById, getAllFeedbacks } from '../../apiServices/service';
import FeedbackUpdateModal from '../../Modal/FeedbackUpdateModal';

function AllFeedbacks() {
    const [searchTerm, setSearchTerm] = useState("");
    const [feedbacks, setFeedbacks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFeedbackId, setSelectedFeedbackId] = useState(null); 
    const [trigger, setTrigger] = useState(false);
    // Fetching feedback data from the API
    const fetchFeedbacks = async () => {
        try {
            const response = await getAllFeedbacks();
            setFeedbacks(response.data || []); 
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchFeedbacks();
    }, [trigger]);

    const handleUpdateSuccess = () => {
        setTrigger(!trigger);  
      };
      


    const filteredFeedbacks = feedbacks.filter(feedback => {
        return (
            feedback.userDetails.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feedback.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feedback.feedbackType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feedback.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const rowColor = (type) => {
        if (type === 'Feature Request') {
            return 'bg-primary text-white';
        } else if (type === 'Bug Report') {
            return 'bg-danger text-white';
        } else if (type === 'General Feedback') {
            return 'bg-warning text-dark';
        } else if (type === 'Other') {
            return 'bg-info text-white';
        } else {
            return '';
        }
    };
    
    const formatRole = (role) => {
        return role
            .replace(/_/g, ' ') 
            .split(' ') 
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
            .join(' ');
    };

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleEditClick = (feedbackId) => {
        setSelectedFeedbackId(feedbackId);
        toggleModal();
    };

    const handleDeleteClick = async (feedbackId) => {
        try {
            const response = await deleteFeedbackById(feedbackId);
            console.log(response.data);
            setTrigger(!trigger);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <div className='page-content'>
                <Breadcrumbs title='Feedbacks' breadcrumbItem='All Feedbacks' />
                <div className='mb-3'>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Feedbacks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="mt-3">
                        <span className="badge bg-primary me-2">Feature Request</span>
                        <span className="badge bg-danger me-2">Bug Report</span>
                        <span className="badge bg-warning text-dark me-2">General Feedback</span>
                        <span className="badge bg-info">Other</span>
                    </div>
                </div>
                <div className='table-responsive'>
                    <table className='table table-centered table-nowrap mb-0'>
                        <thead className='thead-light'>
                            <tr>
                                {/* <th scope='col'>#</th> */}
                                <th scope='col'>Name</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Role</th>
                                <th scope='col'>Feedback Type</th>
                                <th scope='col'>Feedback</th>
                                <th scope='col'>Date</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFeedbacks.map((feedback, key) =>{
                                    const createdAt = new Date(feedback.createdAt);
                                    const date = createdAt.toLocaleDateString('en-IN', {
                                        timeZone: 'Asia/Kolkata',
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    });
                                    const time = createdAt.toLocaleTimeString('en-IN', {
                                        timeZone: 'Asia/Kolkata',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    });

                                    return  (
                                <tr key={key} className={rowColor(feedback.feedbackType)}>
                                    {/* <td className={rowColor(feedback.feedbackType)}>{feedback._id}</td> */}
                                    <td className={rowColor(feedback.feedbackType)}>{feedback.userDetails.firstName}</td>
                                    <td className={rowColor(feedback.feedbackType)}>{feedback.userDetails.email}</td>
                                    <td className={rowColor(feedback.feedbackType)}> {formatRole(feedback.userDetails.role)}</td>
                                    <td className={rowColor(feedback.feedbackType)}>{feedback.feedbackType}</td>
                                    <td className={rowColor(feedback.feedbackType)}>
                                        {feedback.message.split(' ').slice(0, 9).join(' ')}
                                    </td>
                                    <td className={rowColor(feedback.feedbackType)}>
                                                {date}
                                                <br />
                                                {time}
                                    </td>
                                    <td className={rowColor(feedback.feedbackType)}>
                                        <span
                                            className={`badge ${feedback.status === 'Pending' ? 'bg-warning text-dark' : 'bg-success'}`}
                                        >
                                            {feedback.status}
                                        </span>
                                    </td>
                                    <td>
                                        {/* <i className='bx bx-show me-2' style={{ fontSize: '1.25rem' }}></i> */}
                                        <i
                                                className='bx bx-edit me-2'
                                                style={{ fontSize: '1.25rem', cursor: 'pointer' }}
                                                onClick={() => handleEditClick(feedback._id)} 
                                            ></i>
                                            <i
                                                className='bx bx-trash-alt'
                                                style={{ fontSize: '1.25rem', cursor: 'pointer' }}
                                                onClick={() => handleDeleteClick(feedback._id)}
                                            ></i>
                                    </td>
                                </tr>
                            )}
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <FeedbackUpdateModal
                feedbackId={selectedFeedbackId}
                isOpen={modalOpen}
                toggle={toggleModal}
                onUpdateSuccess={handleUpdateSuccess} 
            />
        </React.Fragment>
    );
}

export default AllFeedbacks;
