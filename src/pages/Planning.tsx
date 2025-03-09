import {  useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import { storeData } from "../data/storeData";
import { skuData } from "../data/skuData";
import { calendarData } from "../data/calendarData";
import { ClientSideRowModelModule, ColDef, ColGroupDef, RowDragModule, Theme, themeQuartz } from "ag-grid-community";

// Register the module
const modules = [ClientSideRowModelModule, RowDragModule];


// Define types for the row data
interface RowData {
  store: string;
  city: string;
  state: string;
  sku: string;
  class: string;
  department: string;
  price: number;
  cost: number;
  [key: string]: any;
}

const PlanningGrid = () => {
  // Step 1: Cross join stores and SKUs
  const rowData = useMemo(() => {
    return storeData.flatMap((store) =>
      skuData.map((sku) => ({
        store: store.store,
        city: store.city,
        state: store.state,
        sku: sku.sku,
        class: sku.class,
        department: sku.department,
        price: sku.price,
        cost: sku.cost,
      }))
    );
  }, []);

  const myTheme = themeQuartz.withParams({
    borderColor: "#9696C8",
    wrapperBorder: false,
    headerRowBorder: false,
    rowBorder: { style: "dotted", width: 5 },
    columnBorder: { style: "dashed" },
    spacing: 10
});

const theme = useMemo<Theme | "legacy">(() => {
    return myTheme;
}, []);

  // Step 2: Define column structure
  const columnDefs = useMemo(() => {
    // Static columns
    const staticCols = [
      { field: "store", headerName: "Store", pinned: "left" },
      { field: "sku", headerName: "SKU", pinned: "left" },
      { field: "class", headerName: "Class", minWidth: 100 },
      { field: "department", headerName: "Department", minWidth: 150 },
      {
        field: "price",
        headerName: "Price",
        minWidth: 100,
        valueFormatter: (params: any) => `$${params.value.toFixed(2)}`,
      },
    ];

    // Dynamic columns for Weeks
    const weekCols = calendarData.map((week) => ({
    headerName: `${week["Month Label"]}`,
    children: [{

        field: `week_${week['Week']}`,
        headerName: ` ${week["Week Label"]}`,
        children: [
          {
            field: `salesUnits_${week.Week}`,
            headerName: "Sales Units",
            minWidth: 150,
            editable: true,
            type: "numericColumn",
            onCellValueChanged: (params: any) => {
              const newUnits = params.newValue || 0;
              params.data[`salesDollars_${week.Week}`] = newUnits * params.data.price;
              params.api.refreshCells({ rowNodes: [params.node], columns: [`salesDollars_${week.Week}`] });
            },
          },
          {
            field: `salesDollars_${week.Week}`,
            headerName: "Sales $",
            minWidth: 100,
            valueFormatter: (params: any) =>
              params.value ? `${params.value.toFixed(2)}` : "0.00",
            editable: false,
          },
        ],
    }
    ]
    }));

    // Return the combined column definitions
    return [...staticCols, ...weekCols] as (ColDef<RowData> | ColGroupDef<RowData>)[]; 
  }, []);

  return (
    <div className="ag-theme-alpine ml-[200px]" style={{ height: "90vh"}}>
      <AgGridReact
      theme={theme}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1, resizable: true }}
        modules={modules}
      />
    </div>
  );
};

export default PlanningGrid;
