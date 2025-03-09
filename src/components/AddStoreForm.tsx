// src/components/AddStoreForm.tsx

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface AddStoreFormProps {
    showForm: boolean;
    onSubmit: (storeData: StoreData) => void;
    onClose: () => void;
    initialData?: StoreData | null
}

export interface StoreData {
    sno?: number; 
    store: string;
    city: string;
    state: string;
}

const AddStoreForm: React.FC<AddStoreFormProps> = ({ showForm, onSubmit, onClose, initialData }) => {
    const [storeData, setStoreData] = useState<StoreData>({
        store: '',
        city: '',
        state: '',
    });

    useEffect(() => {
        if (initialData) {
            setStoreData(initialData); // Populate form with initial data for updating
        }
    }, [initialData]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStoreData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(storeData); // Send the data to the parent component (Store)
        setStoreData({ store: '', city: '', state: '' }); // Reset the form fields
    };

    return (
        <>
            {showForm && (
                <div className="fixed inset-0  bg-opacity-70 backdrop-blur-[5px] z-50 flex justify-center items-center">
                    <div className="fixed top-[100px] left-[50%] transform -translate-x-[50%] bg-white p-5 shadow-xl rounded-md w-[600px] ">
                        <h3 className="text-lg font-semibold mb-4">
                            {initialData ? 'Edit Store' : 'Add New Store'}
                        </h3>                        
                        <form onSubmit={handleSubmit}>
                            
                            <div className="mb-3">
                                <label className="block text-sm font-medium">Store Name</label>
                                <input
                                    type="text"
                                    name="store"
                                    value={storeData.store}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-medium">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={storeData.city}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-medium">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={storeData.state}
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
                                    {initialData ? "Update Store" : "Add Store"}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            )}
        </>
    );
};

export default AddStoreForm;
