/**
 * WhatsApp Integration Utilities for ZARF WEAR
 * Generates formatted direct links for WhatsApp Web and mobile apps.
 */

import { formatInr } from "./currency";

export const DEFAULT_WHATSAPP_NUMBER = "+919876543210";

export interface WhatsAppOrderPayload {
  orderReference: string;
  customerName: string;
  customerPhone?: string;
  deliveryCity?: string;
  items: Array<{
    title: string;
    variant: string;
    quantity: number;
    priceInPaise: number;
  }>;
  totalAmountInPaise: number;
}

export function buildOrderWhatsAppUrl(
  payload: WhatsAppOrderPayload,
  phone: string = DEFAULT_WHATSAPP_NUMBER
): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const lines = [
    `*NEW ORDER REQUEST — ZARF WEAR*`,
    `Reference: *${payload.orderReference}*`,
    `Customer: ${payload.customerName}`,
    payload.deliveryCity ? `City: ${payload.deliveryCity}` : "",
    ``,
    `*Requested Items:*`,
    ...payload.items.map(
      (item) => `• ${item.quantity}x ${item.title} (${item.variant}) — ${formatInr(item.priceInPaise * item.quantity)}`
    ),
    ``,
    `Estimated Total: *${formatInr(payload.totalAmountInPaise)}*`,
    ``,
    `Hi ZARF Concierge, I would like to review my order request and get confirmation & payment details.`,
  ].filter(Boolean);

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export interface WhatsAppCustomEnquiryPayload {
  enquiryNumber?: string;
  customerName: string;
  apparelCategory: string;
  estimatedQty: number;
  printMethod?: string;
  sizeBreakdown?: string;
  colorPreferences?: string;
  notes?: string;
}

export function buildCustomEnquiryWhatsAppUrl(
  payload: WhatsAppCustomEnquiryPayload,
  phone: string = DEFAULT_WHATSAPP_NUMBER
): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const lines = [
    `*CUSTOM APPAREL ENQUIRY — ZARF WEAR*`,
    payload.enquiryNumber ? `Ref: *${payload.enquiryNumber}*` : "",
    `Name: ${payload.customerName}`,
    `Garment: *${payload.apparelCategory}*`,
    `Estimated Qty: *${payload.estimatedQty} pcs*`,
    payload.printMethod ? `Technique: ${payload.printMethod}` : "",
    payload.sizeBreakdown ? `Sizes: ${payload.sizeBreakdown}` : "",
    payload.colorPreferences ? `Colors: ${payload.colorPreferences}` : "",
    payload.notes ? `Notes: ${payload.notes}` : "",
    ``,
    `Hi ZARF Team, please share a quotation and timeline for this custom apparel project.`,
  ].filter(Boolean);

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

