import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config"
import { doc, deleteDoc } from "firebase/firestore";

const inicialState = {
    loading: null,
    error: null
}

const deleteReducer = (state, action) => {

    switch(action.type){
        case "LOADING":
            return {loading: true, error: null}
        case "DELETED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default: 
        return {state}
    }
}

export const useDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, inicialState)

    const [canceled, setCanceled] = useState(false)

    const verificarCancel = (action) => {
        if(!canceled){
            dispatch(action)
        }
    }


    const deleteDocument = async (id) => {

        verificarCancel({
            type:"LOADING"
        })

        try{

            const deleteDocument = await deleteDoc(doc(db, docCollection, id))

            verificarCancel({
                type:"DELETED_DOC",
                payload: deleteDocument
            })

        }catch(err){

            verificarCancel({
                type:"ERROR",
                payload: err.message,
            })
        }
    }

    useEffect(()=> {
        return () => setCanceled(true);
    }, []);

    return {deleteDocument, response}
}


