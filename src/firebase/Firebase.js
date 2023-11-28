// Import the functions you need from the SDKs you need
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { firebaseConfig } from "../firebase.config";
import { initializeApp } from "firebase/app";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Google Login
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        authProvider: "Google",
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Signup with Email And Password
const signupWithEmail = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
      authProvider: "local",
    });
    alert("User registered successfully");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Github Login
const githubProvider = new GithubAuthProvider();
const signInWithGithub = async () => {
  try {
    const res = await signInWithPopup(auth, githubProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        authProvider: "Google",
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Login with Email and Password
const loginWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Reset Password
const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password Reset Email sent !");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Logout
const logout = () => {
  signOut(auth);
};

// Get User Details
const getUser = async (user) => {
  const q = query(collection(db, "users"), where("uid", "==", user.uid));
  let userDetails = [];
  const docs = await getDocs(q);
  docs.forEach((doc) => {
    // console.log(doc.data());
    userDetails.push(doc.data());
  });
  return userDetails[0];
};

// Add to Firebase Cart
const addToFirebaseCart = async (user, cart) => {
  try {
    const q = query(collection(db, "cart"), where("email", "==", user.email));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "cart"), {
        uid: user.uid,
        email: user.email,
        cart: cart,
      });
    } else {
      const preCart = [];
      docs.forEach((doc) => preCart.push(doc.data().cart));
      // console.log(preCart[0]);

      // const updatedCart = preCart[0].concat(cart)
      const updatedCart = preCart[0]
        .concat(cart)
        .filter(
          (obj, index) =>
            index ===
            preCart[0]
              .concat(cart)
              .findIndex(
                (product) =>
                  obj._id === product._id && obj.size === product.size
              )
        );
      await updateDoc(doc(db, "cart", docs.docs[0].id), {
        cart: updatedCart,
      });
    }
    return docs.docs;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Get Cart
const setCart = async (user) => {
  try {
    const q = query(collection(db, "cart"), where("email", "==", user.email));
    const docs = await getDocs(q);
    const previousCart = [];
    if (docs.docs.length !== 0) {
      docs.forEach((doc) => {
        previousCart.push(doc.data());
      });
      // console.log(previousCart);
      return previousCart[0].cart;
    }
    return 0;
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  signupWithEmail,
  signInWithGithub,
  loginWithEmail,
  resetPassword,
  getUser,
  logout,
  addToFirebaseCart,
  setCart,
};

// // Get Users
// const users = [];
// const data = await getDocs(collection(db, "users"));
// if (data) {
//   data.forEach((item) => {
//     users.push(item.data());
//   });
// }
// export { users };
// export const addUser = async (user, cart, fav) => {
//   try {
//     if (!users.find((userEmail) => userEmail.email === user.email)) {
//       await setDoc(doc(db, "users", user.email), {
//         name: user.displayName,
//         email: user.email,
//         cart: cart,
//         fav: fav,
//       });
//       // console.log("Document written with ID: ", docRef.id);
//     } else if (!users.find((userCart) => userCart.cart === cart)) {
//       await updateDoc(doc(db, "users", user.email), {
//         cart: cart,
//       });
//     } else if (!users.find((userFav) => userFav.fav === user.fav)) {
//       await updateDoc(doc(db, "users", user.email), {
//         fav: fav,
//       });
//     }
//     console.log(users);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };
// export const getCartData = async (user) => {
//   const userCart = [];
//   const userFav = [];
//   const docRef = doc(db, "users", user.email);
//   const data = await getDoc(docRef);
//   if (data.exists()) {
//     userCart.push(data.data().cart);
//     userFav.push(data.data().fav);
//     console.log(userCart, userFav);
//   } else console.log("no data");
// };
