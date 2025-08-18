/**
 * Utility functions for formatting data
 */

// Currency ID to currency code mapping
const CURRENCY_MAP: { [key: number]: string } = {
  1: 'USD', // US Dollar
  2: 'EUR', // Euro
  3: 'GBP', // British Pound
  4: 'JPY', // Japanese Yen
  5: 'CAD', // Canadian Dollar
  6: 'AUD', // Australian Dollar
  7: 'CHF', // Swiss Franc
  8: 'CNY', // Chinese Yuan
  9: 'INR', // Indian Rupee
  10: 'BRL' // Brazilian Real
}

/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currencyOrId - The currency code or currency ID (default: USD or 1)
 * @param locale - The locale to use (default: en-US)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currencyOrId: string | number = 'USD', locale: string = 'en-US'): string => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '$0.00'
  }

  let currencyCode: string

  // Handle currency ID (number) or currency code (string)
  if (typeof currencyOrId === 'number') {
    currencyCode = CURRENCY_MAP[currencyOrId] || 'USD'
  } else {
    currencyCode = currencyOrId
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode
    }).format(amount)
  } catch (error) {
    // Fallback formatting
    return `${currencyCode} ${amount.toFixed(2)}`
  }
}

/**
 * Format a date string or Date object
 * @param date - The date to format (string, Date, or timestamp)
 * @param format - The format to use (default: 'short')
 * @param locale - The locale to use (default: en-US)
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date | number, format: 'short' | 'long' | 'iso' | 'relative' = 'short', locale: string = 'en-US'): string => {
  if (!date) {
    return 'N/A'
  }

  try {
    const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date

    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date'
    }

    switch (format) {
      case 'long':
        return dateObj.toLocaleDateString(locale, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })

      case 'iso':
        return dateObj.toISOString().split('T')[0]

      case 'relative':
        return formatRelativeDate(dateObj)

      case 'short':
      default:
        return dateObj.toLocaleDateString(locale, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
    }
  } catch (error) {
    return 'Invalid Date'
  }
}

/**
 * Format a date as a relative time (e.g., "2 days ago", "in 3 hours")
 * @param date - The date to format
 * @returns Relative time string
 */
const formatRelativeDate = (date: Date): string => {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`
  } else {
    return 'Just now'
  }
}

/**
 * Format a number with appropriate suffix (K, M, B)
 * @param num - The number to format
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted number string
 */
export const formatNumber = (num: number, decimals: number = 1): string => {
  if (num === null || num === undefined || isNaN(num)) {
    return '0'
  }

  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(decimals) + 'B'
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(decimals) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(decimals) + 'K'
  } else {
    return num.toString()
  }
}

/**
 * Format a percentage
 * @param value - The value to format as percentage
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0%'
  }

  return `${value.toFixed(decimals)}%`
}

/**
 * Format a file size in bytes to human readable format
 * @param bytes - The size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted file size string
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * Format a phone number
 * @param phone - The phone number to format
 * @param format - The format to use (default: 'US')
 * @returns Formatted phone number string
 */
export const formatPhone = (phone: string, format: 'US' | 'international' = 'US'): string => {
  if (!phone) return 'N/A'

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')

  if (format === 'US' && digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  } else if (format === 'international' && digits.length >= 10) {
    return `+${digits.slice(0, digits.length - 10)} ${digits.slice(-10, -7)} ${digits.slice(-7, -4)} ${digits.slice(-4)}`
  }

  return phone
}

/**
 * Format a duration in milliseconds to human readable format
 * @param ms - Duration in milliseconds
 * @returns Formatted duration string
 */
export const formatDuration = (ms: number): string => {
  if (ms < 1000) {
    return `${ms}ms`
  }

  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days}d ${hours % 24}h ${minutes % 60}m`
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`
  } else {
    return `${seconds}s`
  }
}

/**
 * Format a status with appropriate styling classes
 * @param status - The status to format
 * @returns Object with text and CSS classes
 */
export const formatStatus = (status: string): { text: string; classes: string } => {
  const statusMap: { [key: string]: { text: string; classes: string } } = {
    active: { text: 'Active', classes: 'bg-green-100 text-green-800' },
    inactive: { text: 'Inactive', classes: 'bg-red-100 text-red-800' },
    draft: { text: 'Draft', classes: 'bg-gray-100 text-gray-800' },
    sent: { text: 'Sent', classes: 'bg-blue-100 text-blue-800' },
    paid: { text: 'Paid', classes: 'bg-green-100 text-green-800' },
    overdue: { text: 'Overdue', classes: 'bg-red-100 text-red-800' },
    cancelled: { text: 'Cancelled', classes: 'bg-gray-100 text-gray-800' },
    pending: { text: 'Pending', classes: 'bg-yellow-100 text-yellow-800' },
    completed: { text: 'Completed', classes: 'bg-green-100 text-green-800' },
    in_progress: { text: 'In Progress', classes: 'bg-blue-100 text-blue-800' },
    won: { text: 'Won', classes: 'bg-green-100 text-green-800' },
    lost: { text: 'Lost', classes: 'bg-red-100 text-red-800' },
    open: { text: 'Open', classes: 'bg-blue-100 text-blue-800' },
    closed: { text: 'Closed', classes: 'bg-gray-100 text-gray-800' }
  }

  const formatted = statusMap[status.toLowerCase()] || {
    text: status.charAt(0).toUpperCase() + status.slice(1),
    classes: 'bg-gray-100 text-gray-800'
  }

  return formatted
}
