import axios from 'axios';

// Hardcode to save time
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export async function fetchStatusOverview() {
  const response = await apiClient.get('/api/projects/status-overview');
  return response.data;
}

export async function fetchProjectsByArea() {
  const response = await apiClient.get('/api/projects/by-area');
  return response.data;
}

export async function fetchBudgetSummary() {
  const response = await apiClient.get('/api/projects/budget-summary');
  return response.data;
}

export async function fetchProjectSizeSummary() {
  const response = await apiClient.get('/api/projects/size-summary');
  return response.data;
}

export async function fetchPriorityProjects() {
  const response = await apiClient.get('/api/projects/priority-projects');
  return response.data;
}

export default apiClient;
