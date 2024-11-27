// Import the functions you need from the SDKs you need


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut,} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase, set, ref, get, remove, update, } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
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

const auth = getAuth(app);
const db = getDatabase(app);

const myBlog = document.querySelector(".myblog");
const myLogin = document.querySelector(".log-in");

onAuthStateChanged(auth, (user) => {
  if (user) {
    myBlog.classList.add("show");
    myLogin.classList.add("hide");
  } else {
    // myBlog.classList.remove("show");
    // myLogin.classList.remove("hide");
    
  }
});

function signInUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password).then((userCredinals) =>
    console.log(userCredinals.user.uid)
  );
}

const signBtn = document.querySelector("#login");
signBtn.addEventListener("click", signInUser);

// sign out
const signOutBtn = document.querySelector("#logout");
signOutBtn.addEventListener("click", () =>
  signOut(auth)
    .then(() => {
      //
    })
    .catch((error) => {
      console.log("Error" + error);
    })
);

// Blog section code here

const notify = document.querySelector(".notify");
const addPostBtn = document.querySelector("#post-btn");


function add_Post() {
  const title = document.querySelector("#title").value;
  const student_info = document.querySelector("#student_info").value;
  const id = Math.floor(Math.random() * 100);

  set(ref(db, "post/" + id), {
    title: title,
    student_info: student_info,
  });
  notify.innerHTML = "Student Data Added";
  document.querySelector("#title").value="";
  document.querySelector("#student_info").value="";
  GetPostData();
}

addPostBtn.addEventListener("click", add_Post);




// Get data from firebase db

function GetPostData() {
  const user_ref = ref(db, "post/");
  get(user_ref).then((snapshot) => {
    const data = snapshot.val();

    let html = "";
    const table = document.querySelector("table");
    for (const key in data) {
      const { title,student_info } = data[key];
      html += `
        <tr>
          <Td>
            <span class="postNumber"></span>
            <Td>${title}</Td>
            <td><button class="delete" onclick="delete_data(${key})">Delete</button></td>
            <td><button class="update" onclick="update_data(${key})">Update</button></td>
          </Td>
        </tr>`;
    }
    table.innerHTML = html;
  });
}

GetPostData();

// delete data

window.delete_data = function (key) {
  remove(ref(db, `post/${key}`));
  notify.innerHTML = "Data has been deleted.";
  GetPostData();
};

// get and updateData

window.update_data = function (key) {
  const user_ref = ref(db, `post/${key}`);

  get(user_ref).then((item) => {
    document.querySelector("#title").value = item.val().title;
    document.querySelector("#student_info").value = item.val().student_info;
    
  })

    const update_btn = document.querySelector(".update_btn");
    update_btn.classList.add("show");
    document.querySelector(".post-btn").classList.add("hide");
    GetPostData()
  
    // update
    update_btn.addEventListener("click", Update_form);
    function Update_form() {
      const title = document.querySelector("#title").value;
      const student_info = document.querySelector("#student_info").value;
  
      
      update(ref(db, `post/${key}`), {
        title:title,
        student_info:student_info,
        
      });
      notify.innerHTML = "Data has been Updated.";
      document.querySelector("#title").value;
      document.querySelector("#student_info").value;
      GetPostData();
    }
  update_btn.addEventListener('click',Update_form)
  

};
 