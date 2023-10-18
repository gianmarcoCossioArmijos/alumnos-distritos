import { where,getDocs,collection,query,addDoc } from "firebase/firestore";
import { db } from "../services/firebase.js";

export const useOpciones = () => {

  const referenciaProvincia = collection(db, "provincias");
  const referenciaDistritos = collection(db, "distritos");
  const referenciaAlumnos = collection(db, "alumnos");

  const obtenerProvincias = async (departamento) => {

    try {

        const q = query(referenciaProvincia, where("departamento", "==", departamento));
        const data = await getDocs(q);
        const results = [];

        data.forEach(doc => {
                
            results.push({
                id: doc.id,
                ...doc.data()
            })
        });
        return results;
    } catch (error) {

        console.log(error);
    }
  }

  const obtenerDistritos = async (provincia) => {

    try {

        const q = query(referenciaDistritos, where("provincia", "==", provincia));
        const data = await getDocs(q);
        const results = [];

        data.forEach(doc => {
                
            results.push({
                id: doc.id,
                ...doc.data()
            })
        });
        return results;
    } catch (error) {

        console.log(error);
    }
  }

  const obtenerAlumnos = async () => {

    try {

        const q = query(referenciaAlumnos);
        const data = await getDocs(q);
        const results = [];

        data.forEach(doc => {
                
            results.push({
                id: doc.id,
                ...doc.data()
            })
        });
        return results;
    } catch (error) {

        console.log(error);
    }
  }

  const registrarAlumno = async(alumno) => {

    try {
      await addDoc(referenciaAlumnos, alumno);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    obtenerProvincias,
    obtenerDistritos,
    obtenerAlumnos,
    registrarAlumno
  }
};
