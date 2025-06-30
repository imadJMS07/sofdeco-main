import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { ENDPOINTS, API_CONFIG } from '@/services/api/config';

// Thunk for fetching blogs
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async ({ page = 1, size = 100, sortBy = 'created_at', direction = 'desc' }, { rejectWithValue }) => {
    try {
      const response = await api.get(ENDPOINTS.BLOGS, {
        params: { page, size, sortBy, direction }
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Une erreur est survenue lors de la récupération des blogs');
    }
  }
);

// Action pour sélectionner un blog par ID à partir des données locales
export const selectBlogByIdAction = createAsyncThunk(
  'blogs/selectBlogById',
  async (blogId, { getState, rejectWithValue }) => {
    try {
      // Récupérer l'état actuel
      const state = getState();
      
      // Chercher le blog dans la liste des blogs déjà chargés
      const blog = state.blogs.blogs.find(blog => blog && blog.id === parseInt(blogId));
      
      // Si le blog est trouvé, le retourner
      if (blog) {
        return blog;
      }
      
      // Si le blog n'est pas trouvé, rejeter avec un message d'erreur
      return rejectWithValue('Blog non trouvé');
    } catch (error) {
      return rejectWithValue('Une erreur est survenue lors de la récupération du blog');
    }
  }
);

const initialState = {
  blogs: [],
  currentBlog: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  pagination: {
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    total: 0,
    totalPages: 1
  }
};

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    resetBlogsState: (state) => {
      state.blogs = [];
      state.currentBlog = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload.data;
        state.pagination = {
          currentPage: action.payload.current_page,
          lastPage: action.payload.last_page,
          perPage: action.payload.per_page,
          total: action.payload.total,
          totalPages: action.payload.total_pages
        };
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Une erreur est survenue';
      })
      
      // Sélectionner un blog par ID (données locales)
      .addCase(selectBlogByIdAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(selectBlogByIdAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentBlog = action.payload;
      })
      .addCase(selectBlogByIdAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Une erreur est survenue';
      });
  }
});

// Selectors
export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogById = (blogId) => (state) => 
  state.blogs.blogs.find(blog => blog.id === parseInt(blogId)) || state.blogs.currentBlog;
export const selectBlogsStatus = (state) => state.blogs.status;
export const selectBlogsError = (state) => state.blogs.error;
export const selectBlogsPagination = (state) => state.blogs.pagination;

// Filter blogs by category
export const selectBlogsByCategory = (category) => (state) => 
  state.blogs.blogs.filter(blog => blog.category.toLowerCase() === category.toLowerCase());

// Filter blogs by tag
export const selectBlogsByTag = (tag) => (state) => 
  state.blogs.blogs.filter(blog => blog.tags.toLowerCase().includes(tag.toLowerCase()));

export const { resetBlogsState } = blogsSlice.actions;

export default blogsSlice.reducer;
