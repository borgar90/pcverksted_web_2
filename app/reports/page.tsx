"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, LineChart, PieChart } from '@/components/Charts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Mock data for charts
const salesData = [
  { month: 'Jan', sales: 1000 },
  { month: 'Feb', sales: 1500 },
  { month: 'Mar', sales: 1200 },
  { month: 'Apr', sales: 1800 },
  { month: 'May', sales: 2000 },
  { month: 'Jun', sales: 2200 },
];

const inventoryData = [
  { category: 'CPUs', value: 30 },
  { category: 'GPUs', value: 25 },
  { category: 'RAM', value: 40 },
  { category: 'Storage', value: 35 },
  { category: 'Other', value: 20 },
];

const profitData = [
  { month: 'Jan', profit: 300 },
  { month: 'Feb', profit: 450 },
  { month: 'Mar', profit: 380 },
  { month: 'Apr', profit: 520 },
  { month: 'May', profit: 600 },
  { month: 'Jun', profit: 700 },
];

// Mock detailed sales data for tax report
const detailedSalesData = [
  { date: '2023-01-15', item: 'Gaming PC', soldPrice: 1500, investmentCost: 1200, profit: 300, profitPercentage: 25 },
  { date: '2023-02-03', item: 'Office PC', soldPrice: 800, investmentCost: 600, profit: 200, profitPercentage: 33.33 },
  { date: '2023-03-22', item: 'Custom Build', soldPrice: 2000, investmentCost: 1600, profit: 400, profitPercentage: 25 },
  { date: '2023-04-10', item: 'Gaming Laptop', soldPrice: 1800, investmentCost: 1500, profit: 300, profitPercentage: 20 },
  { date: '2023-05-05', item: 'Workstation', soldPrice: 2500, investmentCost: 2000, profit: 500, profitPercentage: 25 },
  { date: '2023-06-18', item: 'Mini PC', soldPrice: 600, investmentCost: 450, profit: 150, profitPercentage: 33.33 },
];

export default function ReportsPage() {
  const [isExportingTax, setIsExportingTax] = useState(false);
  const [taxYear, setTaxYear] = useState(new Date().getFullYear().toString());
  const { toast } = useToast();

  const handleExportTaxReport = () => {
    // Generate CSV content
    const headers = ['Date', 'Item', 'Sold Price', 'Investment Cost', 'Profit', 'Profit Percentage'];
    const csvContent = [
      headers.join(','),
      ...detailedSalesData.map(item => 
        `${item.date},${item.item},${item.soldPrice},${item.investmentCost},${item.profit},${item.profitPercentage.toFixed(2)}%`
      )
    ].join('\n');

    // Create Blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `detailed_tax_report_${taxYear}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    toast({
      title: "Detailed Tax Report Exported",
      description: `Detailed tax report for ${taxYear} has been generated and downloaded.`,
    });
    setIsExportingTax(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={salesData} xKey="month" yKey="sales" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Inventory Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={inventoryData} dataKey="value" nameKey="category" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={profitData} xKey="month" yKey="profit" />
          </CardContent>
        </Card>
      </div>
      
      <Button onClick={() => setIsExportingTax(true)}>Export Detailed Tax Report</Button>

      <Dialog open={isExportingTax} onOpenChange={setIsExportingTax}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Detailed Tax Report</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="taxYear" className="text-right">Tax Year</Label>
              <Input
                id="taxYear"
                value={taxYear}
                onChange={(e) => setTaxYear(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleExportTaxReport}>Export</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}