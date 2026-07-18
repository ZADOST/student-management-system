import axios from 'axios';

// Set your backend URL here. 
// Using a mock API for demonstration purposes.
const API_URL = 'https://jsonplaceholder.typicode.com';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studentService = {
  // In a real app, this would point to /students
  getAllStudents: async () => {
    try {
      const response = await apiClient.get('/users');
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  },
  
  createStudent: async (studentData) => {
    try {
      const response = await apiClient.post('/users', studentData);
      return response.data;
    } catch (error) {
      console.error("Error creating student:", error);
      throw error;
    }
  }
};