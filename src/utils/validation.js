import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  isAdmin: z.boolean().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const setAvailabilitySchema = z.object({
  date: z.string(),
  day: z.string(),
  slotStart: z.string(),
  slotEnd: z.string(),
  maxCapacity: z.number().int(),
});

export const getAvailabilitySchema = z.object({
  date: z.string(),
});

export const setBookingSchema = z.object({
  day: z.string(),
  date: z.string(),
  slotStart: z.string(),
  slotEnd: z.string(),
  bookingCount: z.number().int(),
});
