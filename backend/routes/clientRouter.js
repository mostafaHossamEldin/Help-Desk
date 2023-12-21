const express = require("express");
const router = express.Router();
const authMiddleware=require('../middleware/authorizationMiddleware');
const clientController = require("../controllers/clientController");

//get ticket form 
router.get("/ticketrequest", authMiddleware(['client']), clientController);
//WAIT FOR DONIA RESPONSE

//get workflow for the issue
router.get("/ticketrequest/?mainIssue=mi&subIssue=si", authMiddleware(['client']), clientController.generateWorkflow);


//post (insert) ticket into db
router.post("/ticketrequest", authMiddleware(['client']), clientController.createTicket);

//get this user's tickets - all
router.get("/tickets", authMiddleware(['client']), clientController.getAllTickets);

//get this user's tickets by status
router.get("/tickets/:status", authMiddleware(['client']), clientController.getTicketByStatus);

//get this ticket
router.get('/tickets/:ticketId', authMiddleware(['client']), clientController.getTicket);

module.exports = router;