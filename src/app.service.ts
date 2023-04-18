import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private readonly apiKey: string,
    @Inject('TASKS') private readonly tasks: any,
    @Inject(config.KEY)
    private readonly _configService: ConfigType<typeof config>, // private readonly _configService: ConfigService,
  ) {}

  getHello(): string {
    console.log(this.tasks);
    const apikey = this._configService.apiKey;
    return `${this._configService.database.name} ------- ${apikey}`;
    // return this.apiKey;
  }
}
