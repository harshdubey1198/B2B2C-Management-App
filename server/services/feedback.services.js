const CRMUser = require('../schemas/crmuser.schema');
const Feedback = require('../schemas/feedback.schema');
const User = require('../schemas/user.schema');
const uploadToCloudinary = require('../utils/cloudinary');

const FeedBackServices = {};

FeedBackServices.createFeedBack = async (data) => {
    const newFeedback = new Feedback(data)
    await newFeedback.save();
    return newFeedback;
}

FeedBackServices.getFeedBacks = async () => {
    const feedBack = await Feedback.find({deleted_at: null})
    const detailedFeedbacks = await Promise.all(
        feedBack.map(async (feedback) => {
            let userDetails;
            if (feedback.userType === 'crmuser') {
                userDetails = await CRMUser.findById(feedback.userId).select('firstName lastName email'); 
            } else if (feedback.userType === 'user') {8
                userDetails = await User.findById(feedback.userId).select('firstName lastName email');
            }
            return {
                ...feedback.toObject(),
                userDetails, // Attach user details
            };
        })
    )
    if(detailedFeedbacks.length === 0){
        throw new Error('No Feedbacks Found')
    }
    return detailedFeedbacks;
}

FeedBackServices.getFeedBackById = async (id) => {
    const feedBack = await Feedback.findOne({_id: id, deleted_at: null })
    if(!feedBack){
        throw new Error('Feedback Not Found')
    }
    let userDetails;
    if (feedBack.userType === 'crmuser') {
        userDetails = await CRMUser.findById(feedBack.userId).select('firstName lastName email'); 
    } else if (feedBack.userType === 'user') {
        userDetails = await User.findById(feedBack.userId).select('firstName lastName email');
    }
    return {
        ...feedBack.toObject(),
        userDetails, 
    };
}

FeedBackServices.updateFeedBack = async (id, data) => {
    const feedBack = await Feedback.findByIdAndUpdate(id, data, { new: true });
    if(!feedBack){
        throw new Error('Feedback Not Found')
    }
    return feedBack;
}

FeedBackServices.deleteFeedBack = async (id) => {
    const deletedFeedBack = await Feedback.findOneAndUpdate(
        {_id: id},
        {deleted_at: new Date()},
        {new: true}
    )
    if(!deletedFeedBack){
        throw new Error('unable to delete FeedBack')
    }
    return deletedFeedBack
}


module.exports = FeedBackServices