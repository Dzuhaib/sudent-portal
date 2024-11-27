// Import the functions you need from the SDKs you need


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, get, ref,} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGn_LzAD6v6AS1Owz57HjlyQZFu-uGyFI",
  authDomain: "fireblog-8e978.firebaseapp.com",
  projectId: "fireblog-8e978",
  storageBucket: "fireblog-8e978.appspot.com",
  messagingSenderId: "585251629798",
  appId: "1:585251629798:web:9465f59bc6a49f2918e927",
  measurementId: "G-D1M7CHN34B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

const db = getDatabase(app);

function GetPostData(){
    const user_ref = ref(db, 'post/');
    get(user_ref).then((snapshot)=>{
    const data = snapshot.val()

    let html = "";
    const table = document.querySelector('.main')
    for (const key in data) {
        const { title,student_info } = data[key];
        html+= `
        <div class="post">
            <h2>${title}</h2>
            <p>${student_info}</p>
        </div>
        `
    }
    table.innerHTML =html
})
    GetPostData()
}

GetPostData()