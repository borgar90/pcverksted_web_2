"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, X } from 'lucide-react';

interface CustomField {
  label: string;
  value: string;
}

interface HardwareType {
  _id?: string;
  name: string;
  customFields: CustomField[];
}

interface Hardware {
  _id?: string;
  name: string;
  description: string;
  investedPrice: number;
  soldPrice: number;
  type: string;
  customFields: CustomField[];
}

export default function HardwareInventory() {
  const [hardware, setHardware] = useState<Hardware[]>([]);
  const [hardwareTypes, setHardwareTypes] = useState<HardwareType[]>([]);
  const [isAddingHardware, setIsAddingHardware] = useState(false);
  const [isAddingType, setIsAddingType] = useState(false);
  const [newHardware, setNewHardware] = useState<Partial<Hardware>>({});
  const [newType, setNewType] = useState<Partial<HardwareType>>({ customFields: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast()

  useEffect(() => {
    fetchHardware();
    fetchHardwareTypes();
  }, []);

  const fetchHardware = async () => {
    try {
      const response = await fetch('/api/hardware');
      if (!response.ok) throw new Error('Failed to fetch hardware');
      const data = await response.json();
      setHardware(data);
    } catch (error) {
      console.error('Error fetching hardware:', error);
      toast({
        title: "Error",
        description: "Failed to fetch hardware. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchHardwareTypes = async () => {
    try {
      const response = await fetch('/api/hardware-types');
      if (!response.ok) throw new Error('Failed to fetch hardware types');
      const data = await response.json();
      setHardwareTypes(data);
    } catch (error) {
      console.error('Error fetching hardware types:', error);
      toast({
        title: "Error",
        description: "Failed to fetch hardware types. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addHardware = async () => {
    if (newHardware.name && newHardware.type) {
      try {
        const response = await fetch('/api/hardware', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newHardware),
        });

        if (!response.ok) throw new Error('Failed to add hardware');

        setNewHardware({});
        setIsAddingHardware(false);
        fetchHardware();
        toast({
          title: "Hardware Added",
          description: `${newHardware.name} has been added to the inventory.`,
        });
      } catch (error) {
        console.error('Error adding hardware:', error);
        toast({
          title: "Error",
          description: "Failed to add hardware. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const addHardwareType = async () => {
    if (newType.name) {
      try {
        const response = await fetch('/api/hardware-types', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newType),
        });

        if (!response.ok) throw new Error('Failed to add hardware type');

        setNewType({ customFields: [] });
        setIsAddingType(false);
        fetchHardwareTypes();
        toast({
          title: "Hardware Type Added",
          description: `${newType.name} has been added to the types.`,
        });
      } catch (error) {
        console.error('Error adding hardware type:', error);
        toast({
          title: "Error",
          description: "Failed to add hardware type. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Hardware Inventory</h1>
      
      <div className="mb-4 flex justify-between">
        <Input
          placeholder="Search hardware..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div>
          <Button onClick={() => setIsAddingType(true)} className="mr-2">Add New Type</Button>
          <Button onClick={() => setIsAddingHardware(true)}>Add New Hardware</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Invested Price</TableHead>
            <TableHead>Sold Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hardware
            .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>${item.investedPrice}</TableCell>
                <TableCell>${item.soldPrice}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Dialog open={isAddingHardware} onOpenChange={setIsAddingHardware}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Hardware</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={newHardware.name || ''} onChange={(e) => setNewHardware({...newHardware, name: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <Select onValueChange={(value) => setNewHardware({...newHardware, type: value})} className="col-span-3">
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  {hardwareTypes.map((type) => (
                    <SelectItem key={type._id} value={type.name}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input id="description" value={newHardware.description || ''} onChange={(e) => setNewHardware({...newHardware, description: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="investedPrice" className="text-right">Invested Price</Label>
              <Input id="investedPrice" type="number" value={newHardware.investedPrice || ''} onChange={(e) => setNewHardware({...newHardware, investedPrice: parseFloat(e.target.value)})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="soldPrice" className="text-right">Sold Price</Label>
              <Input id="soldPrice" type="number" value={newHardware.soldPrice || ''} onChange={(e) => setNewHardware({...newHardware, soldPrice: parseFloat(e.target.value)})} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={addHardware}>Add Hardware</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddingType} onOpenChange={setIsAddingType}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Hardware Type</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="typeName" className="text-right">Type Name</Label>
              <Input id="typeName" value={newType.name || ''} onChange={(e) => setNewType({...newType, name: e.target.value})} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={addHardwareType}>Add Type</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}