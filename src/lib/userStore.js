import { create } from 'zustand'
import {doc,getDoc} from 'firebase/firestore';
import {db} from './firebase.js'

// export const useUserStore = create((set) => ({
//   currentUser: null,
//   Loading:true,
//   fetchUserInfo: async(uid) => {
//     if(!uid) return set({currentUser: null,Loading:false});

//     try {
//         const docRef = doc(db,"users",uid);
//         const docSnap = await getDoc(docRef);

//         if(docSnap.exists()) {
//             set({currentUser: docSnap.data(),Loading:false});
//         } else{
//             set({currentUser: null,Loading:false});
//         }
        
//     } catch (error) {
//         console.log(error);
//         return set({currentUser: null,Loading:false});
//     }
//   }
// }))

export const useUserStore = create((set) => ({
  currentUser: null,
  Loading: true,
  error: null,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, Loading: false, error: null });
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), Loading: false, error: null });
      } else {
        set({ currentUser: null, Loading: false, error: "User not found" });
      }
    } catch (err) {
      console.error(err);
      set({ currentUser: null, Loading: false, error: err.message });
    }
  },
}));

