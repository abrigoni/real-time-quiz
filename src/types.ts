import { Request } from '@nestjs/common';

export interface AuthGuardedRequest extends Request {
  user: { id: string; email: string; username: string };
}
