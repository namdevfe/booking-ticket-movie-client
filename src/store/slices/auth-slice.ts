import { HTTP_STATUS_CODES } from '@/constants/http-status-code'
import authService from '@/services/auth-service'
import { User } from '@/types/user-type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface AuthState {
  profile: User | undefined
  loading: {
    profile: boolean
    logout: boolean
  }
}

const initialState: AuthState = {
  profile: undefined,
  loading: {
    profile: false,
    logout: false
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get profile
    builder.addCase(getProfile.pending, (state) => {
      state.loading.profile = true
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading.profile = false
      state.profile = action.payload
    })
    builder.addCase(getProfile.rejected, (state) => {
      state.loading.profile = false
      state.profile = undefined
    })

    // Logout
    builder.addCase(logout.pending, (state) => {
      state.loading.logout = true
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.loading.logout = false
      state.profile = undefined
    })
    builder.addCase(logout.rejected, (state) => {
      state.loading.logout = false
      state.profile = undefined
    })
  }
})

const { actions, reducer: authReducer } = authSlice
export const {} = actions
export default authReducer

// Async actions
export const getProfile = createAsyncThunk('auth/getProfile', async () => {
  const accessToken = JSON.parse(localStorage.getItem('accessToken') ?? '')

  if (accessToken) {
    try {
      const response = await authService.getProfile()

      if (response.statusCode === HTTP_STATUS_CODES.SUCCESS) {
        return response.data
      }
    } catch (error) {
      console.log(error)
    }
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await authService.logoutFromNextServer()

    if (response.statusCode === HTTP_STATUS_CODES.SUCCESS) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')

      return true
    }
  } catch (error) {
    console.log('🚀error---->', error)
  }
})
