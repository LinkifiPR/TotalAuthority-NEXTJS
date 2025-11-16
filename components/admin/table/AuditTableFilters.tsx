
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Search,
  Filter,
  X,
  Clock,
  CheckCircle2,
  Calendar,
  Users
} from 'lucide-react';

type GroupBy = 'none' | 'month' | 'status' | 'review_status';

interface AuditTableFiltersProps {
  searchTerm: string;
  statusFilter: string;
  reviewStatusFilter: string;
  groupBy: GroupBy;
  filteredCount: number;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onReviewStatusFilterChange: (value: string) => void;
  onGroupByChange: (value: GroupBy) => void;
  onClearAllFilters: () => void;
}

export const AuditTableFilters: React.FC<AuditTableFiltersProps> = ({
  searchTerm,
  statusFilter,
  reviewStatusFilter,
  groupBy,
  filteredCount,
  onSearchChange,
  onStatusFilterChange,
  onReviewStatusFilterChange,
  onGroupByChange,
  onClearAllFilters
}) => {
  const hasActiveFilters = searchTerm || statusFilter !== 'all' || reviewStatusFilter !== 'all' || groupBy !== 'none';

  return (
    <Card className="border-2 border-dashed border-blue-200 hover:border-blue-400 transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl shadow-sm">
              <Filter className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <CardTitle className="text-xl text-blue-900 font-bold">Advanced Search & Filters</CardTitle>
              <CardDescription className="text-sm text-blue-700 mt-1">
                Powerful tools to find and organize your audit reports efficiently
              </CardDescription>
            </div>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAllFilters}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 transition-colors duration-200"
            >
              <X className="w-4 h-4 mr-1" />
              Clear all filters
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Enhanced Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
            <Input
              placeholder="Search by client name, audit code, or reviewer..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-14 text-base border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white shadow-sm rounded-xl"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-blue-100"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Enhanced Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm"></div>
                Status Filter
              </label>
              <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                <SelectTrigger className="h-12 border-2 border-blue-200 focus:border-blue-500 bg-white shadow-sm">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">🟢 Active</SelectItem>
                  <SelectItem value="archived">📦 Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                Review Status
              </label>
              <Select value={reviewStatusFilter} onValueChange={onReviewStatusFilterChange}>
                <SelectTrigger className="h-12 border-2 border-blue-200 focus:border-blue-500 bg-white shadow-sm">
                  <SelectValue placeholder="All Reviews" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reviews</SelectItem>
                  <SelectItem value="completed">✅ Completed</SelectItem>
                  <SelectItem value="pending">⏳ Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full shadow-sm"></div>
                Group By
              </label>
              <Select value={groupBy} onValueChange={(value) => onGroupByChange(value as GroupBy)}>
                <SelectTrigger className="h-12 border-2 border-blue-200 focus:border-blue-500 bg-white shadow-sm">
                  <SelectValue placeholder="No Grouping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">📋 No Grouping</SelectItem>
                  <SelectItem value="month">📅 By Month</SelectItem>
                  <SelectItem value="status">🏷️ By Status</SelectItem>
                  <SelectItem value="review_status">✅ By Review Status</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full shadow-sm"></div>
                Results
              </label>
              <div className="flex items-center h-12 px-4 bg-white border-2 border-blue-200 rounded-lg shadow-sm">
                <Users className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-base font-semibold text-blue-800">
                  {filteredCount} audit{filteredCount !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Filter Chips */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-blue-200">
            <span className="text-sm font-semibold text-blue-700 mr-3 flex items-center">
              ⚡ Quick filters:
            </span>
            <Button
              variant={reviewStatusFilter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onReviewStatusFilterChange(reviewStatusFilter === 'pending' ? 'all' : 'pending')}
              className="h-8 text-sm bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200 transition-all duration-200"
            >
              <Clock className="w-4 h-4 mr-2" />
              Pending Reviews
            </Button>
            <Button
              variant={reviewStatusFilter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onReviewStatusFilterChange(reviewStatusFilter === 'completed' ? 'all' : 'completed')}
              className="h-8 text-sm bg-green-100 text-green-800 border-green-300 hover:bg-green-200 transition-all duration-200"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Completed
            </Button>
            <Button
              variant={groupBy === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onGroupByChange(groupBy === 'month' ? 'none' : 'month')}
              className="h-8 text-sm bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200 transition-all duration-200"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Group by Month
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
