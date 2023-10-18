import { useEffect, useState } from 'react'
import './App.css'

import { useOpciones } from './hooks/useOpciones.js'

function App() {
  const [opcionesProvincia, setOpcionesProvincia] = useState([]);
  const [opcionesDistrito, setOpcionesDistrito] = useState([]);
  const [alumnos, setAlumnos] = useState([])

  const [departamento, setDepartamento] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");
  const [formulario, setFormulario] = useState({
    nombres: "",
    dni: "",
    carrera: "",
    departamento: "",
    provincia: "",
    distrito: ""
  })

  const { obtenerProvincias } = useOpciones();
  const { obtenerDistritos } = useOpciones();
  const { obtenerAlumnos } = useOpciones();
  const { registrarAlumno } = useOpciones();

  useEffect(() => {

    obtenerAlumnos().
      then(alumnos => setAlumnos(alumnos))
  }, [])

  const handlechange = async (event) => {

    const value = event.target.value;
    const name = event.target.name;
    setFormulario({ ...formulario, [name]: value })
  }

  const handlechangeDepartamento = async (event) => {

    const seleccion = event.target.value;
    setDepartamento(seleccion);
    const data = await obtenerProvincias(seleccion);
    setOpcionesProvincia(data);
  }

  const handlechangeProvincia = async (event) => {

    const seleccion = event.target.value;
    setProvincia(seleccion);
    const data = await obtenerDistritos(seleccion);
    setOpcionesDistrito(data);
  }

  const handlechangeDistrito = async (event) => {

    const seleccion = event.target.value;
    setDistrito(seleccion);
  }

  const handleSubmit = (event) => {

    event.preventDefault();
    setFormulario({ ...formulario, departamento: departamento, provincia: provincia, distrito: distrito })

    registrarAlumno(formulario);
    obtenerAlumnos().
      then(alumnos => setAlumnos(alumnos))

    setFormulario({
      nombres: "",
      dni: "",
      carrera: "",
      departamento: "",
      provincia: "",
      distrito: ""
    });
  }

  return (
    <main className='w-full min-h-screen p-4 bg-black text-white'>

      <h1 className='pt-4 pb-8 text-3xl font-bold text-center'>Registro de Alumnos 📝</h1>

      <section className='w-full md:w-3/4 lg:w-1/2 mx-auto'>

        <div className='w-full p-2 flex border font-bold text-xs'>
          <span className='w-1/6'>Nombres</span>
          <span className='w-1/6'>DNI</span>
          <span className='w-1/6'>Carrera</span>
          <span className='w-1/6'>Departamento</span>
          <span className='w-1/6'>Provincia</span>
          <span className='w-1/6'>Distrito</span>
        </div>

        {alumnos.map(alumno => {
          return (
            <div
              key={alumno.id}
              className='w-full p-1 flex border text-xs'>
              <span className='w-1/6'>{alumno.nombres}</span>
              <span className='w-1/6'>{alumno.dni}</span>
              <span className='w-1/6'>{alumno.carrera}</span>
              <span className='w-1/6'>{alumno.departamento}</span>
              <span className='w-1/6'>{alumno.provincia}</span>
              <span className='w-1/6'>{alumno.distrito}</span>
            </div>
          )
        })}

      </section>

      <br className='py-4' />

      <form
        className='w-full md:w-3/4 lg:w-1/2 mx-auto'
        onSubmit={handleSubmit}>

        <label>
          <h5 className='font-bold py-3'>Nombres</h5>
          <input
            type='text'
            name='nombres'
            value={formulario.nombres}
            onChange={handlechange}
            className='w-full p-3 rounded-md text-black' />
        </label>

        <label>
          <h5 className='font-bold py-3'>DNI</h5>
          <input
            type='text'
            name='dni'
            value={formulario.dni}
            onChange={handlechange}
            className='w-full p-3 rounded-md text-black' />
        </label>

        <label>
          <h5 className='font-bold py-3'>Carrera</h5>
          <input
            type='text'
            name='carrera'
            value={formulario.carrera}
            onChange={handlechange}
            className='w-full p-3 rounded-md text-black' />
        </label>

        <label>
          <h5 className='font-bold py-3'>Departamento</h5>
          <select
            name="departamento"
            className='w-full p-3 rounded-md text-black'
            value={departamento}
            onChange={handlechangeDepartamento}
            required>

            <option value="null">Seleccionar Departamento</option>
            <option value="cajamarca">Cajamarca</option>
          </select>
        </label>

        <label>
          <h5 className='font-bold py-3'>Provincia</h5>
          <select
            name="provincia"
            className='w-full p-3 rounded-md text-black'
            value={provincia}
            onChange={handlechangeProvincia}
            required>

            <option value="null">
              Seleccionar Provincia
            </option>

            {opcionesProvincia?.map(provincia => {
              return (
                <option
                  key={provincia.id}
                  value={provincia.nombre}
                  className='capitalize'>
                  {provincia.nombre}
                </option>
              )
            })}
          </select>
        </label>

        <label>
          <h5 className='font-bold py-3'>Distrito</h5>
          <select
            name="distrito"
            className='w-full p-3 rounded-md text-black'
            value={distrito}
            onChange={handlechangeDistrito}
            required>

            <option value="null">
              Seleccionar Distrito
            </option>

            {opcionesDistrito?.map(distrito => {
              return (
                <option
                  key={distrito.id}
                  value={distrito.nombre}
                  className='capitalize'>
                  {distrito.nombre}
                </option>
              )
            })}
          </select>
        </label>

        <input
          type="submit"
          value="Registrar 💾"
          className='w-full p-3 my-6 bg-green-500 rounded-lg font-bold text-xl' />

      </form>

    </main>
  )
}

export default App
