import {useEffect} from "react";
import firebase from "firebase";
import {useHistory} from "react-router-dom";
import {message} from "antd";

const FirebaseAuth = ({ setUser }) => {
    let history = useHistory();
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User

                console.log('====> user onAuthStateChanged', user, history)
                setUser(user)

                message.success(`Signed in successfully.`);
                history.push('/')
                // ...
            } else {
                // User is signed out
                // ...
                setUser(null)
                message.success(`Signed out successfully.`);
                history.push('/signin')

            }
        });

    }, [])

    return null
}

export default FirebaseAuth
