import apiRoot from './root';

export const getTodoAPI = () => apiRoot.get('/todos');

export const postTodoAPI = (taskObj) => apiRoot.post('/todo', { ...taskObj });

export const postFileAPI = (file) => apiRoot.post('/todo/file', file, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const putTodoAPI = (id, taskObj) => apiRoot.put(`/todo/${id}`, { ...taskObj });

export const delTodoAPI = (id) => apiRoot.delete(`/todo/${id}`);
