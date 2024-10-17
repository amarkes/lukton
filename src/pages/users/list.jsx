import { useEffect, useState } from "react";
import { columns } from "./columns";
import DataTableDefault from "./data-table";

async function getData() {
  // Fetch data from your API here.
  return Array(115).fill().map((_, index) => ({
    id: index + 1,
    nome: `Pessoa ${index + 1}`,
    status: 'pending',
    email: `${index}-email@gmail.com`
  }));;
}

export default function ListUsersPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTableDefault columns={columns} data={data} />
    </div>
  );
}
