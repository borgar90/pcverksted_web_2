"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BarChart, Menu, Package, Cpu, Users, DollarSign, FileText } from "lucide-react";

const menuItems = [
  { href: '/', icon: <BarChart className="h-6 w-6" />, label: 'Dashboard' },
  { href: '/hardware', icon: <Package className="h-6 w-6" />, label: 'Hardware Inventory' },
  { href: '/software', icon: <Cpu className="h-6 w-6" />, label: 'Software Inventory' },
  { href: '/users', icon: <Users className="h-6 w-6" />, label: 'User Management' },
  { href: '/sales', icon: <DollarSign className="h-6 w-6" />, label: 'Sales Management' },
  { href: '/reports', icon: <FileText className="h-6 w-6" />, label: 'Reports' },
];

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <div className={`fixed top-0 left-0 h-full bg-background transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} flex flex-col items-center pt-16 border-r`}>
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className="w-full">
            <Button variant="ghost" className={`w-full justify-start py-4 ${isOpen ? 'px-4' : 'px-0'}`}>
              <div className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} w-full`}>
                {item.icon}
                {isOpen && <span className="ml-4">{item.label}</span>}
              </div>
            </Button>
          </Link>
        ))}
      </div>
    </Sheet>
  );
}