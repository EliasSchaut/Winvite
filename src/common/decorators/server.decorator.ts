import { createParamDecorator } from '@nestjs/common';

export const ServerID = createParamDecorator(() => {
  return 1;
});
