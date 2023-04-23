import { I18nContext } from 'nestjs-i18n';

export class CtxType {
  server_id!: number;
  i18n!: I18nContext;
  guest_id?: number;
}
