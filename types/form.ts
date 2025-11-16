
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  website: string;
  monthlyMarketingBudget: string;
}

export interface CustomAuditFormProps {
  onSuccess?: () => void;
}
