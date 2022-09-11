import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import * as Server from './server';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// let server = async (port: number) => {
//   let server = new Server.default(port);
//   await server.start(() => console.log(`Server listening on port ${port}`));
// }

// server(3000);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

