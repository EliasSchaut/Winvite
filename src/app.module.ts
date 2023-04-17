import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { config_validation_schema } from '@/common/validation/config.validation';
import { GuestsModule } from '@/graphql/guests/guests.module';
import { OptionsModule } from '@/graphql/options/options.module';
import { AuthModule } from '@/graphql/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: config_validation_schema,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '../src/locales'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
      typesOutputPath: join(
        __dirname,
        '../src/types/generated/i18n.generated.ts',
      ),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        'src',
        'types',
        'generated',
        'schema.gql',
      ),
    }),
    AuthModule,
    GuestsModule,
    OptionsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'dist'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
