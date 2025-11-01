import { db } from "./firebase.js";
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, query, where, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const namesRef = collection(db, "names");
const inputEl = document.getElementById("nameInput");
const listEl = document.getElementById("nameList");
const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");
const countEl = document.getElementById("count");

// 실시간 목록 반영 (자동 정렬)
onSnapshot(namesRef, snapshot => {
  let names = [];
  snapshot.forEach(docSnap => {
    names.push(docSnap.data().name);
  });

  // 가나다순 정렬
  names.sort((a, b) => a.localeCompare(b, "ko"));

  // 화면에 출력
  listEl.innerHTML = "";
  names.forEach(n => {
    const li = document.createElement("li");
    li.textContent = n;
    listEl.appendChild(li);
  });

  countEl.textContent = names.length;
});

// 추가 (중복 방지)
addBtn.addEventListener("click", async () => {
  const name = inputEl.value.trim();
  if (!name) return;

  // 중복 체크
  const q = query(namesRef, where("name", "==", name));
  const snap = await getDocs(q);
  if (!snap.empty) {
    alert("이미 존재하는 이름입니다!");
    inputEl.value = "";
    return;
  }

  console.log("추가 버튼 눌림:", name);
  await addDoc(namesRef, { name });
  inputEl.value = "";
});

// 삭제
removeBtn.addEventListener("click", async () => {
  const name = inputEl.value.trim();
  if (!name) return;
  console.log("삭제 버튼 눌림:", name);

  const q = query(namesRef, where("name", "==", name));
  const snap = await getDocs(q);
  for (const d of snap.docs) {
    await deleteDoc(doc(db, "names", d.id));
  }
  inputEl.value = "";
});