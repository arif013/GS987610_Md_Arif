import { AgGridReact } from 'ag-grid-react'; // Import the AG-Grid component
// import 'ag-grid-community/styles/ag-grid.css';         // Basic styles
// import 'ag-grid-community/styles/ag-theme-alpine.css'; // Alpine theme styles
import { ColDef, RowDragModule, Theme } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';  // Import the required module
import {
    themeQuartz,
} from 'ag-grid-community';


// Register the module
const modules = [ClientSideRowModelModule, RowDragModule];

import { useMemo, useState } from 'react';
import AddSkuForm, { SkuData } from '../components/AddSkuForm';

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
    // Row data
    const [rowData, setRowData] = useState<RowData[]>([
        { sno: 1, id: 'SK00158', sku: 'Crew Neck Merino Wool Sweater', class: 'Tops', department: "Men's Apparel", price: 114.99, cost: 18.28 },
        { sno: 2, id: 'SK00269', sku: 'Faux Leather Leggings', class: 'Jewelry', department: 'Footwear', price: 9.99, cost: 8.45 },
        { sno: 3, id: 'SK00300', sku: 'Fleece-Lined Parka', class: 'Jewelry', department: 'Unisex Accessories', price: 199.99, cost: 17.80 },
        { sno: 4, id: 'SK00304', sku: 'Cotton Polo Shirt', class: 'Tops', department: "Women's Apparel", price: 139.99, cost: 10.78 },
        { sno: 5, id: 'SK00766', sku: 'Foldable Travel Hat', class: 'Tops', department: 'Footwear', price: 44.99, cost: 27.08 },
        { sno: 6, id: 'SK00786', sku: 'Chic Quilted Wallet', class: 'Bottoms', department: 'Footwear', price: 14.99, cost: 4.02 },
        { sno: 7, id: 'SK00960', sku: 'High-Slit Maxi Dress', class: 'Outerwear', department: 'Sportswear', price: 74.99, cost: 47.47 },
        { sno: 8,id: 'SK01183', sku: 'Turtleneck Cable Knit Sweater', class: 'Footwear', department: 'Footwear', price: 49.99, cost: 22.60 },
        { sno:9, id: 'SK01189', sku: 'Retro-Inspired Sunglasses', class: 'Bottoms', department: "Women's Apparel", price: 194.99, cost: 115.63 },
        { sno: 10, id: 'SK01193', sku: 'Stretch Denim Overalls', class: 'Bottoms', department: 'Unisex Accessories', price: 129.99, cost: 47.06 },
        { sno: 11, id: 'SK01249', sku: 'Adjustable Elastic Headband', class: 'Footwear', department: "Women's Apparel", price: 19.99, cost: 1.34 },
        { sno: 12, id: 'SK01319', sku: 'Adjustable Baseball Cap', class: 'Jewelry', department: "Men's Apparel", price: 4.99, cost: 2.29 },
        { sno: 13, id: 'SK01349', sku: 'Cotton Polo Shirt', class: 'Bottoms', department: 'Unisex Accessories', price: 114.99, cost: 60.94 },
        { sno: 14, id: 'SK01549', sku: 'Faux Suede Ankle Boots', class: 'Tops', department: 'Sportswear', price: 94.99, cost: 71.53 },
        { sno: 15, id: 'SK01566', sku: 'Striped Cotton Socks', class: 'Accessories', department: 'Sportswear', price: 9.99, cost: 6.91 },
        { sno: 16, id: 'SK01642', sku: 'Performance Compression Tights', class: 'Outerwear', department: 'Sportswear', price: 54.99, cost: 59.61 },
        { sno: 17, id: 'SK01733', sku: 'Vintage Logo Hoodie', class: 'Accessories', department: "Men's Apparel", price: 94.99, cost: 84.45 },
        { sno: 18, id: 'SK01896', sku: 'Floral Chiffon Wrap Dress', class: 'Accessories', department: 'Unisex Accessories', price: 149.99, cost: 68.55 },
        { sno: 19, id: 'SK01927', sku: 'Asymmetrical Hem Skirt', class: 'Jewelry', department: 'Sportswear', price: 99.99, cost: 66.89 },
        { sno: 20, id: 'SK01950', sku: 'Slim Fit Pinstripe Suit', class: 'Bottoms', department: "Women's Apparel", price: 99.99, cost: 13.30 },
        { sno: 21, id: 'SK02029', sku: 'Chunky Heel Sandals', class: 'Jewelry', department: 'Unisex Accessories', price: 89.99, cost: 46.70 },
        { sno: 22, id: 'SK02429', sku: 'Suede Fringe Vest', class: 'Bottoms', department: 'Footwear', price: 184.99, cost: 159.65 },
        { sno: 23, id: 'SK02448', sku: 'Relaxed Fit Cargo Pants', class: 'Bottoms', department: 'Sportswear', price: 149.99, cost: 7.20 },
        { sno: 24, id: 'SK02562', sku: 'Corduroy A-Line Skirt', class: 'Jewelry', department: 'Footwear', price: 129.99, cost: 48.62 },
        { sno: 25, id: 'SK02642', sku: 'Formal Dress Shoes', class: 'Bottoms', department: "Women's Apparel", price: 164.99, cost: 161.69 },
        { sno: 26, id: 'SK02768', sku: 'Tailored Corduroy Blazer', class: 'Accessories', department: 'Sportswear', price: 89.99, cost: 62.99 },
        { sno: 26, id: 'SK02805', sku: 'Foldable Travel Hat', class: 'Outerwear', department: "Women's Apparel", price: 194.99, cost: 56.16 },
        { sno: 28, id: 'SK02904', sku: 'Asymmetrical Hem Skirt', class: 'Tops', department: 'Unisex Accessories', price: 89.99, cost: 67.94 },
        { sno: 29, id: 'SK03182', sku: 'Plaid Flannel Shirt', class: 'Tops', department: 'Unisex Accessories', price: 124.99, cost: 17.50 },
        { sno: 31, id: 'SK03289', sku: 'Oversized Hoodie', class: 'Tops', department: "Women's Apparel", price: 159.99, cost: 122.23 },
        { sno: 32, id: 'SK03348', sku: 'Woven Straw Sun Hat', class: 'Jewelry', department: 'Footwear', price: 164.99, cost: 8.91 }
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