const Comment = require('../models/comment.model');

const createComment = async (data) => {
  return await Comment.create(data);
};

const getComments= async (filters) => {
  const where = {
      isDeleted: false, 
  };

  if (filters.content) {
      where.content = { [Op.like]: `%${filters.content}%` };
  }

  const comments = await Comment.findAll({ where });
  return comments;
};

const getCommentById = async (id) => {
  const comment = await Comment.findOne({
      where: {
          id,
          isDeleted: false,
      },
  });

  if (!comment) {
      throw new Error('Comment not found or already deleted');
  }

  return comment;
};


const updateCommentById = async (id, data) => {
  const comment = await Comment.findByPk(id);
  if (comment) {
    return await comment.update(data);
  }
  throw new Error('Comment not found');
};

const deleteCommentById = async (id) => {
  
  const comment = await Comment.findOne({
      where: {
          id,
          isDeleted: false 
      }
  });

  
  if (!comment) {
      throw new Error('Comment not found or already deleted');
  }

 
  comment.isDeleted = true;
  
 
  await comment.save();

  
  return { message: 'Comment marked as deleted' };
};
module.exports = {
  createComment,
  getComments,
  getCommentById,
  updateCommentById,
  deleteCommentById
};
