import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

const useGetData = ( collectionName ) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const collectionRef = collection(db, collectionName);

    useEffect(() => {

            const getData = async() => {

                // === firebase firestore realtime database update ===
                // await getDocs(collectionRef, (snapshot) => {
                //     setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                //     setLoading(false);
                // });

                const docSnap = await getDocs(collectionRef);
          
                let data = [];
                await docSnap.forEach((doc) => {
                    data.push({ ...doc.data(), id: doc.id });
                });

                setData(data);
                setLoading(false);
            };

            getData();
    }, [collectionRef]);
    
    return { data, loading };
};

export default useGetData;