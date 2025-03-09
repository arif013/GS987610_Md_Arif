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

interface RowData {
    sno?: number;
    store: string;
    city: string;
    state: string
}

function Store() {
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
    // Row data
    const [rowData, setRowData] = useState<RowData[]>([
        { sno: 1, store: 'San Francisco Bay Trends', city: 'San Francisco', state: 'CA' },
        { sno: 2, store: 'Phoenix Sunwear', city: 'Phoenix', state: 'AZ' },
        { sno: 3, store: 'Dallas Ranch Supply', city: 'Dallas', state: 'TX' },
        { sno: 4, store: 'Atlanta Outfitters', city: 'Atlanta', state: 'GA' },
        { sno: 5, store: 'Nashville Melody Music Store', city: 'Nashville', state: 'TN' },
        { sno: 6, store: 'New York Empire Eats', city: 'New York', state: 'NY' },
        { sno: 7, store: 'Denver Peaks Outdoor', city: 'Denver', state: 'CO' },
        { sno: 8, store: 'Philadelphia Liberty Market', city: 'Philadelphia', state: 'PA' },
        { sno: 9, store: 'Boston Harbor Books', city: 'Boston', state: 'MA' },
        { sno: 10, store: 'Austin Vibe Co.', city: 'Austin', state: 'TX' },
        { sno: 11, store: 'Los Angeles Luxe', city: 'Los Angeles', state: 'CA' },
        { sno: 12, store: 'Houston Harvest Market', city: 'Houston', state: 'TX' },
        { sno: 13, store: 'Portland Evergreen Goods', city: 'Portland', state: 'OR' },
        { sno: 14, store: 'Chicago Charm Boutique', city: 'Chicago', state: 'IL' },
        { sno: 15, store: 'Las Vegas Neon Treasures', city: 'Las Vegas', state: 'NV' },
        { sno: 16, store: 'Seattle Skyline Goods', city: 'Seattle', state: 'WA' },
        { sno: 17, store: 'Miami Breeze Apparel', city: 'Miami', state: 'FL' },
        { sno: 18, store: 'San Diego Wave Surf Shop', city: 'San Diego', state: 'CA' },
        { sno: 19, store: 'Charlotte Queen’s Closet', city: 'Charlotte', state: 'NC' },
        { sno: 20, store: 'Detroit Motor Gear', city: 'Detroit', state: 'MI' }
    ]);
    
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
        console.log(newStoreData.sno, newStoreData.city)
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