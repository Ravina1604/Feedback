const express = require('express');
const router = express.Router();

const {
    getEmployee,
    addEmployee,
    removeEmployee,
    assignEmployee,
    submitReview,
    verifyId
} = require('../controller/commonFunctions');

//used to return all employee from Json file
router.get("/employees",async (req,res)=>{
    try {
        const data = await getEmployee();
        res.json({employees : data});
    }
    catch(e) {
        console.log(e);
    }
})

//used to verify used id while user logs in into the system by finding employee from Json file
router.get("/verifyId",async (req,res)=>{
    try {
        const data = await verifyId(req.query.userId);
        res.json(data);
    }
    catch(e) {
        console.log(e);
    }
});

//used to remove particular employee from Json file
router.get("/removeEmployee",async (req,res)=>{
    try {
        const data = await removeEmployee(req.query.userId);
        res.json(data);
    }
    catch(e) {
        console.log(e);
    }
});

//used to add new employee in Json file
router.get("/addEmployee",async (req,res)=>{
    try {
        console.log(req.query.userId)
        const data = await addEmployee(req.query.userId);
        console.log(data);
        res.json(data);
    }
    catch(e) {
        console.log(e);
    }
});


//used to assign employee to give review of other employees in Json file
router.get("/assignEmployee",async (req,res)=>{
    try {
        const data = await assignEmployee(req.query.userId, req.query.assigneeId);
        res.json(data);
    }
    catch(e) {
        console.log(e);
    }
});

//used to submit review of employees
router.get("/submitReview",async(req,res)=>{
    try {
        const data = await submitReview(req.query.userId, req.query.assigneeId, req.query.review);
        res.json(data);
    }
    catch(e) {
        console.log(e);
    }
});


module.exports = router;
