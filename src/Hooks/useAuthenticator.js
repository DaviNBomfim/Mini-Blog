
import { db } from "../firebase/config"
import { app } from "../firebase/config"

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import {useState, useEffect} from 'react';


export const useAuthenticator = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //Clean Up
    const [cancel, setCancel] = useState(false)


    const auth = getAuth(app);


    function checkCancel(){
        if (cancel){
            return;
        }
    }


    //REGISTER
    const createUser = async (data) => {
        checkCancel()
        setLoading(true)
        setError(null)


        try{

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.senha
            )
            await updateProfile(user, {displayName:data.nome})
            setLoading(false)
            return user;

        
        } catch (error) {

            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if(error.message.includes("password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
    
            } else if (error.message.includes("email-already")){
                systemErrorMessage = "Email já cadastrado."
            } else {
                systemErrorMessage = "Ocorreu um erro no sistema. Tente mais tarde!"
            }

            setLoading(false)
            setError(systemErrorMessage)
        }
    }


    //LOG OUT - SIGN OUT
    const logout = () => {
        checkCancel()
        signOut(auth)
    }

    //LOGIN - SIGN IN
    const login = async (data) => {
        checkCancel()
        setLoading(true)
        setError(false)

        try{
        
            await signInWithEmailAndPassword(auth, data.email, data.senha)
            setLoading(false)


        } catch (error) {

            let systemErrorMessage

            if(error.message.includes("invalid")){
                systemErrorMessage = "Usuário ou Senha inválido."
            } else {
                systemErrorMessage = "Ocorreu um erro no sistema. Tente mais tarde!"
            }
            
            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCancel(true);
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    }
}