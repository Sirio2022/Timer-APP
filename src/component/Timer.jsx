import { useState, useEffect, useRef } from 'react';

export default function Timer() {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [tipo, setTipo] = useState('Contador');

  const toggle = () => {
    setActivo(!activo);
  };

  const reset = () => {
    setSegundos(0);
    setActivo(false);
    myRef.current.value = '';
  };

  const cambiarTipo = () => {
    if (tipo === 'Contador') {
      setTipo('Cuenta regresiva');
    }
    if (tipo === 'Cuenta regresiva') {
      setTipo('Contador');
    }
  };

  useEffect(() => {
    let intervalo = null;
    if (activo && tipo === 'Contador') {
      intervalo = setInterval(() => {
        setSegundos((segundos) => segundos + 1);
      }, 1000);
    }
    if (activo && tipo === 'Cuenta regresiva') {
      intervalo = setInterval(() => {
        setSegundos((segundos) => segundos - 1);
      }, 1000);
    }
    if (!activo && segundos !== 0) {
      clearInterval(intervalo);
    }
    if (segundos === 0 && tipo === 'Cuenta regresiva') {
      reset();
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [segundos, activo, tipo]);

  const myRef = useRef(null);

  function agregaSegundos() {
    let ref = myRef.current.value;

    setSegundos(ref);
  }

  return (
    <div
      className="flex h-screen justify-center 
    items-center flex-col"
    >
      <div>
        <h1 className="text-4xl font-bold p-2">{segundos}s</h1>
      </div>
      <div className="flex gap-2 p-2">
        <button
          onClick={toggle}
          className={`w-full cursor-pointer rounded p-3 uppercase transition-colors text-white ${
            activo
              ? 'bg-gray-600 hover:bg-gray-700'
              : 'bg-sky-600 hover:bg-sky-700'
          }`}
        >
          {activo ? 'Pausar' : 'Iniciar'}
        </button>
        <button
          className="w-full cursor-pointer rounded bg-sky-600 p-3 uppercase text-white transition-colors hover:bg-sky-700"
          onClick={reset}
        >
          Resetear
        </button>
        <button
          className="w-full cursor-pointer rounded bg-sky-600 p-3 uppercase text-white transition-colors hover:bg-sky-700"
          onClick={cambiarTipo}
        >
          {tipo}
        </button>
      </div>
      {tipo === 'Cuenta regresiva' && (
        <input
          ref={myRef}
          type="number"
          min="0"
          placeholder="Ingrese los segundos"
          autoComplete="off"
          className="border-2 border-gray-300 p-2 rounded text-center shadow-2xl"
          onChange={agregaSegundos}
        />
      )}
    </div>
  );
}
