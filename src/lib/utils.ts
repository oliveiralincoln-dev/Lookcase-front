import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface WhatsAppItem {
  name: string;
  price: number;
  quantity: number;
  selectedSize?: string;
}

export function formatWhatsAppMessage(items: WhatsAppItem[], storeName: string): string {
  const lines = items.map((item) => {
    const size = item.selectedSize ? ` (${item.selectedSize})` : "";
    return `• ${item.quantity}x ${item.name}${size} — ${formatCurrency(item.price * item.quantity)}`;
  });
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  return `Olá! Gostaria de fazer um pedido em *${storeName}*:\n\n${lines.join("\n")}\n\n*Total: ${formatCurrency(total)}*`;
}

export function buildWhatsAppUrl(whatsappNumber: string, message: string): string {
  const number = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}
