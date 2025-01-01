import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.js";
import { useUserStore } from "./userStore.js";

// export const useChatStore = create((set) => ({
//   chatId: null,
//   user: null,
//   isCurrentUserBlocked: false,
//   isReceiverBlocked: false,
//   changeChat: (chatId, user) => {
//     const currentUser = useUserStore.getState().currentUser;

//     // Check if the current user is blocked by the receiver

//     if (user.blocked.includes(currentUser.id)) {
//       return set({
//         chatId: null,
//         user: null,
//         isCurrentUserBlocked: true,
//         isReceiverBlocked: false,
//       });
//     }

//     // Check if the receiver is blocked by the current user
//     else if (currentUser.blocked.includes(user.id)) {
//       return set({
//         chatId: null,
//         user: user,
//         isCurrentUserBlocked: false,
//         isReceiverBlocked: true,
//       });
//     } else {
//       set({
//         chatId: null,
//         user: null,
//         isCurrentUserBlocked: false,
//         isReceiverBlocked: false,
//       });
//     }

//     changeBlock: () => {
//       set((state) => ({
//         ...state,
//         isReceiverBlocked: !state.isReceiverBlocked,
//       }));
//     };
//   },
// }));

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;
    console.log("Selected chatId:", chatId);
    console.log("Selected user:", user);
    set({
      chatId,
      user,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });

    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    } else if (currentUser.blocked.includes(user.id)) {
     return  set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    } else {
     return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }
  },
  changeBlock: () => {
    set((state) => ({
      ...state,
      isReceiverBlocked: !state.isReceiverBlocked,
    }));
  },
}));
