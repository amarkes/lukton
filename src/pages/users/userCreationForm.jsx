import { useState } from "react";
import MaskedInput from "react-text-mask";

export default function UserCreationForm({ fields, onSubmit, onCancel }) {
    const [formData, setFormData] = useState(
        fields
            .filter(field => !field.hiddenCreator)
            .reduce((acc, field) => {
                acc[field.accessorKey] = "";
                return acc;
            }, {})
    );
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false, // Limpa o erro ao modificar o campo
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        fields.forEach((field) => {
            if (field.required && !formData[field.accessorKey]) {
                newErrors[field.accessorKey] = `${field.header} é obrigatório.`;
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const filteredFormData = Object.keys(formData)
                .filter((key) => formData[key] !== "" && formData[key] !== null && formData[key] !== undefined)
                .reduce((acc, key) => {
                    acc[key] = formData[key];
                    return acc;
                }, {});
    
            onSubmit(filteredFormData);
        }
    };
    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Adicionar</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap gap-4">
                        {fields.map((field) => (
                            field.hiddenCreator ? null : (
                                <div key={field.accessorKey || field.id} className="mb-4 flex-1 min-w-[45%]">
                                    <label className="block text-gray-700">{field.header}</label>

                                    {field.fieldType === "checkbox" ? (
                                        <input
                                            type="checkbox"
                                            name={field.accessorKey}
                                            checked={formData[field.accessorKey] || false}
                                            onChange={handleChange}
                                            className="w-4 h-4"
                                        />
                                    ) : field.fieldType === "select" ? (
                                        <select
                                            name={field.accessorKey}
                                            value={formData[field.accessorKey] || ""}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded"
                                        >
                                            <option value="">Selecione</option>
                                            {field.fieldOption.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : field.fieldType === "mobile" ? (
                                        <MaskedInput
                                            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            placeholder="(00) 00000-0000"
                                            name={field.accessorKey}
                                            value={formData[field.accessorKey] || ""}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        <input
                                            type={field.fieldType || "text"}
                                            name={field.accessorKey}
                                            value={formData[field.accessorKey] || ""}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    )}

                                    {/* Exibe a mensagem de erro se o campo for obrigatório e estiver vazio */}
                                    {errors[field.accessorKey] && (
                                        <p className="text-red-500 text-sm mt-1">{errors[field.accessorKey]}</p>
                                    )}
                                </div>
                            )
                        ))}
                    </div>

                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
