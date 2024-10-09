"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Link from 'next/link';

interface Purchase {
  _id?: string;
  item: string;
  price: number;
  date: string;
}

interface User {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  amountSpent: number;
  finnAccountName: string;
  finnProfileLink: string;
  dateCreated: string;
  purchases: Purchase[];
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<Partial<User>>({});
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [emailContent, setEmailContent] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  };

  const handleAddUser = async () => {
    if (newUser.name && newUser.email) {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setNewUser({});
        setIsAddingUser(false);
        fetchUsers();
        toast({
          title: "User Added",
          description: `${newUser.name} has been added to the system.`,
        });
      }
    }
  };

  // ... (keep the rest of the component code, including UI rendering)

}