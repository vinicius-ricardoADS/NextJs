'use client'
import { useCallback, useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { IPatient } from '../components/interface'

const getPatients = async () => {
  const response = await api.get<IPatient[]>('/pacientes/lista')
  return response.data
}

const Patient = () => {
  const [patients, setPatients] = useState<IPatient[] | null>(null)

  const handlePatients = useCallback(async () => {
    const response = await getPatients()
    setPatients(response)
  }, [])

  useEffect(() => {
    handlePatients()
  }, [handlePatients])

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full bg-gray-900 text-left text-sm text-gray-200 dark:text-gray-300">
            <thead className="text-xs uppercase text-gray-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Cpf</th>
                <th>Sex</th>
                <th>Date of Birth</th>
                <th colSpan={2}>Options</th>
              </tr>
            </thead>
            <tbody>
              {patients ? (
                patients.map((pat) => (
                  <tr
                    className="hover:bg-gray-700 dark:hover:bg-gray-600"
                    key={pat.id}
                  >
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
      </div>
    </>
  )
}

export default Patient
