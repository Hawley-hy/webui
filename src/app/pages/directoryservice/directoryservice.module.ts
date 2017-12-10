import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgUploaderModule} from 'ngx-uploader';
import { MaterialModule } from '@angular/material';

import {SystemGeneralService} from '../../services';
import {EntityModule} from '../common/entity/entity.module';

import {ActiveDirectoryComponent} from './activedirectory/';
import {routing} from './directoryservice.routing';
import {LdapComponent} from './ldap/';
import {NISComponent} from './nis/';
import { IdmapComponent } from './idmap';

@NgModule({
  imports : [
    CommonModule, EntityModule, FormsModule, ReactiveFormsModule,
    NgUploaderModule, routing, MaterialModule
  ],
  declarations : [ LdapComponent, ActiveDirectoryComponent, NISComponent, IdmapComponent ],
  providers : [ SystemGeneralService ]
}) export class DirectoryServiceModule {}
