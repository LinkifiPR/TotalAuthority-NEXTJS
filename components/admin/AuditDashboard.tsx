"use client";


import React from 'react';
import { Card } from '@/components/ui/card';
import { AuditStatsOverview } from './AuditStatsOverview';
import { AuditDashboardHeader } from './AuditDashboardHeader';
import { AuditDashboardTable } from './AuditDashboardTable';
import { AuditReviewModal } from './AuditReviewModal';
import { useAuditDashboard } from './audit/useAuditDashboard';
import { useAuditReview } from './audit/useAuditReview';
import { AuditDashboardProps } from './audit/types';

export const AuditDashboard: React.FC<AuditDashboardProps> = ({ refreshTrigger }) => {
  const {
    audits,
    loading,
    selectedAudits,
    showArchived,
    setShowArchived,
    copyShareUrl,
    viewAudit,
    deleteAudit,
    archiveAudits,
    restoreAudits,
    handleSelectAudit,
    handleSelectAll,
    copyAuditCode,
    fetchAudits,
    editingAudit,
    setEditingAudit,
    toggleAuditLock,
    bulkLockSelected,
    bulkUnlockSelected,
  } = useAuditDashboard(refreshTrigger);

  const { submittingReview, submitReview } = useAuditReview(fetchAudits);

  const handleEditAudit = (auditId: string | null) => {
    setEditingAudit(auditId);
  };

  const handleCancelEdit = () => {
    setEditingAudit(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading audit reports...</span>
      </div>
    );
  }

  const filteredAudits = audits.filter(audit => 
    showArchived ? audit.status === 'archived' : audit.status !== 'archived'
  );

  const activeCount = audits.filter(a => a.status !== 'archived').length;
  const archivedCount = audits.filter(a => a.status === 'archived').length;
  const completedCount = audits.filter(a => a.review_status === 'completed').length;
  const pendingCount = audits.filter(a => a.review_status === 'pending').length;

  return (
    <div className="space-y-6">
      <AuditStatsOverview
        totalAudits={audits.length}
        completedCount={completedCount}
        pendingCount={pendingCount}
        activeCount={activeCount}
      />

      <Card className="shadow-lg border-0 bg-gradient-to-r from-white to-gray-50">
        <AuditDashboardHeader
          showArchived={showArchived}
          activeCount={activeCount}
          archivedCount={archivedCount}
          selectedAudits={selectedAudits}
          totalCount={filteredAudits.length}
          onToggleArchived={setShowArchived}
          onSelectAll={handleSelectAll}
          onBulkArchive={() => archiveAudits(Array.from(selectedAudits))}
          onBulkRestore={() => restoreAudits(Array.from(selectedAudits))}
          onBulkLock={bulkLockSelected}
          onBulkUnlock={bulkUnlockSelected}
        />
        
        <div className="p-0">
          <AuditDashboardTable
            audits={filteredAudits}
            selectedAudits={selectedAudits}
            onSelectAudit={handleSelectAudit}
            onSelectAll={handleSelectAll}
            onCopyAuditCode={copyAuditCode}
            onViewAudit={viewAudit}
            onCopyShareUrl={copyShareUrl}
            onDeleteAudit={deleteAudit}
            onEditAudit={handleEditAudit}
            onToggleLock={toggleAuditLock}
          />
        </div>
      </Card>

      <AuditReviewModal
        editingAudit={editingAudit}
        submittingReview={submittingReview}
        filteredAudits={filteredAudits}
        selectedAudits={selectedAudits}
        onSelectAudit={handleSelectAudit}
        onEditAudit={handleEditAudit}
        onCopyAuditCode={copyAuditCode}
        onViewAudit={viewAudit}
        onCopyShareUrl={copyShareUrl}
        onDeleteAudit={deleteAudit}
        onSubmitReview={submitReview}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
};
