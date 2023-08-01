interface RowData {
    name: string;
    items: any[]; // You can replace 'any' with the specific type of 'items' if you know it
    blankCards: any[];
  }
  
export interface RowsFromBackend {
    [key: string]: RowData;
  }