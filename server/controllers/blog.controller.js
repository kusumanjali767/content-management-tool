import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import _ from "lodash";
const create=async(req,res)=>{
    try {
   const {Title,Subject,Explanation}=req.body
   const Image=req.file.path
   const blogs=await Blog.findOne({Title})
   if(blogs) return res.status(400).json({
    success:false,
    Message:'Title already exist provide new Title'
   })
   let blog=await Blog.create({Title,Subject,Image,Explanation})
   await User.findOneAndUpdate({_id:req.params.userid},{$push:{ID:blog._id}});
   return res.status(200).json({ 
    success:true,
    Message:"Successfully created"
   })
}catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      Message: 'Internal Server Error'
    });
  }
}
const home=async(req,res)=>{
    try {   let blog=await Blog.find().select('Title Subject Image Explanation')
   return res.status(200).json({
    blog
   })
}
   catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      Message: 'Internal Server Error'
    });
  }
}

const update=async(req,res)=>{
    try {
    let blog=await Blog.findById(req.params.blogid)
    blog=_.extend(blog,req.body)
    blog.updated=Date.now()
    blog.save()
    return res.status(200).json({
        success:true,
        Message:"Edited successfully"
    })
}
catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      Message: 'Internal Server Error'
    });
  }
}

const remove=async(req,res)=>{
    try {
    let blog=await Blog.findById(req.params.blogid)
    await Blog.deleteOne(blog)
    await User.findByIdAndUpdate({_id:req.params.userid},{$pull:{ID:req.params.blogid}})
    return res.status(200).json({
        success:true,
        Message:"Blog deleted successfully"
    })
}
catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      Message: 'Internal Server Error'
    });
  }
}

const mylist=async(req,res)=>{
    try {
    let blogarray=await User.findById(req.params.userid)
    let blogarrayid=blogarray.ID
    const blogs=[]
    for(let i=0;i<blogarrayid.length;i++){
         blogs.push(await Blog.findById(blogarrayid[i]).select('Title Subject Image Explanation'))
    }
    return res.status(200).json({
        blogs
    })
}
catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      Message: 'Internal Server Error'
    });
  }
}

export default {create,home,update,remove,mylist}