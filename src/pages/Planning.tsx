// import { useEffect, useMemo, useState } from "react";
// import { AgGridReact } from "ag-grid-react";
// // import "ag-grid-community/styles/ag-grid.css";
// // import "ag-grid-community/styles/ag-theme-alpine.css";
// import { storeData } from "../data/storeData";
// import { skuData } from "../data/skuData";
// import { calendarData } from "../data/calendarData";
// import { ClientSideRowModelModule, ColDef, ColGroupDef, RowDragModule, Theme, themeQuartz } from "ag-grid-community";
// import { planningData } from "../data/planningData";

// // Register the module
// const modules = [ClientSideRowModelModule, RowDragModule];

// interface ComputedData {
//   store: string;
//   sku: string;
//   week: string;
//   weekLabel: string;
//   monthLabel: string;
//   salesUnits: number;
//   salesDollars: string;
//   costDollars: string;
//   gmDollars: string;
//   gmPercent: string;
// }


// // Define types for the row data
// interface RowData {
//   store: string;
//   city: string;
//   state: string;
//   sku: string;
//   class: string;
//   department: string;
//   price: number;
//   cost: number;
//   [key: string]: any;
// }

// const mergedPlanningData : any = []

// const PlanningGrid = () => {
//   const [rowData, setRowData] = useState<ComputedData[]>([])

//   // Step 1: Cross join stores and SKUs
//   // const rowData = useMemo(() => {
//   //   return storeData.flatMap((store) =>
//   //     skuData.map((sku) => ({
//   //       store: store.store,
//   //       city: store.city,
//   //       state: store.state,
//   //       sku: sku.sku,
//   //       class: sku.class,
//   //       department: sku.department,
//   //       price: sku.price,
//   //       cost: sku.cost,
//   //     }))
//   //   );
//   // }, []);

//   const myTheme = themeQuartz.withParams({
//     borderColor: "#9696C8",
//     wrapperBorder: false,
//     headerRowBorder: false,
//     rowBorder: { style: "dotted", width: 5 },
//     columnBorder: { style: "dashed" },
//     spacing: 10
//   });

//   const theme = useMemo<Theme | "legacy">(() => {
//     return myTheme;
//   }, []);

//   // Step 2: Define column structure
//   const columnDefs = useMemo(() => {
//     // Static columns
//     const staticCols = [
//       { field: "store", headerName: "Store", pinned: "left" },
//       { field: "sku", headerName: "SKU", pinned: "left" },
//       { field: "class", headerName: "Class", minWidth: 100 },
//       { field: "department", headerName: "Department", minWidth: 150 },
//       {
//         field: "price",
//         headerName: "Price",
//         minWidth: 100,
//         valueFormatter: (params: any) => `$${params.value.toFixed(2)}`,
//       },

//     ];

//     // storeData.forEach((store) => {
//     //   skuData.forEach((sku) => {
//     //     const rowData: Record<string, any> = { store, sku };

//     //     calendarData.forEach((week) => {
//     //       const weekData = planningData.find((data) => data.store === store.store && data.sku === sku.sku && data.week === week.Week);
//     //       const salesUnits = weekData ? weekData.salesUnits : 0;
//     //       const salesDollars = salesUnits * (sku.price || 0);

//     //       rowData[`salesUnits_${week}`] = salesUnits;
//     //       rowData[`salesDollars_${week}`] = salesDollars.toFixed(2);
//     //     });

//     //     mergedPlanningData.push(rowData);
//     //   });
//     // });
//     // console.log(mergedPlanningData)

//     useEffect(() => {
//       // Merge Planning Data with Calendar Data
//       const computedData = planningData.map((plan) => {
//         const calendarEntry = calendarData.find((cal) => cal.Week === plan.week);
//         const productEntry = skuData.find((sku) => sku.sku === plan.sku);
  
//         const salesDollars = plan.salesUnits * (productEntry?.price || 0);
//         const costDollars = plan.salesUnits * (productEntry?.cost || 0);
//         const gmDollars = salesDollars - costDollars;
//         const gmPercent = salesDollars > 0 ? ((gmDollars / salesDollars) * 100).toFixed(2) + "%" : "0%";
  
//         return {
//           store: plan.store,
//           sku: plan.sku,
//           week: plan.week,
//           weekLabel: calendarEntry?.["Week Label"] || "",
//           monthLabel: calendarEntry?.["Month Label"] || "",
//           salesUnits: plan.salesUnits,
//           salesDollars: `$ ${salesDollars.toFixed(2)}`,
//           costDollars: `$ ${costDollars.toFixed(2)}`,
//           gmDollars: `$ ${gmDollars.toFixed(2)}`,
//           gmPercent,
//         };
//       });
  
//       setRowData(computedData);
//     }, []);

//     // Dynamic columns for Weeks
//     const weekCols = calendarData.map((week) => ({
//       headerName: `${week["Month Label"]}`,
//       children: [{

//         field: `week_${week['Week']}`,
//         headerName: ` ${week["Week Label"]}`,
//         children: [
//           {
//             field: `salesUnits_${week.Week}`,
//             headerName: "Sales Units",
//             minWidth: 150,
//             editable: true,
//             type: "numericColumn",
//             onCellValueChanged: (params: any) => {
//               const newUnits = params.newValue || 0;
//               params.data[`salesDollars_${week.Week}`] = newUnits * params.data.price;
//               params.api.refreshCells({ rowNodes: [params.node], columns: [`salesDollars_${week.Week}`] });
//             },
//           },
//           {
//             field: `salesDollars_${week.Week}`,
//             headerName: "Sales $",
//             minWidth: 100,
//             valueFormatter: (params: any) =>
//               params.value ? `${params.value.toFixed(2)}` : "0.00",
//             editable: false,
//           },
//         ],
//       }
//       ]
//     }));

//     // Return the combined column definitions
//     return [...staticCols, ...weekCols] as (ColDef<RowData> | ColGroupDef<RowData>)[];
//   }, []);

//   return (
//     <div className="ag-theme-alpine ml-[200px]" style={{ height: "90vh" }}>
//       <AgGridReact
//         theme={theme}
//         rowData={rowData}
//         columnDefs={columnDefs}
//         defaultColDef={{ flex: 1, resizable: true }}
//         modules={modules}
//       />
//     </div>
//   );
// };

// export default PlanningGrid;



import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import { storeData } from "../data/storeData";
import { skuData } from "../data/skuData";
import { calendarData } from "../data/calendarData";
import { ClientSideRowModelModule, ColDef, ColGroupDef, RowDragModule, Theme, themeQuartz } from "ag-grid-community";
import { planningData } from "../data/planningData";

// Register the module
const modules = [ClientSideRowModelModule, RowDragModule];

// Define types for the row data
// interface ComputedData {
//   store: string;
//   city: string;
//   state: string;
//   sku: string;
//   class: string;
//   department: string;
//   price: number;
//   cost: number;
//   week: string;
//   weekLabel: string;
//   monthLabel: string;
//   salesUnits: number;
//   salesDollars: number;
//   costDollars: number;
//   gmDollars: number;
//   gmPercent: string;
//   [key: string]: any;
// }

type ComputedData = {
  store: string;
  city: string;
  state: string;
  sku: string;
  class: string;
  department: string;
  price: number;
  cost: number;
  week: string;
  weekLabel: string;
  monthLabel: string;
  salesUnits?: number;
  salesDollars?: number;
  costDollars?: number;
  gmDollars?: number;
  gmPercent?: string;
  [key: string]: string | number | undefined;
};


const PlanningGrid = () => {
  const [rowData, setRowData] = useState<ComputedData[]>([]);
  let someCounter:number = 0
  // Step 1: Merge Planning Data with Calendar and SKU Data
  useEffect(() => {
    const computedData: ComputedData[] = storeData.flatMap((store) =>
      skuData.flatMap((sku) =>
        calendarData.map((week) => {
          const plan = planningData.find(
            (p) => p.sku === sku.id && p.week === week["Week"]
          );
    
          const salesUnits = plan?.salesUnits || 0;
          const salesDollars = salesUnits * sku.price;
          const costDollars = salesUnits * sku.cost;
          const gmDollars = salesDollars - costDollars;
          const gmPercent =
            salesDollars > 0 ? ((gmDollars / salesDollars) * 100).toFixed(2) + "%" : "0%";
    
          // Dynamically add the calculated fields for each week
          return {
            store: store.store,
            city: store.city,
            state: store.state,
            sku: sku.sku,
            class: sku.class,
            department: sku.department,
            price: sku.price,
            cost: sku.cost,
            week: week.Week,
            weekLabel: week["Week Label"] || "",
            monthLabel: week["Month Label"] || "",
            [`salesUnits_${week.Week}`]: salesUnits,
            [`salesDollars_${week.Week}`]: salesDollars,
            [`costDollars_${week.Week}`]: costDollars,
            [`gmDollars_${week.Week}`]: gmDollars,
            [`gmPercent_${week.Week}`]: gmPercent,
          };
        })
      )
    );
    // setRowData(computedData);
    
    setRowData(computedData);
  }, []);
  
  if (someCounter < 2) { // Adjust the limit as needed
    console.log(rowData);
    someCounter++;
  } 

  // Step 2: Theme Configuration
  const myTheme = themeQuartz.withParams({
    borderColor: "#9696C8",
    wrapperBorder: false,
    headerRowBorder: false,
    rowBorder: { style: "dotted", width: 5 },
    columnBorder: { style: "dashed" },
    spacing: 10,
  });

  const theme = useMemo<Theme | "legacy">(() => {
    return myTheme;
  }, []);

  // Step 3: Define Column Structure
  const columnDefs = useMemo(() => {
    // Static columns
    const staticCols: ColDef[] = [
      { field: "store", headerName: "Store", pinned: "left" },
      { field: "city", headerName: "City", pinned: "left", maxWidth: 120 },
      { field: "state", headerName: "State", pinned: "left", maxWidth: 80 },
      { field: "sku", headerName: "SKU", pinned: "left" },
      { field: "class", headerName: "Class", minWidth: 100 },
      { field: "department", headerName: "Department", minWidth: 150 },
      {
        field: "price",
        headerName: "Price",
        minWidth: 100,
        valueFormatter: (params: any) => `$${params.value.toFixed(2)}`,
      },
      {
        field: "cost",
        headerName: "Cost",
        minWidth: 100,
        valueFormatter: (params: any) => `$${params.value.toFixed(2)}`,
      },
    ];

    // Dynamic columns for Weeks
    const weekCols = calendarData.map((week) => ({
      headerName: `${week["Month Label"]}`,
      children: [
        {
          field: `salesUnits_${week.Week}`,
          headerName: ` ${week["Week Label"]} - Sales Units`,
          minWidth: 150,
          editable: true,
          type: "numericColumn",
          onCellValueChanged: (params: any) => {
            const newUnits = parseFloat(params.newValue) || 0;
            const salesDollars = newUnits * params.data.price;
            const costDollars = newUnits * params.data.cost;
            const gmDollars = salesDollars - costDollars;
            const gmPercent = salesDollars > 0 ? ((gmDollars / salesDollars) * 100).toFixed(2) + "%" : "0%";

            params.data[`salesDollars_${week.Week}`] = salesDollars;
            params.data[`costDollars_${week.Week}`] = costDollars;
            params.data[`gmDollars_${week.Week}`] = gmDollars;
            params.data[`gmPercent_${week.Week}`] = gmPercent;

            params.api.refreshCells({
              rowNodes: [params.node],
              columns: [
                `salesDollars_${week.Week}`,
                `costDollars_${week.Week}`,
                `gmDollars_${week.Week}`,
                `gmPercent_${week.Week}`,
              ],
            });
          },
        },
        {
          field: `salesDollars_${week.Week}`,
          headerName: "Sales $",
          minWidth: 100,
          valueFormatter: (params: any) => `$${params.value?.toFixed(2)}`,
          editable: false,
        },
        {
          field: `costDollars_${week.Week}`,
          headerName: "Cost $",
          minWidth: 100,
          valueFormatter: (params: any) => `$${params.value?.toFixed(2)}`,
          editable: false,
        },
        {
          field: `gmDollars_${week.Week}`,
          headerName: "GM $",
          minWidth: 100,
          valueFormatter: (params: any) => `$${params.value?.toFixed(2)}`,
          editable: false,
        },
        {
          field: `gmPercent_${week.Week}`,
          headerName: "GM %",
          minWidth: 100,
          editable: false,
        },
      ],
      
    }));
    // Combine static and dynamic columns
    return [...staticCols, ...weekCols] as (ColDef | ColGroupDef)[];
  }, []);

  // Step 4: Render Grid
  return (
    <div className="ag-theme-alpine ml-[200px]" style={{ height: "90vh" }}>
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
