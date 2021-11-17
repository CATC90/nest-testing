import { Test } from '@nestjs/testing';
import { CatsController } from './controller/cats.controller';
import { Cat } from './schemas/cat.schema';
import { CatsService } from './services/cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        {
          provide: 'CAT_MODEL',
          useValue: Cat,
        },
      ],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result: Cat[] = [
        { name: 'simba', age: 1, breed: 'ginger' },
      ] as Cat[];
      jest.spyOn(catsService, 'findAll').mockResolvedValue(result);

      expect(await catsController.findAll()).toBe(result);
    });
  });
});
