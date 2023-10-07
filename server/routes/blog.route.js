import express from 'express';
import blogctrl from "../controllers/blog.controller.js"
import multer from 'multer';
const router=express.Router();

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './public/uploads/')
      },
      filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
      }
    });
  
    const fileFilter=(req, file, cb)=>{
     if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
         cb(null,true);
     }else{
         cb(null, false);
     }
  
    }
  
  var upload = multer({ 
      storage:storage,
      limits:{
          fileSize: 1024 * 1024 * 5
      },
      fileFilter:fileFilter
   });
router.route('/api/blog/')
      .get(blogctrl.home)
router.route('/api/blog/:userid')
      .post(upload.single('productimage'),blogctrl.create)
      .get(blogctrl.mylist)
router.route('/api/blog/:userid/:blogid/')
      .delete(blogctrl.remove)
      .put(blogctrl.update)

export default router