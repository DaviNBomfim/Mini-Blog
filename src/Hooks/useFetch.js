import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  doc, getDoc
} from "firebase/firestore";

export const useFetch = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //deal with memory leak7
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const loadDocument = async () => {
      if (cancelled) return;
      setLoading(true);

        try {
            const docRef = await doc(db, docCollection, id);
            const docSnap = await getDoc(docRef);
            setDocument(docSnap.data());
            setLoading(false);

        } catch (error) {
            console.log(error.message);
            setError(error.message);
            setLoading(true);
        }
      
    }
         
    loadDocument();
  }, [docCollection, id, cancelled]);


    useEffect(() => {
    return () => setCancelled(true);
    }, []);

  return { document, error, loading };
};
