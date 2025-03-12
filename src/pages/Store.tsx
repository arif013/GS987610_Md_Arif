import { AgGridReact } from 'ag-grid-react'; // Import the AG-Grid component
import { ColDef, RowDragModule, Theme } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';  // Import the required module
import {
    themeQuartz,
} from 'ag-grid-community';


// Register the module
const modules = [ClientSideRowModelModule, RowDragModule];

import { useMemo, useState } from 'react';
import AddStoreForm, { StoreData } from '../components/AddStoreForm';
import { storeData } from '../data/storeData';

interface RowData {
    sno?: number;
    store: string;
    city: string;
    state: string
}


function Store() {
    // Row data
    const [rowData, setRowData] = useState<RowData[]>(storeData || [])
    const [showForm, setShowForm] = useState(false)
    const [editingStore, setEditingStore] = useState<StoreData | null>(null)
    // const [newStore, setNewStore] = useState<RowData>({sno:0,store:'',city:'',state:''})
    const myTheme = themeQuartz.withParams({
        borderColor: "#9696C8",
        wrapperBorder: false,
        headerRowBorder: false,
        rowBorder: { style: "dotted", width: 3 },
        columnBorder: { style: "dashed" },
    });

    const theme = useMemo<Theme | "legacy">(() => {
        return myTheme;
    }, []);

    const columnDefs: ColDef[] = [
        {
            headerName: '',
            cellRenderer: (params: any) => (
                <button
                    onClick={() => handleDelete(params.data.sno)}
                    className="text-red-500 hover:text-red-700 px-2 py-1 rounded"
                >
                    Delete
                </button>
            ),
            maxWidth: 120,
            suppressSizeToFit: true, // Prevent auto-resizing
            rowDrag: true,
        },
        {
            headerName: '',
            cellRenderer: (params:any) => (
                <button
                onClick={()=> handleEdit({...params.data})}
                className="text-blue-500 hover:text-black px-2 py-1 rounded"
                >
                    Edit
                </button>
            ),
            maxWidth: 120,
            suppressSizeToFit: true,
        },
        { headerName: 'S.No', field: 'sno' },
        { headerName: 'Store', field: 'store' },
        { headerName: 'City', field: 'city' },
        { headerName: 'State', field: 'state' },

    ];
    
    const defaultColDef = {
        editable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
    };
    const handleDelete = (sno: number) => {
        // Filter out the row with the matching 'sno'
        const updatedRowData = rowData.filter(row => row.sno !== sno);
        setRowData(updatedRowData); // Update state with the remaining rows
    };
    const handleEdit = (store: RowData)=>{
        setEditingStore({
            sno: store.sno,
            store: store.store,
            city: store.city,
            state: store.state
        })
        setShowForm(true)
    }
  
    
    const handleAddStore = (newStoreData: StoreData) => {
        // console.log(newStoreData.sno, newStoreData.city)
        if (newStoreData.sno) {
            // If sno exists, we update the store
            setRowData((prevData) =>
                prevData.map((row) =>
                    row.sno === newStoreData.sno ? { ...row, ...newStoreData } : row
                )
            );
            console.log('this is called')
        } else {
            // If no sno exists, we add a new store
            const newSno = rowData.length
                ? Math.max(...rowData.map((row) => row.sno as number)) + 1
                : 1;
            newStoreData = { ...newStoreData, sno: newSno };
            setRowData((prevData) => [...prevData, newStoreData]);
            console.log("full")
        }
    
        // setNewStore({ sno: 0, store: '', city: '', state: '' });
        setEditingStore(null)
        setShowForm(false);
    };
    



    return (
        <>

            <div className="ag-theme-alpine flex flex-col h-full  ml-[200px] mt-[40px] p-[20px]">
                <AgGridReact
                    theme={theme}
                    columnDefs={columnDefs}
                    rowData={rowData}
                    // pagination={true}
                    // paginationPageSize={5}
                    defaultColDef={defaultColDef}
                    domLayout="autoHeight"
                    modules={modules}
                    sideBar
                    rowDragManaged
                />
            </div>
            <div className='w-full bg-blue-100 shadow-xl sticky bottom-0 h-[50px] block'>
                <button
                    className='bg-blue-500 text-white px-[20px] py-[5px] rounded-[5px] ml-[200px] fixed bottom-2'
                    onClick={() => setShowForm(!showForm)}
                >
                    Add Store
                </button>
            </div>

            {/* Add Store Form */}
            <AddStoreForm
                showForm={showForm}
                onSubmit={handleAddStore}
                onClose={() => setShowForm(false)}
                initialData={editingStore || null}
            />
        </>
    )
}




export default Store