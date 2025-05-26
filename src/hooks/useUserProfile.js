import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import {auth,db } from 'firebase/auth';


const useUserProfile = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserName(userData.name);
        }
      }
    };

    fetchUserData();
  }, []);

  return userName;
};

export default useUserProfile;