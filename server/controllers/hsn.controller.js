const hsnServices = require("../services/hsn.services");
const { createResult } = require("../utils/utills");

const hsnController = {}

hsnController.createHsn = async (req,res) => {
    try {
        const newhsn = await hsnServices.createHsn(req.body)
        return res.status(200).json(createResult("hsn created Succefully", newhsn))
    } catch (error) {
        console.log("error creating hsn", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

// get all hsns
hsnController.getAllHsns = async (req,res) => {
    try {
        const hsns = await hsnServices.getAllHsns()
        return res.status(200).json(createResult("hsns number Fetched Succefully", hsns))
    } catch (error) {
        console.log("error getting hsns", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

// get hsn by id
hsnController.getHsnById = async (req,res) => {
    try {
        const hsn = await hsnServices.getHsnById(req.params.id)
        return res.status(200).json(createResult("hsn number Fetched Succefully", hsn))
    } catch (error) {
        console.log("error getting hsn", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

// update hsn by id
hsnController.updateHsn = async (req,res) => {
    try {
        const hsn = await hsnServices.updateHsn(req.params.id, req.body)
        return res.status(200).json(createResult("hsn Updated Succefully", hsn))
    } catch (error) {
        console.log("error updateding hsn", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

// Delete hsn by id
hsnController.deleteHsn = async (req,res) => {
    try {
        const hsn = await hsnServices.deleteHsn(req.params.id)
        return res.status(200).json(createResult("hsn Deleted Succefully", hsn))
    } catch (error) {
        console.log("error deleting hsn", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

module.exports = hsnController