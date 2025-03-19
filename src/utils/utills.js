import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";

// csv export
export const exportToExcel = async (col, row, name) => {
  if (row.length === 0) return toast.error("No data found");
  const data = [col, ...row];

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  await XLSX.writeFile(workbook, `${name}.xlsx`);
};

// pdf export
export const exportToPDF =  (col, row, name) => {
  if (row.length === 0) return toast.error("No data found");
  const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });

  pdf.setFont("Arial");

  pdf.text(name, 20, 20);

  autoTable(pdf, {
    head: [col],
    body: row,
    startY: 30,
    styles: { fontSize: 10, textColor: [50, 50, 50] },
    headStyles: { fillColor: [244, 244, 244], textColor: 0, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [249, 249, 249] },
    margin: { top: 30 },
  });

  pdf.save(`${name}.pdf`);
};
