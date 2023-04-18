import { Global, HttpModule, HttpService, Module } from '@nestjs/common';

const API_KEY = '123456';
const API_KEY_PROD = 'PROD_123456';

const fn = async (http: HttpService) => {
  const task = await http
    .get('https://jsonplaceholder.typicode.com/todos')
    .toPromise();

  return task.data;
};

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'TASKS',
      useFactory: fn,
      inject: [HttpService],
    },
  ],
  exports: ['API_KEY', 'TASKS'],
})
export class DatabaseModule {}
