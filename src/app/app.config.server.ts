import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { StoreService } from './services/store.service';
import { CartService } from './services/cart.service';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), StoreService, CartService],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
