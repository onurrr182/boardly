import { generateId } from './utils.js';

const BOARDS_KEY = 'farewellbook_boards';

const getBoardsData = () => {
  const data = localStorage.getItem(BOARDS_KEY);
  return data ? JSON.parse(data) : {};
};

const saveBoardsData = (data) => {
  localStorage.setItem(BOARDS_KEY, JSON.stringify(data));
};

export const createBoard = (boardData) => {
  const boards = getBoardsData();
  const id = generateId();
  
  const newBoard = {
    id,
    ...boardData,
    createdAt: new Date().toISOString(),
    posts: []
  };
  
  boards[id] = newBoard;
  saveBoardsData(boards);
  return id;
};

export const getBoard = (id) => {
  const boards = getBoardsData();
  return boards[id] || null;
};

export const getAllBoards = () => {
  const boards = getBoardsData();
  return Object.values(boards).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const deleteBoard = (id) => {
  const boards = getBoardsData();
  if (boards[id]) {
    delete boards[id];
    saveBoardsData(boards);
    return true;
  }
  return false;
};

export const addPostToBoard = (boardId, postData) => {
  const boards = getBoardsData();
  if (!boards[boardId]) return null;
  
  const post = {
    id: generateId(),
    ...postData,
    createdAt: new Date().toISOString()
  };
  
  boards[boardId].posts.push(post);
  saveBoardsData(boards);
  return post;
};

export const updatePost = (boardId, postId, postData) => {
  const boards = getBoardsData();
  if (!boards[boardId]) return null;
  
  const postIndex = boards[boardId].posts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;
  
  boards[boardId].posts[postIndex] = {
    ...boards[boardId].posts[postIndex],
    ...postData,
    updatedAt: new Date().toISOString()
  };
  
  saveBoardsData(boards);
  return boards[boardId].posts[postIndex];
};

export const deletePost = (boardId, postId) => {
  const boards = getBoardsData();
  if (!boards[boardId]) return false;
  
  const initialLength = boards[boardId].posts.length;
  boards[boardId].posts = boards[boardId].posts.filter(p => p.id !== postId);
  
  if (boards[boardId].posts.length !== initialLength) {
    saveBoardsData(boards);
    return true;
  }
  return false;
};
