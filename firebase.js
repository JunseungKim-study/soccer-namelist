import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCp5LAD3fs51y5doiJbb8V1d4LuZqNDeP0",
  authDomain: "soccer-namelist-6c8b4.firebaseapp.com",
  projectId: "soccer-namelist-6c8b4",
  storageBucket: "soccer-namelist-6c8b4.appspot.com", // ✅ 수정 완료
  messagingSenderId: "528384169209",
  appId: "1:528384169209:web:32fcdcd1be250c805f7e28",
  measurementId: "G-W7RR58XL3Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };