import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {connect} from "react-redux";

//Connection with firebase using custom configuration
const config = {
    apiKey: "AIzaSyBAkAS7D3Y7XFfIO88bIHrGIZrki9e5sGU",
    authDomain: "suvassa-10c10.firebaseapp.com",
    projectId: "suvassa-10c10",
    storageBucket: "suvassa-10c10.appspot.com",
    messagingSenderId: "497763351885",
    appId: "1:497763351885:web:2b5799685eb6bf17c24b04",
    measurementId: "G-PMMTJJ2W76"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    //Checking if user already exits
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    console.log(snapShot);
    console.log(userRef);
    //Creating user data
    if(!snapShot.exists) {
        const { displayName, email, password} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                password,
                createdAt,
                ...additionalData
            });
            console.log('user created');
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}


// export const getCart= (user)=> {
//     const userRef= firestore.collection('users').doc(user?.uid);
//    userRef
//         .get()
//         .then(function(doc) {
//            if (doc.exists) {
//                return doc.data().cartItems;
//                // console.log("Document data:", doc.data());
//            } else {
//                // doc.data() will be undefined in this case
//                console.log("No such document!");
//            }
// })}

export const getName= (user)=>{
    firestore
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc=>{
            if(doc.exists){
                console.log(doc.data().displayName);
                return doc.data().displayName;
            }else{
                console.log("user not found");
                return 'User';
            }
        })
}

// export const updateCart= (user, cart)=> {
//     cart.map(cartItem=>
//     firestore
//         .collection('users')
//         .doc(user?.uid)
//         .update({
//             cartItems: firebase.firestore.FieldValue.arrayUnion(cartItem)
//         })
//     )
// }

export const addItemToCart= (user, item)=>{
    const ref= firestore.collection('users').doc(user?.uid).collection('cartItems').doc(item.id);
    ref
        .get()
        .then(doc=>{
            if(doc.exists){
                ref
                    .update({
                        quantity: firebase.firestore.FieldValue.increment(1)
                    })
            }else{
                ref
                    .set({
                        item: item,
                        quantity:1
                    })
            }
        })
}

export const removeItemFromCart= (user, itemId)=> {
    const ref= firestore.collection('users').doc(user?.uid).collection('cartItems').doc(itemId);
    ref
        .update({
            quantity: firebase.firestore.FieldValue.increment(-1)
        })
    ref
        .get()
        .then(doc=>{
            if(doc.data().quantity<=0){
                ref
                    .delete()
                    .then(()=>{
                        console.log("deleted successfully")
                    })
                    .catch(err=>{
                        console.log("item not found")
                    })
            }
        })
}

export const getCartItems= (user)=> {
    let items= [];
    firestore
    .collection('users')
    .doc(user?.uid)
    .collection('cartItems')
    .get()
        .then(snapshot=> {
            snapshot.docs.map(doc => {
                items.push(doc.data())
                //console.log(items)
            }
            );
        })
    return items;
}

// firebase.initializeApp(config);
//
// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;














