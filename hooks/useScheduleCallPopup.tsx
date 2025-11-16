"use client";

import { useState, useCallback } from 'react';

export const useScheduleCallPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openScheduleCall = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeScheduleCall = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openScheduleCall,
    closeScheduleCall,
  };
};