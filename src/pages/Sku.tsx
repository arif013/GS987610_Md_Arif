import { AgGridReact } from 'ag-grid-react'; // Import the AG-Grid component
import { ColDef, RowDragModule, Theme } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';  // Import the required module
import {
    themeQuartz,
} from 'ag-grid-community';


// Register the module
const modules = [ClientSideRowModelModule, RowDragModule];

import { useMemo, useState } from 'react';
import AddSkuForm, { SkuData } from '../components/AddSkuForm';
import { skuData } from '../data/skuData';

interface RowData {
    sno?: number;
    id: string;
    sku: string;
    class: string;
    department: string;
    price: number;
    cost: number
}



function Sku() {
    // Row data
    const [rowData, setRowData] = useState<RowData[]>(skuData || [])
    const [showForm, setShowForm] = useState(false)
    const [editingSku, setEditingSku] = useState<SkuData | null>(null)
    // const [newSku, setNewSku] = useState<RowData>({sno:0, id:'', sku:'', department: '',class: '',price:0, cost:0})
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
        // { headerName: 'S.No', field: 'sno' },
        { headerName: 'ID', field:'id'},
        { headerName: 'Sku', field: 'sku' },
        { headerName: 'Class', field: 'class'},
        { headerName: 'Department', field: 'department'},
        { headerName: 'Price', field: 'price' },
        { headerName: 'Cost', field: 'cost' },
        
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
        setRowData(updatedRowData); // Update cost with the remaining rows
    };
    const handleEdit = (sku: RowData)=>{
        setEditingSku({
            sno: sku.sno,
            id: sku.id,
            sku: sku.sku,
            class: sku.class,
            department: sku.department,
            price: sku.price,
            cost: sku.cost
        })
        setShowForm(true)
    }
  
    
    const handleAddSku = (newSkuData: SkuData) => {
        console.log(newSkuData.sno, newSkuData.price)
        if (newSkuData.sno) {
            // If sno exists, we update the Sku
            setRowData((prevData) =>
                prevData.map((row) =>
                    row.sno === newSkuData.sno ? { ...row, ...newSkuData } : row
                )
            );

            console.log('this is called')
        } else {
            // setNewSku({ sno: 0, sku: '', price: 0, cost: 0 })
            // If no sno exists, we add a new Sku
            const newSno = rowData.length
                ? Math.max(...rowData.map((row) => row.sno as number)) + 1
                : 1;
            console.log("adding")
            newSkuData = { sno:newSno, ...newSkuData };
            setRowData((prevData) => [...prevData, newSkuData]);
            // console.log("full")
        }
    
        // setNewSku({ sno: 0, id:'', sku: '', class: '', department:'', price: 0, cost: 0 });
        setEditingSku(null)
        setShowForm(false);
    };

    const handleClose=()=>{
        setShowForm(false)
        setEditingSku(null)
        // setNewSku({ sno: 0, id:'', sku: '', class:'', department:'', price: 0, cost: 0 });
    }
    



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
            <div className='w-full bg-blue-100 h-[50px] bottom-[1px] fixed block'>
                <button
                    className='bg-blue-500 text-white px-[20px] py-[5px] rounded-[5px] ml-[200px] fixed bottom-2'
                    onClick={() => setShowForm(!showForm)}
                >
                    Add Sku
                </button>
            </div>

            {/* Add Sku Form */}
            <AddSkuForm
                showForm={showForm}
                onSubmit={handleAddSku}
                // onClose={() => setShowForm(false)}
                onClose={handleClose}
                initialData={editingSku || null}
            />
        </>
    )
}




export default Sku