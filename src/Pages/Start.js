import React from 'react'
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import './Start.css'
function Start() {
    var provider = new firebase.auth.GoogleAuthProvider();
    const history = useHistory();
    const login = () =>{
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            history.push('');    
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    return (
        <div className="start_page">
            <h1>TODO APP</h1>
            <div class="button"  onClick={login}>
                <img  className = "google" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png" alt=""/>
                <p>Sign In with Google</p>
            </div>
        </div>
    )
}

export default Start
