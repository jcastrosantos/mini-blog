import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  // signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useState, useEffect } from "react";
import {app} from "../firebase/config";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanUp
  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth(app);

  function checkIfsCancelled() {
    if (cancelled) {
      return;
    }
  }
  //REGISTER
  const createUser = async (data) => {
    checkIfsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa de 6 ou mais caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "email ja cadastrado.";
      } else {
        systemErrorMessage = "ocorreu um erro, por favor tente mais tarde.";
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };
  //LOGOUT
  const logout = () => {
    checkIfsCancelled();

    auth.signOut();
  };
  //LOGIN
  const login = async (data) => {
    checkIfsCancelled();

    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      console.log("Erro recebido:", error.code);
      let systemErrorMessage;

      if (error.message.includes("invalid-credential")) {
        systemErrorMessage = "Dados inválidos. Verifique seu email e senha.";
      } else {
        systemErrorMessage =
          "Houve um problema na conexão com o servidor, tente mais tarde.";
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };
  //password recovery
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
