export default {
    model: 'users',
    api: '/users',
    apiAdd: '/register',
    schema: [
        { id: "select", type: "checkbox", hiddenCreator: true },
        { accessorKey: "username", header: "Usuário", type: "capitalize", fieldType: 'text', hiddenCreator: true },
        { accessorKey: "email", header: "Email", type: "sort", fieldType: 'email', required: true },
        { accessorKey: "firstName", header: "Nome", type: "sort", fieldType: 'text', required: true },
        { accessorKey: "lastName", header: "Sobrenome", type: "lowercase", fieldType: 'text', required: true },
        { accessorKey: "document", header: "Documento", type: "lowercase", fieldType: 'text' },
        { accessorKey: "mobile", header: "Celular", type: "lowercase", fieldType: 'mobile', },
        { accessorKey: "phone", header: "Telefone", type: "", fieldType: 'mobile' },
        {
            accessorKey: "gender", header: "Genero", type: "", required: true, fieldType: 'select', fieldOption: [{
                label: 'Masculino',
                value: 'M'
            }, {
                label: 'Feminino',
                value: 'F'
            }, {
                label: 'Outro',
                value: 'U'
            }]
        },
        { id: "actions", type: "actions", hiddenCreator: true },
        { accessorKey: "password", header: "Senha", type: "password", hiddenInTable: true }
    ],
    filters: [
        { input: 'email', name: 'E-mail' },
        { input: 'mobile', name: 'Celular' },
        { input: 'firstName', name: 'Nome' },
        { input: 'lastName', name: 'Sobrenome' },
    ]
}



// const columnModel = [
//     { id: "select", type: "checkbox" },
//     { accessorKey: "applicableTo", header: "Aplicavel para", type: "capitalize" },
//     { accessorKey: "email", header: "Email", type: "sort" },
//     { accessorKey: "amount", header: "Amount", type: "currency" },
//     { id: "actions", type: "actions" }
// ];