import { useEffect, useContext, useState } from "react";
import DataTableDefault from "./data-table";
import ServiceContext from './context';
import UserCreationForm from './userCreationForm';
import Model from './model';
import { toast } from 'react-toastify';


export default function ListUsersPage() {
  const { list, setList, getAll, postServices } = useContext(ServiceContext);
  const [isCreating, setIsCreating] = useState(false);

  const _getData = () => {
    const params = {
      useCache: false,
    };
    return getAll(params);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const arr = [];
    const result = await _getData();
    result.getAllPages(res => {
      arr.push(...res.data.results);
      if (!result?.hasNextPage()) {
        setList(arr);
      }
    });
  }

  const handleAddUser = () => {
    setIsCreating(true);
  };

  const handleCreateUser = async (newUserData) => {
    try {
      await postServices(newUserData).then(res => {
        fetchData();
        setIsCreating(false);
        toast.success(res?.data?.message);
      }).catch(error => {
        toast.error(`${error?.response?.data?.errors[0]}`);
      })
    } catch (error) {
      toast.error(`Erro ao criar usuário: ${error}`);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <button 
        onClick={handleAddUser} 
        className="mb-4 px-4 py-2 bg-zinc-800 text-white rounded border-2 border-zinc-600 hover:bg-zinc-600"
      >
        Adicionar
      </button>

      <DataTableDefault data={list} />

      {isCreating && (
        <UserCreationForm 
          fields={Model.schema} 
          onSubmit={handleCreateUser} 
          onCancel={() => setIsCreating(false)} 
        />
      )}
    </div>
  );
}
