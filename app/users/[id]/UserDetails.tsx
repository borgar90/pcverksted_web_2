"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import Link from 'next/link';

interface Purchase {
  id: number;
  item: string;
  price: number;
  date: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  amountSpent: number;
  finnAccountName: string;
  finnProfileLink: string;
  dateCreated: string;
  purchases: Purchase[];
}

export default function UserDetails({ user }: { user: User }) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const { toast } = useToast();

  const handleTrackShipment = () => {
    if (trackingNumber) {
      // In a real application, you would integrate with a shipping API here
      console.log(`Tracking shipment with number: ${trackingNumber}`);
      toast({
        title: "Shipment Tracked",
        description: `Tracking information for ${trackingNumber} has been retrieved.`,
      });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{user.name}'s Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">User Information</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Amount Spent:</strong> ${user.amountSpent.toFixed(2)}</p>
          <p><strong>Finn.no Account:</strong> {user.finnAccountName}</p>
          <p><strong>Date Created:</strong> {user.dateCreated}</p>
          <Link href={user.finnProfileLink} target="_blank" rel="noopener noreferrer">
            <Button className="mt-4">View Finn.no Profile</Button>
          </Link>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Track Shipment</h2>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <Button onClick={handleTrackShipment}>Track</Button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Purchase History</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Date</th>
              <th className="text-left">Item</th>
              <th className="text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {user.purchases.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((purchase) => (
              <tr key={purchase.id}>
                <td>{purchase.date}</td>
                <td>{purchase.item}</td>
                <td className="text-right">${purchase.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}