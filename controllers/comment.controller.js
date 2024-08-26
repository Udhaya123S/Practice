const commentService = require('../services/comment.service');
const httpStatus = require('http-status');

const createComment = async (req, res) => {
  try {
    const comment = await commentService.createComment(req.body);
    res.status(httpStatus.CREATED).json(comment);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
      const filters = req.query;
      const comments = await commentService.getComments(filters);
      res.status(httpStatus.OK).json(comments);
  } catch (error) {
      res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }
};

const getCommentById = async (req, res) => {
  try {
      const comment = await commentService.getCommentById(req.params.id);
      res.status(httpStatus.OK).json(comment);
  } catch (error) {
      res.status(httpStatus.NOT_FOUND).json({ error: error.message });
  }
};

const updateCommentById = async (req, res) => {
  try {
    const comment = await commentService.updateCommentById(req.params.id, req.body);
    res.status(httpStatus.OK).json(comment);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }
};

const deleteCommentById = async (req, res) => {
  try {
    await commentService.deleteCommentById(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).json({ error: error.message });
  }
};

module.exports = {
  createComment,
  getComments,
  getCommentById,
  updateCommentById,
  deleteCommentById
};
