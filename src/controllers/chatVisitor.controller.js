// controllers/chatVisitor.controller.js
import { successResponse ,errorResponse } from '../utils/response.util.js';
import { createVisitor ,
     getVisitorById } from '../models/chatVisitor.model.js';

/**
 * POST /api/chat/visitor
 * Body: { visitorId?: number }
 * - Agar visitorId aaya & valid hai -> same return
 * - Nahi aaya / invalid -> naya visitor create
 **/

export const initVisitor = async (req, res) => {
  try { 

   const body = req.body 

   const visitorId = body.visitorId
  

 
    // ✅ CASE 1: visitorId aaya hai
    if (visitorId && Number.isInteger(visitorId)) {
      const existingVisitor = await getVisitorById(visitorId);

      if (existingVisitor) {
        // 🔒 IMPORTANT: yahin return — create tak jana hi nahi 
        console.log(existingVisitor.id , "check")
        return successResponse(res, {
          message: 'Visitor already exists',
          data: { visitorId: existingVisitor.id }
        });
      }
      // agar id aayi but DB me nahi mili → neeche new banega
    }

    // ✅ CASE 2: visitorId nahi aaya / invalid / DB me nahi mila
    const newVisitorId = await createVisitor();

    return successResponse(res, {
      statusCode: 201,
      message: 'Visitor created',
      data: { visitorId: newVisitorId }
    });

  } catch (err) {
    return errorResponse(res, {
      statusCode: 500,
      message: 'Failed to initialize visitor',
      errors: err.message
    });
  }
};