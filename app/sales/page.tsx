"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Computer {
  _id: string;
  name: string;
  price: number;
}

interface Sale {
  _id?: string;
  userId: string;
  userName: string;
  computerId: string;
  computerName: string;
  price: number;
  date: string;
}

export default function SalesManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [computers, setComputers] = useState<Computer[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [isAddingSale, setIsAddingSale] = useState(false);
  const [newSale, setNewSale] = useState<Partial<Sale>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
    fetchComputers();
    fetchSales();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  };

  const fetchComputers = async () => {
    const response = await fetch('/api/hardware');
    const data = await response.json();
    setComputers(data);
  };

  const fetchSales = async () => {
    const response = await fetch('/api/sales');
    const data = await response.json();
    setSales(data);
  };

  const handleAddSale = async () => {
    if (newSale.userId && newSale.computerId && newSale.price) {
      const response = await fetch('/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSale),
      });

      if (response.ok) {
        setNewSale({});
        setIsAddingSale(false);
        fetchSales();
        toast({
          title: "Sale Added",
          description: `New sale added successfully.`,
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Sales Management</h1>
      
      <Button onClick={() => setIsAddingSale(true)} className="mb-4">Add New Sale</Button>
      
      <Dialog open={isAddingSale} onOpenChange={setIsAddingSale}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Sale</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user" className="text-right">User</Label>
              <Select onValueChange={(value) => setNewSale({...newSale, userId: value})} className="col-span-3">
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user._id} value={user._id}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="computer" className="text-right">Computer</Label>
              <Select onValueChange={(value) => setNewSale({...newSale, computerId: value})} className="col-span-3">
                <SelectTrigger>
                  <SelectValue placeholder="Select a computer" />
                </SelectTrigger>
                <SelectContent>
                  {computers.map((computer) => (
                    <SelectItem key={computer._id} value={computer._id}>{computer.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price</Label>
              <Input
                id="price"
                type="number"
                value={newSale.price || ''}
                onChange={(e) => setNewSale({...newSale, price: parseFloat(e.target.value)})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddSale}>Add Sale</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-left">Computer</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {sales.map((sale) => (
              <tr key={sale._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{sale.userName}</td>
                <td className="py-3 px-6 text-left">{sale.computerName}</td>
                <td className="py-3 px-6 text-left">${sale.price.toFixed(2)}</td>
                <td className="py-3 px-6 text-left">{new Date(sale.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}