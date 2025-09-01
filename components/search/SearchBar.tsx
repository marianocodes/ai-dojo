'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { UI_TEXT } from '@/lib/constants';

/**
 * Reusable search bar component with controlled input state
 * Extracted from Header component for modularity and reusability
 * Based on architect's example: Client component with search state management
 * Follows existing pattern: Controlled input with focus states and clear functionality
 */
interface SearchBarProps {
  /** Current search query value */
  value?: string;
  /** Function called when search value changes */
  onChange?: (value: string) => void;
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Optional custom CSS classes */
  className?: string;
  /** Whether the search bar should be full width */
  fullWidth?: boolean;
  /** Whether to show search results dropdown */
  showResults?: boolean;
}

export default function SearchBar({
  value = '',
  onChange,
  placeholder = UI_TEXT.search.placeholder,
  className,
  fullWidth = true,
  showResults = true
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(value);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Handle search input changes
  const handleSearchChange = (newValue: string) => {
    setSearchQuery(newValue);
    onChange?.(newValue);
  };

  // Clear search input
  const clearSearch = () => {
    setSearchQuery('');
    onChange?.('');
  };

  return (
    <div className={cn(
      "relative",
      fullWidth ? "flex-1 max-w-2xl" : "w-full max-w-md",
      className
    )}>
      <div 
        className={cn(
          "relative flex items-center",
          "transition-all duration-200",
          isSearchFocused ? "scale-[1.02]" : "scale-100"
        )}
      >
        {/* Search Icon */}
        <Search 
          className={cn(
            "absolute left-3 h-5 w-5 transition-colors duration-200",
            isSearchFocused ? "text-green-500" : "text-gray-400"
          )}
          aria-hidden="true"
        />
        
        {/* Search Input */}
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className={cn(
            // Base styles
            "w-full pl-10 pr-4 py-2 rounded-full",
            "bg-gray-700 border border-gray-600",
            "text-white placeholder-gray-400",
            "transition-all duration-200",
            
            // Focus styles
            "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500",
            "focus:bg-gray-600",
            
            // Hover styles
            "hover:border-gray-500"
          )}
          aria-label={UI_TEXT.search.ariaLabel}
        />

        {/* Clear Search Button (visible when there's text) */}
        {searchQuery && (
          <button
            onClick={clearSearch}
            className={cn(
              "absolute right-3 p-1 rounded-full",
              "text-gray-400 hover:text-white",
              "hover:bg-gray-600 transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-green-500"
            )}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {searchQuery && isSearchFocused && showResults && (
        <div className={cn(
          "absolute top-full left-0 right-0 mt-1 py-2",
          "bg-gray-700 border border-gray-600 rounded-lg shadow-lg",
          "z-50"
        )}>
          <div className="px-4 py-2 text-sm text-gray-400">
            Search for "{searchQuery}" (mock functionality)
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Compact variant of SearchBar for smaller spaces
 */
interface CompactSearchBarProps extends Omit<SearchBarProps, 'fullWidth'> {}

export function CompactSearchBar(props: CompactSearchBarProps) {
  return <SearchBar {...props} fullWidth={false} />;
}

/**
 * SearchBar variant without results dropdown
 */
interface SimpleSearchBarProps extends Omit<SearchBarProps, 'showResults'> {}

export function SimpleSearchBar(props: SimpleSearchBarProps) {
  return <SearchBar {...props} showResults={false} />;
}