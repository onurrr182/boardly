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
  const ownerToken = 'bt_' + Math.random().toString(36).substring(2, 15);
  
  const newBoard = {
    id,
    ...boardData,
    ownerToken,
    createdAt: new Date().toISOString(),
    posts: []
  };
  
  boards[id] = newBoard;
  saveBoardsData(boards);
  
  // Store the ownership token locally
  addTokenToStorage('boardly_owned_boards', ownerToken);
  
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
  
  const postToken = 'pt_' + Math.random().toString(36).substring(2, 15);
  
  const post = {
    id: generateId(),
    ...postData,
    postToken,
    createdAt: new Date().toISOString()
  };
  
  boards[boardId].posts.push(post);
  saveBoardsData(boards);
  
  // Store the post ownership token locally
  addTokenToStorage('boardly_owned_posts', postToken);
  
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

// --- Client-Side Ownership Helpers ---

const addTokenToStorage = (key, token) => {
  try {
    const tokens = JSON.parse(localStorage.getItem(key)) || [];
    if (!tokens.includes(token)) {
      tokens.push(token);
      localStorage.setItem(key, JSON.stringify(tokens));
    }
  } catch (e) {
    console.error("Failed to save ownership token", e);
  }
};

const hasTokenInStorage = (key, token) => {
  try {
    const tokens = JSON.parse(localStorage.getItem(key)) || [];
    return tokens.includes(token);
  } catch (e) {
    return false;
  }
};

export const isBoardOwner = (boardId) => {
  const board = getBoard(boardId);
  if (!board || !board.ownerToken) return false;
  return hasTokenInStorage('boardly_owned_boards', board.ownerToken);
};

export const isPostOwner = (boardId, postId) => {
  const board = getBoard(boardId);
  if (!board) return false;
  const post = board.posts.find(p => p.id === postId);
  if (!post || !post.postToken) return false;
  return hasTokenInStorage('boardly_owned_posts', post.postToken);
};

export const canModifyPost = (boardId, postId) => {
  const board = getBoard(boardId);
  if (!board) return false;
  const post = board.posts.find(p => p.id === postId);
  if (!post) return false;
  
  // If the post has no token (backward compatibility for older posts), allow edits
  if (!post.postToken) return true;
  
  return isBoardOwner(boardId) || isPostOwner(boardId, postId);
};
