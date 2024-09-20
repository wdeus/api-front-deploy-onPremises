import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { ChartsModule } from 'ng2-charts';
import { GraphicComponent } from '../../components/graphic/graphic.component';
import { CardDataComponent } from '../../components/card-data/card-data.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    DashboardComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    GraphicComponent,
    CardDataComponent
  ],
})

export class AdminLayoutModule { }
