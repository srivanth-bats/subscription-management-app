export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  { code: "MXN", symbol: "MX$", name: "Mexican Peso" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
];

export const formatCurrency = (amount: number, currencyCode: string): string => {
  const currency = CURRENCIES.find(c => c.code === currencyCode);
  if (!currency) return `$${amount.toFixed(2)}`;
  
  // For JPY, don't show decimals
  if (currencyCode === "JPY") {
    return `${currency.symbol}${Math.round(amount)}`;
  }
  
  return `${currency.symbol}${amount.toFixed(2)}`;
};
