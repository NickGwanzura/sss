"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Download, Eye, File, FileSpreadsheet, FileImage } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

const documentTypes = [
  { type: "Trip Sheet", icon: FileText, count: 24 },
  { type: "Collection Manifest", icon: FileSpreadsheet, count: 18 },
  { type: "Delivery Manifest", icon: FileSpreadsheet, count: 15 },
  { type: "Deposit Slip", icon: FileText, count: 20 },
  { type: "Proof of Collection", icon: FileImage, count: 32 },
  { type: "Vehicle Checklist", icon: FileText, count: 12 },
  { type: "Incident Report", icon: FileText, count: 5 },
  { type: "Client Receipt", icon: FileText, count: 28 },
];

const recentDocs = [
  { id: "DOC-001", type: "Trip Sheet", title: "Trip CIT-2024-089 - Borrowdale Circuit", trip: "CIT-2024-089", created: "2024-07-25T08:30:00", size: "245 KB" },
  { id: "DOC-002", type: "Collection Manifest", title: "Econet Msasa - Daily Collection", trip: "CIT-2024-088", created: "2024-07-25T09:00:00", size: "180 KB" },
  { id: "DOC-003", type: "Proof of Collection", title: "OK Sam Levy - Collection Receipt", trip: "CIT-2024-087", created: "2024-07-25T10:15:00", size: "1.2 MB" },
  { id: "DOC-004", type: "Deposit Slip", title: "CBZ Vault Deposit - 25 July", trip: "CIT-2024-087", created: "2024-07-25T11:00:00", size: "320 KB" },
  { id: "DOC-005", type: "Incident Report", title: "Vehicle Breakdown - CBZ-012", trip: "CIT-2024-089", created: "2024-07-25T10:30:00", size: "4.5 MB" },
];

const docIcons: Record<string, React.ElementType> = {
  "Trip Sheet": FileText,
  "Collection Manifest": FileSpreadsheet,
  "Delivery Manifest": FileSpreadsheet,
  "Deposit Slip": FileText,
  "Proof of Collection": FileImage,
  "Vehicle Checklist": FileText,
  "Incident Report": FileText,
  "Client Receipt": FileText,
};

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Digital Documents</h1>
          <p className="text-sm text-muted-foreground mt-1">All operational documents and forms</p>
        </div>
        <Button className="gap-2">
          <FileText className="h-4 w-4" />
          Generate Document
        </Button>
      </div>

      {/* Document Type Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
        {documentTypes.map((doc) => {
          const Icon = doc.icon;
          return (
            <Card key={doc.type} className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
              <CardContent className="p-3 text-center">
                <Icon className="h-6 w-6 mx-auto mb-1.5 text-primary" />
                <p className="text-[10px] font-medium leading-tight">{doc.type}</p>
                <p className="text-lg font-bold mt-1">{doc.count}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Recent Documents</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Trip</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDocs.map((doc) => {
                const Icon = docIcons[doc.type] || FileText;
                return (
                  <TableRow key={doc.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium">{doc.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[10px]">{doc.type}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{doc.trip}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{formatDateTime(doc.created)}</TableCell>
                    <TableCell className="text-xs">{doc.size}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
