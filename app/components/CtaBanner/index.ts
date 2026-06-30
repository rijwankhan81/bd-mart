// ============================================
// CtaBanner module — barrel export
// ============================================
// Usage anywhere in the app:
//   import { CtaBanner } from '@/components/CtaBanner';
//   <CtaBanner id="outlet" />
//   <CtaBanner id="franchise" override={{ variant: 'dark' }} />

export { default as CtaBanner } from "./CtaBanner";
export { ctaConfig } from "./ctaConfig";
export type {
  CtaId,
  CtaConfig,
  CtaButtonConfig,
  CtaStatConfig,
  CtaVariant,
} from "./ctaConfig";
