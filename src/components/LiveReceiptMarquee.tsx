import { motion } from "framer-motion";
import { Receipt, CheckCircle2 } from "lucide-react";

const receipts = [
  { id: "7721", action: "Bill Negotiation Executed", result: "$142.00 saved", policy: "Aggressive" },
  { id: "7722", action: "Lead Gen Pipeline Initialized", result: "40 verified targets found", policy: "Gated" },
  { id: "7723", action: "Expense Approval Processed", result: "$890.00 approved", policy: "Standard" },
  { id: "7724", action: "Vendor Contract Renewed", result: "12% discount negotiated", policy: "Conservative" },
  { id: "7725", action: "Payment Batch Executed", result: "8 invoices paid", policy: "Scheduled" },
  { id: "7726", action: "Travel Booking Confirmed", result: "SFO → NYC, $347 saved", policy: "Best Value" },
  { id: "7727", action: "Subscription Audit Complete", result: "3 unused services cancelled", policy: "Aggressive" },
  { id: "7728", action: "Pipeline Stage Automation", result: "24 leads advanced", policy: "Qualification" },
  { id: "7729", action: "Insurance Quote Comparison", result: "Best rate: $1,240/mo", policy: "Comprehensive" },
  { id: "7730", action: "Payroll Processing Complete", result: "42 employees paid", policy: "Standard" },
];

const allReceipts = [...receipts, ...receipts];

const LiveReceiptMarquee = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#0B0812",
        padding: "28px 0",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Gradient fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: 120,
          background: "linear-gradient(to right, #0B0812, transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: 120,
          background: "linear-gradient(to left, #0B0812, transparent)",
        }}
      />

      {/* Marquee */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 whitespace-nowrap"
      >
        {allReceipts.map((receipt, index) => (
          <div
            key={`${receipt.id}-${index}`}
            className="inline-flex items-center gap-4"
            style={{
              padding: "10px 20px",
              borderRadius: 10,
              background: "#120E1A",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <div className="flex items-center gap-2">
              <Receipt style={{ width: 14, height: 14, color: "rgba(242,180,92,0.6)" }} />
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                RECEIPT #{receipt.id}
              </span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.75)" }}>
              {receipt.action}.
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(242,180,92,0.8)" }}>
              {receipt.result}.
            </span>
            <span className="flex items-center gap-1" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
              <CheckCircle2 style={{ width: 12, height: 12, color: "rgba(139,92,246,0.6)" }} />
              Policy: {receipt.policy}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default LiveReceiptMarquee;
