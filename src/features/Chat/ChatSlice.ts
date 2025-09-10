import { createSlice, PayloadAction, createAsyncThunk, isRejected, isPending, isFulfilled } from "@reduxjs/toolkit";
import { getConversations, findOrCreateConversation, getConversationsForStore } from "../../api";

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

export const fetchStoreConversations = createAsyncThunk(
    'chat/fetchStoreConversations',
    async (storeId:number, thunkAPI) => {
        try {
            const response = await getConversationsForStore(storeId);
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

export const fetchConversationDetail = createAsyncThunk(
    'chat/fetchConversationDetail',
    async ({ buyerIdFromSeller, sellerId }: {buyerIdFromSeller: number | undefined, sellerId: number}, thunkAPI) => {
        try {
            const response = await findOrCreateConversation(buyerIdFromSeller, sellerId);
            return response.data;
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Failed to fetch conversation detail";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

interface Message {
    id: number;
    conversationId: number;
    sender_buyer_id: number | null;
    sender_store_id: number | null;
    content: string;
    is_read: boolean;
    createdAt: string;
}

export interface Conversation{
    conversation_id: number;
    updated_at: string;
    other_user: {
        id: number;
        name: string;
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
            .addCase(fetchConversationDetail.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.messages = [];
                state.conversationId = null;
            })
            .addCase(fetchConversationDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.conversationId = action.payload.conversation.conversation_id;
                state.messages = action.payload.messages;
            })

            .addMatcher(isPending(fetchConversations, fetchStoreConversations), (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addMatcher(isFulfilled(fetchConversations, fetchStoreConversations), (state, action: PayloadAction<Conversation[]>) => {
                state.status = 'succeeded';
                state.conversations = action.payload;
            })
            .addMatcher(isRejected(fetchConversations, fetchConversationDetail), (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
