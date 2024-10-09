"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Software {
  _id?: string;
  name: string;
  version: string;
  licenseKey: string;
  investedPrice: number;
}

export default function SoftwareInventory() {
  const [software, setSoftware] = useState<Software[]>([]);
  const [isAddingOpen, setIsAddingOpen] = useState(false);
  const [newSoftware, setNewSoftware] = useState<Partial<Software>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast()

  useEffect(() => {
    fetchSoftware();
  }, []);

  const fetchSoftware = async () => {
    try {
      const response = await fetch('/api/software');
      if (!response.ok) throw new Error('Failed to fetch software');
      const data = await response.json();
      setSoftware(data);
    } catch (error) {
      console.error('Error fetching software:', error);
      toast({
        title: "Error",
        description: "Failed to fetch software. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addSoftware = async () => {
    if (newSoftware.name && newSoftware.version) {
      try {
        const response = await fetch('/api/software', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSoftware),
        });

        if (!response.ok) throw new Error('Failed to add software');

        setNewSoftware({});
        setIsAddingOpen(false);
        fetchSoftware();
        toast({
          title: "Software Added",
          description: `${newSoftware.name} has been added to the inventory.`,
        });
      } catch (error) {
        console.error('Error adding software:', error);
        toast({
          title: "Error",
          description: "Failed to add software. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Software Inventory</h1>
      
      <div className="mb-4 flex justify-between">
        <Input
          placeholder="Search software..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setIsAddingOpen(true)}>Add New Software</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>License Key</TableHead>
            <TableHead>Invested Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {software
            .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.version}</TableCell>
                <TableCell>{item.licenseKey}</TableCell>
                <TableCell>${item.investedPrice}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Dialog open={isAddingOpen} onOpenChange={setIsAddingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Software</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={newSoftware.name || ''} onChange={(e) => setNewSoftware({...newSoftware, name: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="version" className="text-right">Version</Label>
              <Input id="version" value={newSoftware.version || ''} onChange={(e) => setNewSoftware({...newSoftware, version: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="licenseKey" className="text-right">License Key</Label>
              <Input id="licenseKey" value={newSoftware.licenseKey || ''} onChange={(e) => setNewSoftware({...newSoftware, licenseKey: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="investedPrice" className="text-right">Invested Price</Label>
              <Input id="investedPrice" type="number" value={newSoftware.investedPrice || ''} onChange={(e) => setNewSoftware({...newSoftware, investedPrice: parseFloat(e.target.value)})} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={addSoftware}>Add Software</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}