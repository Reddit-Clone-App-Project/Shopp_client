import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getConversations } from "../../api";

export const fetchConversations = createAsyncThunk(
    'chat/fetchConversations',
    async (_, thunkAPI) => {
        try {
            const response = await getConversations();
            return response.data;
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Failed to clear cart";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

interface Message {
    content: string;
    senderId: number;
    createdAt: string;
}

export interface Conversation{
    conversation_id: number;
    updated_at: string;
    other_user: {
        id: number;
        username: string;
        avatar: string | null;
    };
    last_message_content: string | null;
    last_message_timestamp: string | null;
}

interface ChatState {
    conversations: Conversation[];
    messages: Message[];
    conversationId: number | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ChatState = {
    conversations: [],
    messages: [],
    conversationId: null,
    status: 'idle',
    error: null
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        clearMessages: (state) => {
            state.messages = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversations.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchConversations.fulfilled, (state, action: PayloadAction<Conversation[]>) => {
                state.status = 'succeeded';
                state.conversations = action.payload;
            })
            .addCase(fetchConversations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
