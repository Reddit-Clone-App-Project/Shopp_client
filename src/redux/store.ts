import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/Auth/AuthSlice';
import profile from '../features/UserProfile/UserProfileSlice';
import suggestionOfTheDay from '../features/SuggestionOfTheDay/SuggestionOfTheDaySlice';

export const store = configureStore({
    reducer: {
        auth,
        profile,
        suggestionOfTheDay,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;