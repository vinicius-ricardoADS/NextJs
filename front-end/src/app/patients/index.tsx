import { useEffect, useState } from 'react'
import { Patient } from '../components/interface'

export default function ListPatient() {
  const [patients, setPatients] = useState<Patient[]>()

  useEffect(() => {
    fetch('http://localhost:8888/pacientes/lista', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => setPatients(res))
  }, [])

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {patients ? (
            patients.map((pat) => (
              <tr key={pat.id}>
                <td>{pat.id}</td>
                <td>{pat.nome}</td>
                <td>{pat.cpf}</td>
                <td>{pat.sexo}</td>
                <td>{pat.datanasc}</td>
                <td>
                  <button value={pat.id}>Edit</button>{' '}
                </td>
                <td>
                  <button>Remove</button>{' '}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>
                <span className="visually-hidden">Loading...</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
