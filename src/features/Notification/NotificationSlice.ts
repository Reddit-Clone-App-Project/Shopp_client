import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  deleteNotification,
} from "../../api";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, thunkAPI) => {
    try {
      const response = await getNotifications();
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "A network or server error occurred.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const markEveryNotificationAsRead = createAsyncThunk(
  "notifications/markEveryNotificationAsRead",
  async (_, thunkAPI) => {
    try {
      const response = await markAllNotificationsAsRead();
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "A network or server error occurred.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const markSingleNotificationAsRead = createAsyncThunk(
  "notifications/markSingleNotificationAsRead",
  async (notificationId: number, thunkAPI) => {
    try {
      const response = await markNotificationAsRead(notificationId);
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "A network or server error occurred.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const deleteANotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (notificationId: number, thunkAPI) => {
    try {
      const response = await deleteNotification(notificationId);
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "A network or server error occurred.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

interface Notification {
  id: number;
  app_user_id: number;
  title: string;
  content: string;
  is_read: boolean;
  type: string;
  created_at: Date;
}

interface NotificationState {
  notifications: Notification[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  status: "idle",
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload;
      })
      .addCase(markEveryNotificationAsRead.fulfilled, (state) => {
        state.notifications.forEach((notification) => {
          notification.is_read = true;
        });
        state.status = "succeeded";
      })
      .addCase(markSingleNotificationAsRead.fulfilled, (state, action) => {
        const notificationId = action.meta.arg; // Get the original notificationId from the thunk argument
        const notification = state.notifications.find(
          (n) => n.id === notificationId
        );
        if (notification) {
          notification.is_read = true;
        }
        state.status = "succeeded";
      })
      .addCase(deleteANotification.fulfilled, (state, action) => {
        const notificationId = action.meta.arg; // Get the original notificationId from the thunk argument
        state.notifications = state.notifications.filter(
          (n) => n.id !== notificationId
        );
        state.status = "succeeded";
      })
      .addMatcher(
        isPending(
          fetchNotifications,
          markEveryNotificationAsRead,
          markSingleNotificationAsRead,
          deleteANotification
        ),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        isRejected(
          fetchNotifications,
          markEveryNotificationAsRead,
          markSingleNotificationAsRead,
          deleteANotification
        ),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
        }
      );
  },
});

export default notificationSlice.reducer;
