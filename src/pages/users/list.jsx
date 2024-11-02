import { useEffect, useState, useContext } from "react";
import DataTableDefault from "./data-table";
import ServiceContext from './context';

// async function getData() {
//   const params = {
//     useCache: false,
//   }
// return UsersServices.getAll(params);
// Fetch data from your API here.
// return Array(350).fill().map((_, index) => ({
//   id: index + 1,
//   amount: index + 1,
//   status: 'pending',
//   email: `${index}-email@gmail.com`
// }));;
// }

export default function ListUsersPage() {
  // const [data, setData] = useState([]);
  const { list, setList, getAll } = useContext(ServiceContext);

  const _getData = () => {
    const params = {
      useCache: false,
    }
    return getAll(params);
  };

  useEffect(() => {
    async function fetchData() {
      const arr = [];
      const result = await _getData();
      result.getAllPages(res => {
        arr.push(...res.data.results);
        if (!result?.hasNextPage()) {
          console.log(arr)
          setList(arr);
        }

      });
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTableDefault data={list} />
    </div>
  );
}
