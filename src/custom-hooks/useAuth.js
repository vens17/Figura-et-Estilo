import {useEffect, useState} from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db,  auth } from "../firebase.config";
import _ from 'lodash';

const useAuth = () => {

    const [currentUser, setCurrentUser] = useState({});

    useEffect (() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) { 
                const userInfo = await getDoc(doc(db, 'users', user.uid));

                if (userInfo.exists()) {
                    const data = userInfo.data();
                    user = _.merge(user, { type: data.type, likes: data.likes ?? [], reserves: data.reserves ?? [] })
                }
                
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });
    });

    return {
        currentUser,
    };
};

export default useAuth;