import { ContextType, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { config_validation_schema } from '@/common/validation/config.validation';
import { GuestModule } from '@/graphql/guest/guest.module';
import { OptionsModule } from '@/graphql/options/options.module';
import { AuthModule } from '@/graphql/auth/auth.module';
import { I18nLangResolver } from '@/common/middleware/i18n.resolver';
import { AdsModule } from '@/graphql/ads/ads.module';
import { DetailsModule } from '@/graphql/details/details.module';
import { ShiftsModule } from '@/graphql/shifts//shifts.module';
import { ServerModule } from '@/graphql/server/server.module';
import { GuestlistModule } from '@/graphql/guestlist/guestlist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: config_validation_schema,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '..', 'src', 'locales'),
        watch: true,
      },
      loader: I18nJsonLoader,
      resolvers: [I18nLangResolver],
      typesOutputPath: join(
        __dirname,
        '..',
        'src',
        'types',
        'generated',
        'i18n.generated.ts',
      ),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
      },
      context: (ctx: ContextType) => ctx,
      autoSchemaFile: join(
        process.cwd(),
        'src',
        'types',
        'generated',
        'schema.gql',
      ),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'dist'),
    }),
    AuthModule,
    ServerModule,
    GuestlistModule,
    GuestModule,
    OptionsModule,
    AdsModule,
    DetailsModule,
    ShiftsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
