import { Router, Request, Response, NextFunction } from "express";
import Comment from "../../models/comment";
import Post from "../../models/post";

const router = Router();

router.post('/api/comment/new/:postId', async (req: Request, res: Response, next: NextFunction) => {

   const {postId} = req.params;
   console.log('Helklio');

   const {userName, content} = req.body; 
   
   if(!content){
    const error = new Error('content is required!') as CustomError;
    error.status = 400;
    return next(error);
   }

   const newComment = new Comment({
    userName: userName ? userName : 'anonymous',
    content
   });

   await newComment.save();

   const updatePost = await Post.findOneAndUpdate({
    _id: postId}, {$push: {comments: newComment}}, {new: true});

    res.status(201).send(newComment)

});

export {router as newCommentRouter}