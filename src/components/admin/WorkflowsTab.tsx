import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, Plus, Edit2, Trash2, Clock, Mail, Users,
  ChevronRight, Crown, Rocket, Settings, CheckCircle, XCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SequenceBuilderModal from "./SequenceBuilderModal";

interface Sequence {
  id: string;
  name: string;
  description: string | null;
  trigger_type: string;
  audience: string;
  tier_filter: string | null;
  is_active: boolean;
  created_at: string;
  sequence_steps?: SequenceStep[];
}

interface SequenceStep {
  id: string;
  step_order: number;
  delay_hours: number;
  template_id: string;
  email_templates?: {
    name: string;
    subject: string;
  };
}

interface Template {
  id: string;
  name: string;
  subject: string;
  category: string;
  is_active: boolean;
}

const WorkflowsTab = () => {
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSequence, setExpandedSequence] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSequence, setEditingSequence] = useState<Sequence | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Fetch sequences with steps
      const { data: seqData, error: seqError } = await supabase
        .from("email_sequences")
        .select(`
          *,
          sequence_steps (
            id, step_order, delay_hours, template_id,
            email_templates (name, subject)
          )
        `)
        .order("created_at", { ascending: false });

      if (seqError) throw seqError;
      setSequences(seqData || []);

      // Fetch templates
      const { data: tempData, error: tempError } = await supabase
        .from("email_templates")
        .select("id, name, subject, category, is_active")
        .order("name");

      if (tempError) throw tempError;
      setTemplates(tempData || []);
    } catch (error: any) {
      console.error("Error fetching workflows:", error);
      toast({
        title: "Error",
        description: "Failed to load workflows",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSequence = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from("email_sequences")
        .update({ is_active: !isActive })
        .eq("id", id);

      if (error) throw error;

      setSequences(prev =>
        prev.map(s => s.id === id ? { ...s, is_active: !isActive } : s)
      );

      toast({
        title: isActive ? "Sequence Paused" : "Sequence Activated",
        description: `The sequence has been ${isActive ? "paused" : "activated"}.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getTriggerIcon = (triggerType: string) => {
    switch (triggerType) {
      case "on_backer":
        return <Crown className="w-4 h-4" />;
      case "on_signup":
        return <Users className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  const getTriggerLabel = (triggerType: string) => {
    switch (triggerType) {
      case "on_backer":
        return "New Backer";
      case "on_signup":
        return "Waitlist Signup";
      case "manual":
        return "Manual";
      default:
        return triggerType;
    }
  };

  const formatDelay = (hours: number) => {
    if (hours === 0) return "Immediately";
    if (hours < 24) return `${hours}h delay`;
    const days = Math.floor(hours / 24);
    return `${days}d delay`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Email Workflows</h2>
          <p className="text-sm text-muted-foreground">
            Automated email sequences for your audience
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium hover:opacity-90 transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Sequence
        </button>
      </div>

      {/* Sequences List */}
      <div className="space-y-4">
        {sequences.length === 0 ? (
          <div className="bg-card/50 border border-border/50 rounded-2xl p-12 text-center">
            <Mail className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Sequences Yet</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Create your first automated email sequence to engage your audience
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Sequence
            </button>
          </div>
        ) : (
          <AnimatePresence>
            {sequences.map((sequence) => (
              <motion.div
                key={sequence.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-card/50 border border-border/50 rounded-2xl overflow-hidden"
              >
                {/* Sequence Header */}
                <div
                  className="p-5 cursor-pointer hover:bg-secondary/30 transition-colors"
                  onClick={() => setExpandedSequence(
                    expandedSequence === sequence.id ? null : sequence.id
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        sequence.is_active 
                          ? "bg-accent/10 ring-1 ring-accent/20" 
                          : "bg-muted ring-1 ring-border"
                      }`}>
                        {getTriggerIcon(sequence.trigger_type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground flex items-center gap-2">
                          {sequence.name}
                          {sequence.is_active ? (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                              Active
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                              Paused
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {getTriggerLabel(sequence.trigger_type)} • {sequence.audience} 
                          {sequence.tier_filter && ` • ${sequence.tier_filter} tier`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {sequence.sequence_steps?.length || 0} steps
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSequence(sequence.id, sequence.is_active);
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          sequence.is_active
                            ? "bg-accent/10 text-accent hover:bg-accent/20"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        }`}
                      >
                        {sequence.is_active ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                      <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${
                        expandedSequence === sequence.id ? "rotate-90" : ""
                      }`} />
                    </div>
                  </div>
                </div>

                {/* Expanded Steps */}
                <AnimatePresence>
                  {expandedSequence === sequence.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border/50 bg-secondary/20"
                    >
                      <div className="p-5">
                        {sequence.description && (
                          <p className="text-sm text-muted-foreground mb-4">
                            {sequence.description}
                          </p>
                        )}
                        
                        {/* Steps Timeline */}
                        <div className="space-y-4">
                          {sequence.sequence_steps?.sort((a, b) => a.step_order - b.step_order).map((step, idx) => (
                            <div key={step.id} className="flex items-start gap-4">
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                                  {step.step_order}
                                </div>
                                {idx < (sequence.sequence_steps?.length || 0) - 1 && (
                                  <div className="w-0.5 h-8 bg-border mt-2" />
                                )}
                              </div>
                              <div className="flex-1 bg-card rounded-xl p-4 border border-border/50">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium text-foreground">
                                      {step.email_templates?.name || "Untitled Email"}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {step.email_templates?.subject}
                                    </p>
                                  </div>
                                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-lg">
                                    <Clock className="w-3 h-3" />
                                    {formatDelay(step.delay_hours)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}

                          {(!sequence.sequence_steps || sequence.sequence_steps.length === 0) && (
                            <p className="text-sm text-muted-foreground text-center py-4">
                              No steps configured. Add emails to this sequence.
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card/50 border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {sequences.filter(s => s.is_active).length}
              </p>
              <p className="text-sm text-muted-foreground">Active Sequences</p>
            </div>
          </div>
        </div>
        <div className="bg-card/50 border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{templates.length}</p>
              <p className="text-sm text-muted-foreground">Email Templates</p>
            </div>
          </div>
        </div>
        <div className="bg-card/50 border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {sequences.reduce((acc, s) => acc + (s.sequence_steps?.length || 0), 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Steps</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sequence Builder Modal */}
      <SequenceBuilderModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setEditingSequence(null);
        }}
        onSave={fetchData}
        editSequence={editingSequence}
      />
    </div>
  );
};

export default WorkflowsTab;
