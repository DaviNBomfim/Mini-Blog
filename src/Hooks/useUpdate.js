import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config"
import { updateDoc, doc } from "firebase/firestore";

const inicialState = {
    loading: null,
    error: null
}

const updateReducer = (state, action) => {

    switch(action.type){
        case "LOADING":
            return {loading: true, error: null}
        case "UPDATED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default: 
        return {state}
    }
}

export const useUpdateDocument = (docCollection) => {
    const [response, dispatch] = useReducer(updateReducer, inicialState)

    const [canceled, setCanceled] = useState(false)

    const verificarCancel = (action) => {
        if(!canceled){
            dispatch(action)
        }
    }


    const updateDocument = async (id, data) => {

        verificarCancel({
            type:"LOADING"
        })

        try{

            const updateRef = await doc(db, docCollection, id)

            const updatedDocument =  await updateDoc(updateRef, data)

            verificarCancel({
                type:"UPDATED_DOC",
                payload: updatedDocument
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

    return {updateDocument, response}
}


