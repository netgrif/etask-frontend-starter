import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResourceProvider} from '@netgrif/components-core';

const routes: Routes = [];

@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(routes)],
  providers: [ResourceProvider],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
