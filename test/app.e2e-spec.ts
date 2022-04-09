import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as pactum from 'pactum';
import { Test } from "@nestjs/testing";
import { PrismaService } from "../src/prisma/prisma.service";
import { AppModule } from "../src/app.module";
import { AuthDto } from "../src/auth/dto";
import { EditUserDto } from "../src/user/dto";
import { CreatePetDto, EditPetDto } from "src/pet/dto";

describe('APP ete', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let baseUrl = 'http://localhost:3333';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
    }));
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl(baseUrl);

  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'tayyiptest@mail.com',
      password: '123456',
    }


    describe('should signup', () => {
      it('should throw if email empty', () => {
        return pactum.spec().post('/auth/signup').withBody({ password: dto.password }).expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum.spec().post('/auth/signup').withBody({ email: dto.email }).expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signup').withBody({}).expectStatus(400);
      });
      it('should signup a user', () => {
        // use inspect() to see the logs
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201);
      });
    });


    describe('should signin', () => {
      it('should throw if email empty', () => {
        return pactum.spec().post('/auth/signin').withBody({ password: dto.password }).expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum.spec().post('/auth/signin').withBody({ email: dto.email }).expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signin').withBody({}).expectStatus(400);
      });

      it('should signin a user', () => {
        return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(200).stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('get me', () => {
      it('should get current user', () => {
        return pactum.spec().get('/users/me').withHeaders({ Authorization: 'Bearer $S{userAt}' }).expectStatus(200);
      });
    });

    describe('edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Tayyip',
          email: 'useredit@test.com'
        };
        return pactum.spec().patch('/users').withHeaders({ Authorization: 'Bearer $S{userAt}' }).withBody(dto).expectStatus(200).expectBodyContains(dto.firstName).expectBodyContains(dto.email);
      });
    });
  });

  describe('Pet', () => {
    describe('get empty pets', () => {
      it("should get pets", () => {
        return pactum.spec().get('/pets').withHeaders({ Authorization: 'Bearer $S{userAt}' }).expectStatus(200).expectBody([]);
      });
    });

    describe('create pet', () => {
      const dto: CreatePetDto = {
        description: "A cat",
        name: "Ayhan",
      }
      it("should create pet", () => {
        return pactum.spec().post('/pets').withHeaders({ Authorization: 'Bearer $S{userAt}' }).withBody(dto).expectStatus(201).stores('petId', 'id');
      });
    });

    describe('get pets', () => {
      it("should get pets", () => {
        return pactum.spec().get('/pets').withHeaders({ Authorization: 'Bearer $S{userAt}' }).expectStatus(200).expectJsonLength(1);
      });
    });

    describe('get pets by id', () => {
      it("should get pet by id", () => {
        return pactum.spec().get('/pets/{id}').withPathParams('id', '$S{petId}').withHeaders({ Authorization: 'Bearer $S{userAt}' }).expectStatus(200).expectBodyContains('$S{petId}');
      });
    });

    describe('edit pet', () => {
      const dto: EditPetDto = {
        description: "A super cat",
      }
      it("should edit pet by id", () => {
        return pactum.spec().patch('/pets/{id}').withPathParams('id', '$S{petId}').withBody(dto).withHeaders({ Authorization: 'Bearer $S{userAt}' }).expectStatus(200).expectBodyContains(dto.description);
      });
    });

    describe('delete pet', () => {
      it("should delete pet by id", () => {
        return pactum.spec().delete('/pets/{id}').withPathParams('id', '$S{petId}').withHeaders({ Authorization: 'Bearer $S{userAt}' }).expectStatus(204);
      });

      it("should get empty pet", () => {
        return pactum.spec().get('/pets').withHeaders({ Authorization: 'Bearer $S{userAt}' }).expectStatus(200).expectBody([]);
      });
    });

  });
});
