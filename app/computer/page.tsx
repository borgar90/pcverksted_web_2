"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast"
import { Cpu, HardDrive, Memory, MonitorPlay, Power, Server } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// ... (keep the existing interfaces and constants)

const ComponentIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'CPU': return <Cpu />;
    case 'GPU': return <MonitorPlay />;
    case 'RAM': return <Memory />;
    case 'Storage': return <HardDrive />;
    case 'PSU': return <Power />;
    default: return <Server />;
  }
};

// ... (keep the rest of the component code)