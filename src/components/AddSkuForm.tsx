// src/components/AddSkuForm.tsx

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface AddSkuFormProps {
    showForm: boolean;
    onSubmit: (SkuData: SkuData) => void;
    onClose: () => void;
    initialData?: SkuData | null
}

export interface SkuData {
    sno?: number;
    id: string; 
    sku: string;
    class: string;
    department: string;
    price: number;
    cost: number;
}

const AddSkuForm: React.FC<AddSkuFormProps> = ({ showForm, onSubmit, onClose, initialData }) => {
    const [skuData, setSkuData] = useState<SkuData>({
        sno: 0,
        id: '',
        sku: '',
        class: '',
        department: '',
        price: 0,
        cost: 0,
    });

    useEffect(() => {
        if (initialData) {
            setSkuData(initialData); // Populate form with initial data for updating
        }else{
            setSkuData({sno:0, id: '', sku: '', class: '', department:'', price: 0, cost: 0 });
        }
    }, [initialData]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSkuData((prevState) => ({
            ...prevState,
            [name]: name === 'price' || name === 'cost' ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(skuData); // Send the data to the parent component (Sku)
        setSkuData({sno:0, id: '', sku: '', class:'', department:'', price: 0, cost: 0 }); // Reset the form fields
    };

    return (
        <>
            {showForm && (
                <div className="fixed inset-0  bg-opacity-70 backdrop-blur-[5px] z-50 flex justify-center items-center">
                    <div className="fixed top-[100px] left-[50%] transform -translate-x-[50%] bg-white p-5 shadow-xl rounded-md w-[600px] ">
                        <h3 className="text-lg font-semibold mb-4">
                            {initialData ? 'Edit Sku' : 'Add New Sku'}
                        </h3>                        
                        <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                                <label className="block text-sm font-medium">ID</label>
                                <input
                                    type="text"
                                    name="id"
                                    value={skuData.id}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-medium">Sku Name</label>
                                <input
                                    type="text"
                                    name="sku"
                                    value={skuData.sku}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-medium">Class</label>
                                <input
                                    type="text"
                                    name="class"
                                    value={skuData.class}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                                <div className="mb-3">
                                <label className="block text-sm font-medium">Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={skuData.department}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                            </div>
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-medium">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={skuData.price}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-medium">Cost</label>
                                <input
                                    type="number"
                                    name="cost"
                                    value={skuData.cost}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-400 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    {initialData ? "Update Sku" : "Add Sku"}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            )}
        </>
    );
};

export default AddSkuForm;
