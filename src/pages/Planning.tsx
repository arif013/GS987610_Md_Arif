
import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { storeData } from "../data/storeData";
import { skuData } from "../data/skuData";
import { calendarData } from "../data/calendarData";
import { ClientSideRowModelModule, ColDef, ColGroupDef, RowDragModule, Theme, themeQuartz } from "ag-grid-community";
import { planningData } from "../data/planningData";

// Register the module
const modules = [ClientSideRowModelModule, RowDragModule];

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
  // let someCounter:number = 0
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
  
  // if (someCounter < 2) { // Adjust the limit as needed
  //   console.log(rowData);
  //   someCounter++;
  // } 

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
