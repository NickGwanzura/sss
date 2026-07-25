"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Smartphone, Navigation, Camera, QrCode, Signature, Upload, Wifi, WifiOff, MapPin, AlertTriangle, ClipboardCheck } from "lucide-react";

export default function MobilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mobile Companion</h1>
          <p className="text-sm text-muted-foreground mt-1">Driver and guard mobile app management</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="gap-1.5">
            <div className="h-2 w-2 rounded-full bg-success-foreground" />
            6 Devices Online
          </Badge>
        </div>
      </div>

      {/* Device Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { device: "Tablet - CBZ-012", user: "T. Moyo", battery: 85, status: "Online", lastSync: "Just now", version: "2.1.0" },
          { device: "Phone - S. Dube", user: "S. Dube", battery: 62, status: "Online", lastSync: "2 min ago", version: "2.1.0" },
          { device: "Tablet - CBZ-008", user: "J. Ndlovu", battery: 23, status: "Low Battery", lastSync: "15 min ago", version: "2.0.9" },
        ].map((device) => (
          <Card key={device.device} className="transition-all hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{device.device}</h3>
                    <p className="text-xs text-muted-foreground">{device.user}</p>
                  </div>
                </div>
                <Badge variant={device.status === "Online" ? "success" : "warning"} className="text-[10px]">
                  {device.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-6 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${
                      device.battery > 50 ? 'bg-success' : device.battery > 20 ? 'bg-warning' : 'bg-destructive'
                    }`} style={{ width: `${device.battery}%` }} />
                  </div>
                  <span>{device.battery}%</span>
                </div>
                <span>v{device.version}</span>
              </div>
              <p className="text-[10px] text-muted-foreground/60 mt-1">Last sync: {device.lastSync}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile App Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">App Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Navigation, label: "Route Navigation", desc: "Turn-by-turn directions to stops" },
              { icon: QrCode, label: "Barcode Scanning", desc: "Scan bag barcodes and seals" },
              { icon: Signature, label: "Digital Signatures", desc: "Capture customer signatures" },
              { icon: Camera, label: "Photo Upload", desc: "Take and upload collection photos" },
              { icon: AlertTriangle, label: "Incident Reporting", desc: "Report incidents on the go" },
              { icon: MapPin, label: "GPS Verification", desc: "Location-based check-ins" },
              { icon: ClipboardCheck, label: "Digital Checklists", desc: "Complete vehicle checklists" },
              { icon: WifiOff, label: "Offline Mode", desc: "Work without internet, auto-sync" },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.label} className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-all hover:shadow-md hover:border-primary/30">
                  <Icon className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{feature.label}</p>
                    <p className="text-[10px] text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Sync Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Recent Sync Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { device: "Tablet CBZ-012", action: "Uploaded 4 photos", time: "2 min ago", status: "Success" },
            { device: "Phone - S. Dube", action: "Synced route update", time: "5 min ago", status: "Success" },
            { device: "Tablet CBZ-008", action: "Submitted incident report", time: "15 min ago", status: "Success" },
            { device: "Tablet CBZ-005", action: "Offline - pending sync (3 items)", time: "1 hour ago", status: "Pending" },
          ].map((sync, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-lg border p-3 text-sm">
              <div className="flex items-center gap-3">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-xs">{sync.device}</p>
                  <p className="text-xs text-muted-foreground">{sync.action}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{sync.time}</span>
                <Badge variant={sync.status === "Success" ? "success" : "warning"} className="text-[10px]">
                  {sync.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
