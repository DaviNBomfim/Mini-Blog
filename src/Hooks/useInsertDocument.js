import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config"
import { collection, addDoc, Timestamp } from "firebase/firestore";

const inicialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {

    switch(action.type){
        case "LOADING":
            return {loading: true, error: null}
        case "INSERTED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default: 
        return {state}
    }
}

export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, inicialState)

    const [canceled, setCanceled] = useState(false)

    const verificarCancel = (action) => {
        if(!canceled){
            dispatch(action)
        }
    }


    const insertDocument = async (document) => {

        verificarCancel({
            type:"LOADING"
        })

        try{

            const newDocument = {...document, createdAt:Timestamp.now()}

            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument 
            )

            verificarCancel({
                type:"INSERTED_DOC",
                payload: insertDocument
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

    return {insertDocument, response}
}


