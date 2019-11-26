import { NgModule } from '@angular/core'
import { CustomDate } from '../pipes/customDate.pipe'

@NgModule({
  declarations: [CustomDate],
  exports: [CustomDate],
})
export class PipeModule {}
