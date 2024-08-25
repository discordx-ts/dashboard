src/
├── common/
│ ├── decorators/
│ ├── filters/
│ ├── guards/
│ ├── interceptors/
│ ├── middlewares/
│ ├── pipes/
│ └── utilities/
├── config/
│ ├── app.config.ts
│ ├── database.config.ts
│ └── config.module.ts
├── modules/
│ ├── <module-name>/
│ │ ├── controllers/
│ │ │ └── <module-name>.controller.ts
│ │ ├── dto/
│ │ │ ├── create-<module-name>.dto.ts
│ │ │ └── update-<module-name>.dto.ts
│ │ ├── interfaces/
│ │ │ └── <module-name>.interface.ts
│ │ ├── entities/
│ │ │ └── <module-name>.entity.ts
│ │ ├── services/
│ │ │ └── <module-name>.service.ts
│ │ ├── repositories/
│ │ │ └── <module-name>.repository.ts
│ │ └── <module-name>.module.ts
├── database/
│ ├── migrations/
│ │ └── <timestamp>-<migration-name>.ts
│ ├── seeds/
│ │ └── <seed-name>.ts
│ └── entities/
│ ├── index.ts
│ └── <global-entity>.entity.ts
├── shared/
│ ├── constants/
│ ├── helpers/
│ ├── interfaces/
│ ├── pipes/
│ └── dto/
├── ormconfig.ts
├── main.ts
└── app.module.ts
