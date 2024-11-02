export default {
    model: 'users',
    api: '/users',
    schema: [
        { id: "select", type: "checkbox" },
        { accessorKey: "username", header: "Usuário", type: "capitalize" },
        { accessorKey: "email", header: "Email", type: "sort" },
        { accessorKey: "firstName", header: "Nome", type: "sort" },
        { accessorKey: "lastName", header: "Sobrenome", type: "lowercase" },
        { accessorKey: "document", header: "Documento", type: "lowercase" },
        { accessorKey: "mobile", header: "Celular", type: "lowercase" },
        { accessorKey: "phone", header: "Telefone", type: "" },
        { accessorKey: "gender", header: "Genero", type: "" },
        { id: "actions", type: "actions" }
    ],
    filters: [
        {input: 'email', name: 'E-mail'},
        {input: 'mobile', name: 'Celular'},
        {input: 'firstName', name: 'Nome'},
        {input: 'lastName', name: 'Sobrenome'},
    ]
}


// const columnModel = [
//     { id: "select", type: "checkbox" },
//     { accessorKey: "applicableTo", header: "Aplicavel para", type: "capitalize" },
//     { accessorKey: "email", header: "Email", type: "sort" },
//     { accessorKey: "amount", header: "Amount", type: "currency" },
//     { id: "actions", type: "actions" }
// ];