import { Controller } from '@nestjs/common';
import { CookbookService } from './cookbook.service';

@Controller('cookbook')
export class CookbookController {
    constructor(private readonly cookbookService: CookbookService) {}
}
