import { I18nTranslations } from '@/types/generated/i18n.generated';
import { I18nContext } from 'nestjs-i18n';

export class CtxType {
  server_id!: number;
  i18n!: I18nContext<I18nTranslations>;
  guest_id?: number;
}
