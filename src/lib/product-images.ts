// Shared limits for product and product-review photo uploads — same
// convention as Fanpage posts (MAX_IMAGE_BYTES/ALLOWED_IMAGE_TYPES in
// src/app/api/business/posts/route.ts).
export const MAX_PRODUCT_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
export const ALLOWED_PRODUCT_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
export const MAX_PRODUCT_IMAGES = 8;
export const MAX_REVIEW_IMAGES = 4;
